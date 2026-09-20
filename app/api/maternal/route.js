import { NextResponse } from "next/server";
import { MATERNAL_RULES } from "@/lib/rules/maternal";
import { explainMaternalResult } from "@/lib/explain";
import { computeLevel } from "@/lib/riskEngine";

export const runtime = "nodejs";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const selectedIds = Array.isArray(body?.selectedIds) ? body.selectedIds : [];
  const matched = MATERNAL_RULES.filter((r) => selectedIds.includes(r.id));
  const level = matched.length === 0 ? "green" : computeLevel(matched);
  const { summary, usedAi } = await explainMaternalResult(matched);

  return NextResponse.json({
    level,
    summary,
    matched: matched.map((r) => ({ id: r.id, label: r.label, tier: r.tier, advice: r.advice })),
    usedAi,
  });
}
