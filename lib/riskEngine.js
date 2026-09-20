// The urgency decision is a deterministic function over structured matched-rule
// data - not something we ask an LLM to decide. The LLM's job (in explain.js)
// is only to classify which curated rules apply to free-text input; this
// function turns that structured result into a level using fixed logic.
export function computeLevel(matchedRules) {
  if (matchedRules.some((r) => r.tier === "critical")) return "red";
  if (matchedRules.some((r) => r.tier === "moderate")) return "yellow";
  return "green";
}

// Colors are the darkened tokens from globals.css, chosen so every pairing
// clears WCAG AA (4.5:1) against its tint background - verified, not
// eyeballed (see the contrast check in the polish pass).
export const LEVEL_META = {
  red: {
    label: "Seek care now",
    timing: "Act immediately — call emergency services",
    color: "#b3123f",
    bg: "#fbe9ec",
  },
  yellow: {
    label: "See a doctor soon",
    timing: "Within 24 hours",
    color: "#7a5906",
    bg: "#fbf1de",
  },
  green: {
    label: "Monitor at home",
    timing: "No urgent action needed — reassess in a few days if it persists",
    color: "#0d6b35",
    bg: "#e8f6ec",
  },
};
