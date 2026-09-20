// Publicly documented emergency warning signs (the same category of criteria
// used by services like NHS 111 and CDC "when to call 911" guidance). This is
// a curated, demo-scoped list, not a medical device - see README.
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
    id: "mild-symptoms",
    label: "Mild cold/flu-like symptoms with none of the signs above",
    tier: "mild",
    advice: "Usually safe to rest and monitor at home. See a doctor if it worsens or lasts more than a week.",
  },
];
