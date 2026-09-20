# Submission Details

Fill in the blanks marked `[ ]` before you submit the form.

## Participant / Team Details

- **Name(s):** [Your Name]
- **Team name (if any):** [Team Name]
- **Email:** [Your Email]
- **College / Organization:** [Your College or Org]

## Project Title

**TriSentry AI**

## One-liner

An AI early-warning triage platform that catches danger signs — in symptoms, pregnancy, and
medications — before they become emergencies.

## Theme

Tech for a Better Tomorrow — Healthcare Access & Patient Safety

## Problem Statement

In an overcrowded clinic, a patient with chest pain often waits behind someone with a mild cold,
because nothing flags urgency before a doctor actually sees them. Community health workers in
under-resourced settings screen pregnant patients without specialist training, and missing a danger
sign like severe headache with blurred vision (pre-eclampsia) can be fatal. People managing multiple
medications, especially the elderly, have no easy way to check whether two prescriptions are
dangerous together. All three are documented, preventable causes of harm — and all three come down
to the same root problem: recognizing a warning sign early enough to act on it.

## Solution

TriSentry AI is one platform with a shared risk-scoring engine and three intake channels:

1. **Symptom Triage** — describe symptoms in free text; matched against public emergency-warning
   criteria to produce a red/yellow/green urgency level.
2. **Maternal Danger-Sign Screener** — a checklist of WHO's published pregnancy danger signs, with
   an AI-synthesized explanation when multiple signs together suggest a serious pattern.
3. **Medication Safety Check** — photograph pill bottles; Gemini's vision identifies each
   medication (what it is, what it treats, common side effects, warning signs) and checks the
   named drugs against a curated list of well-documented dangerous interactions.

The urgency decision itself is deterministic code, not an LLM guess — the AI's role is constrained
to classifying input against our predefined, publicly-sourced clinical criteria. This is a
priority-ordering aid, not a diagnostic device, and says so on every page. Dosage information is
never generated from the model's general knowledge — only transcribed if it's actually printed on
the label in the photo.

## Tech Stack

Next.js 16 (App Router), Gemini API (`@google/genai`, structured JSON output + vision), Tailwind CSS
v4. Deployed on Vercel.

## GitHub Repository

[ADD LINK AFTER PUSHING TO GITHUB]

## Deployed Link

[ADD LINK AFTER DEPLOYING TO VERCEL]

## Real-World Impact

- Helps overcrowded clinics and community health workers prioritize who needs care most urgently.
- Directly reduces preventable harm from missed pregnancy danger signs and dangerous drug
  combinations.
- Every correct flag is one less person who doesn't get seen in time.

## Feasibility & Scalability

The shared engine pattern (match → score → explain) means adding a fourth intake channel (e.g.
pediatric fever screening) is an extension, not a rebuild. Natural next steps: SMS/voice intake for
health workers without smartphones, integration with a licensed drug-interaction database, and
historical tracking per clinic to measure reduced time-to-escalation.
