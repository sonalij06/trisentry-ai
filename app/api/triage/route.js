import { NextResponse } from "next/server";
import { SYMPTOM_RULES } from "@/lib/rules/symptoms";
import { matchSymptomRules } from "@/lib/explain";
import { computeLevel } from "@/lib/riskEngine";

export const runtime = "nodejs";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const text = (body?.symptoms ?? "").trim();
  if (!text) {
    return NextResponse.json({ error: "Please describe the symptoms." }, { status: 400 });
  }
  if (text.length > 2000) {
    return NextResponse.json({ error: "Please keep the description under 2000 characters." }, { status: 400 });
  }

  const { matched, summary, usedAi } = await matchSymptomRules(text, SYMPTOM_RULES);
  const level = computeLevel(matched);

  return NextResponse.json({
    level,
    summary,
    matched: matched.map((r) => ({ id: r.id, label: r.label, tier: r.tier, advice: r.advice })),
    usedAi,
  });
}
