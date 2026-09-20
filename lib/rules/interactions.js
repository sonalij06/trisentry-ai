// A small, curated list of well-documented dangerous drug combinations -
// NOT an exhaustive drug database. This demonstrates the mechanism; a real
// deployment would integrate a licensed interaction database (e.g. RxNorm).
// Always confirm with a pharmacist or doctor - see README and in-app disclaimer.

// Common brand names -> generic name, so OCR text like "Tylenol" still matches.
export const DRUG_ALIASES = {
  tylenol: "acetaminophen",
  advil: "ibuprofen",
  motrin: "ibuprofen",
  coumadin: "warfarin",
  xanax: "alprazolam",
  zoloft: "sertraline",
  prozac: "fluoxetine",
  ultram: "tramadol",
  oxycontin: "oxycodone",
  zocor: "simvastatin",
  biaxin: "clarithromycin",
  prinivil: "lisinopril",
  zestril: "lisinopril",
};

export function normalizeDrugName(name) {
  const cleaned = name.trim().toLowerCase();
  return DRUG_ALIASES[cleaned] ?? cleaned;
}

export const INTERACTION_RULES = [
  {
    pair: ["warfarin", "ibuprofen"],
    severity: "critical",
    explanation:
      "Combining warfarin with NSAIDs like ibuprofen significantly increases the risk of dangerous internal bleeding.",
  },
  {
    pair: ["warfarin", "aspirin"],
    severity: "critical",
    explanation:
      "Combining warfarin with aspirin significantly increases bleeding risk without a doctor actively managing both.",
  },
  {
    pair: ["lisinopril", "potassium"],
    severity: "moderate",
    explanation:
      "ACE inhibitors like lisinopril combined with potassium supplements can cause dangerously high blood potassium.",
  },
  {
    pair: ["simvastatin", "clarithromycin"],
    severity: "critical",
    explanation:
      "This antibiotic can raise statin levels to dangerous levels, increasing the risk of serious muscle damage.",
  },
  {
    pair: ["sertraline", "tramadol"],
    severity: "critical",
    explanation:
      "Combining an SSRI with tramadol increases the risk of serotonin syndrome, a potentially life-threatening reaction.",
  },
  {
    pair: ["alprazolam", "oxycodone"],
    severity: "critical",
    explanation:
      "Combining a benzodiazepine with an opioid significantly increases the risk of fatal respiratory depression.",
  },
  {
    pair: ["metformin", "ibuprofen"],
    severity: "moderate",
    explanation:
      "Regular NSAID use with metformin can affect kidney function, which metformin depends on to be cleared safely.",
  },
];

export function findInteractions(drugNames) {
  const normalized = [...new Set(drugNames.map(normalizeDrugName))];
  const found = [];

  for (const rule of INTERACTION_RULES) {
    const [a, b] = rule.pair;
    if (normalized.includes(a) && normalized.includes(b)) {
      found.push(rule);
    }
  }

  return { normalized, found };
}
