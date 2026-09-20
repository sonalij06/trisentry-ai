# Live Demo Script

Total time: ~2 minutes of live interaction, inside a 3-4 minute pitch slot.

## Before you go on stage

1. Run `npm run dev`, confirm `http://localhost:3000` (or whichever port it picks) loads.
2. Add a real `GEMINI_API_KEY` to `.env.local` and restart, so Symptom Triage shows real AI
   interpretation and Medication Check actually works (it requires a key — there's no offline mode
   for photo reading).
3. **Pre-test all three modules** with your exact demo inputs the night before:
   - Symptom Triage: a clearly critical description ("sudden chest pain and shortness of breath")
     and, if time allows, a mild one for contrast.
   - Maternal Screener: check 2 boxes that together suggest pre-eclampsia (severe headache with
     blurred vision + swelling of face/hands) to show the AI-synthesized combined explanation.
   - Medication Check: take an actual, well-lit, close-up photo of two pill bottles whose labels are
     legible — ideally two from the curated interaction list (see `lib/rules/interactions.js`, e.g.
     warfarin + ibuprofen, or their brand names Coumadin + Advil). Don't have both on hand? You don't
     need real bottles — write "Warfarin" and "Ibuprofen" on two cards and photograph those; the
     vision step just reads text. Confirm it reads correctly and flags the interaction *before*
     you're on stage — OCR-from-photo is the one module with real variability, so never discover it
     live. Also click into one medication's info card once during pre-testing so you know what it
     shows (what it is, what it treats, side effects, warning signs, and — only if legible in the
     photo — the label's own dosage text).
4. Have a **fallback**: a screen recording or screenshots of each module's successful result, in
   case venue wifi or camera lighting fails on stage.

## The live flow

1. **Open the landing page** (10s) — "This is TriSentry AI — one shared risk engine, three ways we
   catch danger signs early." Point at the safety disclaimer banner: "It flags patterns worth urgent
   attention using public clinical criteria — it never diagnoses."
2. **Symptom Triage** (30s) — Open it, paste/type the critical symptom description, submit. While it
   loads: "It's checking this against public emergency-warning criteria — the same category NHS 111
   and CDC guidance use." Point at the red badge, read the matched sign out loud, then the advice.
3. **Maternal Screener** (25s) — "Same engine, a different intake — a checklist for community health
   workers." Check the two pre-eclampsia-pattern boxes, submit. Point out the AI-synthesized summary
   that connects the two signs into one explanation, not just two separate warnings.
4. **Medication Check** (35s) — "And a third channel — a photo instead of text." Upload your
   pre-tested photo. While it processes: "Gemini's vision reads the labels, and we check the actual
   drug names against known dangerous combinations." Point at the flagged interaction and its
   explanation. Then open one "Medication info" card: "It also tells you what each medication is,
   what it treats, and warning signs to watch for — but notice it only shows a dosage if it can
   actually read one off this label. It never invents a dose."
5. **Close** (10s) — "One engine, three ways it catches something worth urgent attention before it
   becomes an emergency."

## Anticipated judge questions — have answers ready

- **"Isn't this risky — an AI making health calls?"** → It's a priority-ordering aid, not a
  diagnostic tool, and says so on every page. The urgency decision is deterministic code over
  matched rule tiers, not an LLM guess — the AI's only job is classifying input against our
  predefined, publicly documented clinical criteria (WHO danger signs, NHS/CDC warning signs). This
  is the same category as existing symptom checkers like NHS 111 online or Ada Health.
- **"Is the drug interaction list complete?"** → No, and we say so explicitly in the UI and README —
  it's a small curated demonstration set. A real deployment would integrate a licensed database like
  RxNorm; this demonstrates the mechanism.
- **"Why three modules instead of one deep one?"** → They share one engine (match → score → explain)
  — adding a channel is an extension of the same pattern, not a separate build. It shows the
  architecture generalizes, which is the scalability story.
- **"What if the photo doesn't read clearly?"** → The app says so explicitly rather than guessing —
  "no medication names could be read from that photo" — and never fabricates a drug name.
- **"Isn't telling someone dosage information dangerous for an AI to do?"** → It never generates a
  dose. The prompt explicitly constrains it to transcribe dosage text only if it's actually visible
  in the photo, and say so plainly when it isn't. Everything else (what the medicine is, what it
  treats, side effects, warning signs) is general public information, not a prescription.
