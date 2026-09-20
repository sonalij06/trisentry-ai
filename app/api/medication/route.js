import { NextResponse } from "next/server";
import { extractMedicationInfo } from "@/lib/explain";
import { findInteractions } from "@/lib/rules/interactions";

export const runtime = "nodejs";

const ALLOWED_MEDIA_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { imageBase64, mediaType } = body ?? {};
  if (!imageBase64 || !ALLOWED_MEDIA_TYPES.has(mediaType)) {
    return NextResponse.json(
      { error: "Please upload a PNG, JPEG, or WebP photo." },
      { status: 400 },
    );
  }
  // Rough cap on decoded size (~6MB) to stay well under serverless request limits.
  if (imageBase64.length > 8_000_000) {
    return NextResponse.json({ error: "That photo is too large. Please use a smaller image." }, { status: 400 });
  }

  let medications;
  try {
    medications = await extractMedicationInfo(imageBase64, mediaType);
  } catch (err) {
    if (err.code === "no_api_key") {
      return NextResponse.json(
        { error: "Photo analysis needs a GEMINI_API_KEY configured on the server." },
        { status: 503 },
      );
    }
    console.error(err);
    return NextResponse.json({ error: "Couldn't read that photo. Try a clearer, closer shot of the label." }, { status: 500 });
  }

  if (medications.length === 0) {
    return NextResponse.json({
      level: "green",
      medications: [],
      found: [],
      message: "No medication names could be read from that photo.",
    });
  }

  const { normalized, found } = findInteractions(medications.map((m) => m.name));
  const level = found.length === 0 ? "green" : found.some((f) => f.severity === "critical") ? "red" : "yellow";

  // A single product's own ingredients were already formulated and approved
  // together - checking them against each other would produce false alarms
  // on every combination medicine. Interactions only make sense to check
  // *between* separately photographed products, so the message says which
  // situation applies instead of giving the same caveat either way.
  let message = null;
  if (found.length === 0) {
    message =
      medications.length < 2
        ? "Only one product was identified in this photo, so there's nothing to cross-check it against. Its own listed ingredients are already formulated together and aren't flagged against each other."
        : "Checked these medications against our list of known dangerous combinations - none matched. This list isn't exhaustive, so always confirm with a pharmacist.";
  }

  return NextResponse.json({
    level,
    medications,
    normalized,
    found,
    message,
  });
}
