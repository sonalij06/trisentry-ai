// The urgency decision is a deterministic function over structured matched-rule
// data - not something we ask an LLM to decide. The LLM's job (in explain.js)
// is only to classify which curated rules apply to free-text input; this
// function turns that structured result into a level using fixed logic.
export function computeLevel(matchedRules) {
  if (matchedRules.some((r) => r.tier === "critical")) return "red";
  if (matchedRules.some((r) => r.tier === "moderate")) return "yellow";
  return "green";
}

export const LEVEL_META = {
  red: { label: "Seek care now", color: "#d1264f" },
  yellow: { label: "See a doctor soon", color: "#b8860f" },
  green: { label: "Monitor at home", color: "#1f9d55" },
};
