// Offline fallback for free-text symptom matching when no GEMINI_API_KEY
// is set - keeps the demo working without a network dependency. Deliberately
// simpler/less accurate than the LLM classification path in explain.js.
const KEYWORDS = {
  "chest-pain-breathless": ["chest pain", "chest pressure", "can't breathe", "cant breathe", "short of breath", "shortness of breath"],
  "sudden-one-side-weakness": ["one side", "numbness", "can't move my", "face drooping", "arm weakness"],
  "slurred-speech": ["slurred", "can't speak", "trouble speaking"],
  "worst-headache": ["worst headache", "severe headache", "thunderclap"],
  "coughing-blood": ["coughing blood", "coughing up blood", "blood in cough"],
  anaphylaxis: ["throat swelling", "face swelling", "swollen tongue", "can't swallow"],
  "suicidal-thoughts": ["hurt myself", "kill myself", "suicidal", "end my life"],
  "meningitis-signs": ["stiff neck", "sensitivity to light"],
  "severe-abdominal-pain": ["severe abdominal pain", "stomach pain", "abdominal pain"],
  "persistent-high-fever": ["high fever", "fever for", "103", "39.4"],
  "dehydration-signs": ["vomiting", "diarrhea", "dehydrated"],
};

export function matchByKeyword(text, rules) {
  const lower = text.toLowerCase();
  const matchedIds = new Set();

  for (const [ruleId, keywords] of Object.entries(KEYWORDS)) {
    if (keywords.some((k) => lower.includes(k))) {
      matchedIds.add(ruleId);
    }
  }

  const matched = rules.filter((r) => matchedIds.has(r.id));
  return matched.length > 0 ? matched : [rules.find((r) => r.tier === "mild")];
}
