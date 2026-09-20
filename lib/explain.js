import { GoogleGenAI, Type } from "@google/genai";
import { matchByKeyword } from "./keywordFallback";

const MODEL = process.env.GEMINI_MODEL || "gemini-flash-lite-latest";

function client() {
  return process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;
}

function parseJson(text, fallback) {
  try {
    return JSON.parse(text);
  } catch {
    return fallback;
  }
}

const MATCH_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    matchedRuleIds: { type: Type.ARRAY, items: { type: Type.STRING } },
    summary: { type: Type.STRING },
  },
  required: ["matchedRuleIds", "summary"],
};

// Classifies free-text symptoms against OUR fixed rule catalog - the model
// can only pick ids we already defined, it can't invent new ones. The actual
// urgency decision then happens deterministically in riskEngine.js.
export async function matchSymptomRules(freeText, rules) {
  const ai = client();

  if (!ai) {
    const matched = matchByKeyword(freeText, rules);
    return {
      matched,
      summary: "Offline mode: matched using simple keyword rules. Add GEMINI_API_KEY for AI-based interpretation.",
      usedAi: false,
    };
  }

  try {
    const catalog = rules.map((r) => ({ id: r.id, label: r.label }));
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: `A patient describes their symptoms below. Compare against this fixed catalog of warning signs and return which ones apply (by id only - never invent new ids), plus a one-sentence empathetic plain-language summary of their situation.

Catalog:
${JSON.stringify(catalog, null, 2)}

Patient's own words:
"""${freeText}"""`,
      config: { responseMimeType: "application/json", responseSchema: MATCH_SCHEMA },
    });

    const parsed = parseJson(response.text, null);
    if (!parsed) throw new Error("Gemini returned a response that wasn't valid JSON.");

    const matched = rules.filter((r) => parsed.matchedRuleIds?.includes(r.id));
    return {
      matched: matched.length > 0 ? matched : [rules.find((r) => r.tier === "mild")],
      summary: parsed.summary ?? "",
      usedAi: true,
    };
  } catch (err) {
    console.error("Gemini symptom match failed, using offline fallback:", err.message);
    const matched = matchByKeyword(freeText, rules);
    return { matched, summary: "AI call failed - showing keyword-based match instead.", usedAi: false };
  }
}

const SUMMARY_SCHEMA = {
  type: Type.OBJECT,
  properties: { summary: { type: Type.STRING } },
  required: ["summary"],
};

// Synthesizes a combined explanation across multiple checked danger signs
// (e.g. headache + blurred vision + swelling together suggest pre-eclampsia,
// which is more informative than reading each sign in isolation).
export async function explainMaternalResult(matchedRules) {
  if (matchedRules.length === 0) return { summary: "", usedAi: false };

  const ai = client();
  const fallback = matchedRules.map((r) => r.advice).join(" ");

  if (!ai) return { summary: fallback, usedAi: false };

  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: `A pregnant patient reported these danger signs: ${matchedRules
        .map((r) => r.label)
        .join(", ")}. In one or two plain-language sentences, explain what this combination could mean and what to do next. Be direct and calm, not alarmist.`,
      config: { responseMimeType: "application/json", responseSchema: SUMMARY_SCHEMA },
    });
    const parsed = parseJson(response.text, null);
    if (!parsed?.summary) throw new Error("Gemini returned a response that wasn't valid JSON.");
    return { summary: parsed.summary, usedAi: true };
  } catch (err) {
    console.error("Gemini maternal explain failed, using offline fallback:", err.message);
    return { summary: fallback, usedAi: false };
  }
}

const MEDICATION_INFO_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    medications: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
          whatItIs: { type: Type.STRING },
          usedFor: { type: Type.STRING },
          howToTake: { type: Type.STRING },
          labelDosage: { type: Type.STRING },
          commonSideEffects: { type: Type.STRING },
          seekHelpIf: { type: Type.STRING },
        },
        required: [
          "name",
          "ingredients",
          "whatItIs",
          "usedFor",
          "howToTake",
          "labelDosage",
          "commonSideEffects",
          "seekHelpIf",
        ],
      },
    },
  },
  required: ["medications"],
};

// Vision extraction has no offline fallback - reading a photo requires a
// multimodal model. Callers should check for the "no_api_key" error.
//
// Deliberately constrained: labelDosage must be transcribed from the photo
// itself, never invented from the model's general knowledge. howToTake is
// allowed to describe the general route/method (e.g. "oral syrup, taken by
// mouth") since that's safe, generic product-type information - but it must
// not state a specific quantity or frequency unless that's what labelDosage
// already reports from the photo. Reading a label back to someone is safe;
// generating a dose is not - that line is stated explicitly in the prompt,
// not left to the model's judgment.
export async function extractMedicationInfo(base64Data, mediaType) {
  const ai = client();
  if (!ai) {
    const err = new Error("Photo analysis requires GEMINI_API_KEY.");
    err.code = "no_api_key";
    throw err;
  }

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [
      {
        text: `Identify every distinct medication product visible on these labels. For each one, return:
- "name": the product name exactly as printed (generic or brand)
- "ingredients": every active ingredient printed on the label, one entry per ingredient, including strength if shown (e.g. "Dextromethorphan Hydrobromide 10mg"). If truly no ingredient list is visible, return an empty array.
- "whatItIs": one sentence on what kind of medicine this is (drug class/purpose)
- "usedFor": the symptoms or conditions it's commonly used to treat
- "howToTake": the general route/method of taking this type of product (e.g. "Oral syrup, taken by mouth, usually with the measuring cap provided" or "Oral tablet, swallowed with water"). Describe the METHOD only - do not state a specific amount or frequency here.
- "labelDosage": the exact dosage/frequency instructions AS PRINTED on this specific label, transcribed word for word. If no dosage text is legible in the photo, say "Not clearly visible on this label - follow the product's own instructions or ask a pharmacist." Never invent a dose, amount, or frequency that isn't actually visible in the image.
- "commonSideEffects": 2-3 commonly known possible side effects, as general public information
- "seekHelpIf": specific symptoms that mean the person should stop taking it and seek medical help (e.g. signs of an allergic reaction, overdose, or serious side effect)

This is general educational medicine information, not personalized medical advice.`,
      },
      { inlineData: { data: base64Data, mimeType: mediaType } },
    ],
    config: { responseMimeType: "application/json", responseSchema: MEDICATION_INFO_SCHEMA },
  });

  const parsed = parseJson(response.text, null);
  return parsed?.medications ?? [];
}
