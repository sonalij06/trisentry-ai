// Publicly documented emergency warning signs (the same category of criteria
// used by services like NHS 111 and CDC "when to call 911" guidance). The
// stroke-related entries are cross-checked against the CDC's published
// B.E. F.A.S.T. criteria (cdc.gov/stroke/signs-symptoms) as of 2026-09-20.
// This is a curated, demo-scoped list, not a medical device - see README.
export const SYMPTOM_RULES = [
  {
    id: "chest-pain-breathless",
    label: "Chest pain or pressure, especially with shortness of breath",
    tier: "critical",
    advice: "Can indicate a heart attack or pulmonary embolism. Seek emergency care immediately.",
  },
  {
    id: "sudden-one-side-weakness",
    label: "Sudden weakness, numbness, or drooping on one side of the body",
    tier: "critical",
    advice: "A classic stroke warning sign. Call emergency services immediately - treatment within the first hours matters most.",
  },
  {
    id: "slurred-speech",
    label: "Sudden slurred speech or trouble speaking/understanding",
    tier: "critical",
    advice: "Another stroke warning sign, especially combined with weakness on one side. Needs emergency evaluation now.",
  },
  {
    id: "sudden-balance-dizziness",
    label: "Sudden trouble walking, dizziness, loss of balance, or lack of coordination",
    tier: "critical",
    advice: "Part of the CDC's B.E. F.A.S.T. stroke warning signs. Call emergency services immediately.",
  },
  {
    id: "sudden-vision-trouble",
    label: "Sudden trouble seeing, in one or both eyes",
    tier: "critical",
    advice: "Part of the CDC's B.E. F.A.S.T. stroke warning signs. Call emergency services immediately.",
  },
  {
    id: "worst-headache",
    label: "Sudden, severe headache unlike any before",
    tier: "critical",
    advice: "Can indicate a brain hemorrhage. Seek emergency care immediately.",
  },
  {
    id: "coughing-blood",
    label: "Coughing up blood",
    tier: "critical",
    advice: "Needs urgent same-day medical evaluation.",
  },
  {
    id: "anaphylaxis",
    label: "Difficulty breathing with swelling of the face, lips, or throat",
    tier: "critical",
    advice: "Possible severe allergic reaction (anaphylaxis). Seek emergency care immediately.",
  },
  {
    id: "suicidal-thoughts",
    label: "Thoughts of harming yourself",
    tier: "critical",
    advice: "Please reach out to a crisis line or emergency services right now - you don't have to go through this alone.",
  },
  {
    id: "meningitis-signs",
    label: "High fever with a stiff neck and sensitivity to light",
    tier: "critical",
    advice: "Can indicate meningitis. Seek emergency care immediately.",
  },
  {
    id: "severe-abdominal-pain",
    label: "Severe, sudden abdominal pain",
    tier: "moderate",
    advice: "Needs same-day medical evaluation to rule out serious causes.",
  },
  {
    id: "persistent-high-fever",
    label: "Fever above 39.4°C / 103°F, or fever lasting more than a day",
    tier: "moderate",
    advice: "Should be evaluated by a doctor within 24 hours.",
  },
  {
    id: "dehydration-signs",
    label: "Vomiting or diarrhea lasting more than 2 days, or signs of dehydration",
    tier: "moderate",
    advice: "Should be evaluated within 24 hours, especially in children or the elderly.",
  },
  {
    id: "moderate-persistent-symptom",
    label: "A symptom that has lasted more than 3 days without improving, even if mild",
    tier: "moderate",
    advice: "Not improving on its own after several days is worth a same-day or next-day check rather than continued waiting.",
  },
  {
    id: "minor-injury",
    label: "Minor cut, bruise, sprain, or muscle strain",
    tier: "mild",
    advice: "Rest the area and, for swelling, apply a cold pack for the first day. See a doctor if pain worsens, you can't bear weight, or it doesn't improve within a few days.",
  },
  {
    id: "mild-digestive",
    label: "Mild nausea, upset stomach, or short-lived diarrhea with no other red-flag signs",
    tier: "mild",
    advice: "Stick to a bland diet and small sips of water to stay hydrated. See a doctor if it lasts more than 2 days or you notice blood.",
  },
  {
    id: "mild-skin",
    label: "Minor rash, itching, or localized skin irritation",
    tier: "mild",
    advice: "Keep the area clean and dry, and avoid scratching or known irritants. See a doctor if it spreads, blisters, or doesn't improve within a few days.",
  },
  {
    id: "mild-allergy",
    label: "Mild seasonal-type allergy symptoms (sneezing, itchy or watery eyes, runny nose) with no breathing difficulty",
    tier: "mild",
    advice: "Try limiting exposure to the likely trigger and rinsing irritated eyes/nose. Seek care right away if swelling or breathing trouble develops.",
  },
  {
    id: "mild-headache-tension",
    label: "A mild, ordinary headache with no other warning signs",
    tier: "mild",
    advice: "Resting in a quiet, dim space and staying hydrated often helps. See a doctor if it becomes severe, frequent, or is unlike your usual headaches.",
  },
  {
    id: "mild-fatigue-stress",
    label: "General tiredness, mild stress, or a few nights of poor sleep with no other symptoms",
    tier: "mild",
    advice: "A regular sleep schedule and reducing stressors where possible usually helps. See a doctor if it persists beyond two weeks or affects daily functioning.",
  },
  {
    id: "mild-symptoms",
    label: "Mild cold/flu-like symptoms that don't fit the categories above",
    tier: "mild",
    advice: "Usually safe to rest and monitor at home. See a doctor if it worsens or lasts more than a week.",
  },
];
