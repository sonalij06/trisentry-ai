# TriSentry AI

**AI-assisted early-warning triage — one shared risk engine, three ways danger signs get caught
before they become emergencies.**

## The problem

In an overcrowded clinic, a patient with chest pain often waits in the same queue as someone with a
mild cold, because nothing flags "this needs attention now" before a doctor sees them. Community
health workers screen pregnant patients without specialist training. People managing multiple
medications have no easy way to check whether two of them are dangerous together. All three cases
share the same underlying problem: **recognizing a danger sign early enough to act on it.** Delayed
recognition of red-flag symptoms, missed pregnancy danger signs, and dangerous drug combinations are
all well-documented, preventable causes of harm.

## The solution

TriSentry AI is one platform with a shared decision engine and three intake channels:

1. **Symptom Triage** — free-text symptom description → matched against public emergency-warning
   criteria (the same category of signs used by NHS 111 / CDC "when to call 911" guidance) → an
   urgency level (red / yellow / green).
2. **Maternal Danger-Sign Screener** — a checklist of WHO's published pregnancy danger signs (the
   same list used to train community health workers) → urgency level + a synthesized explanation
   when multiple signs together suggest something like pre-eclampsia.
3. **Medication Safety Check** — a photo of pill bottles → Gemini vision identifies each medication
   and its purpose, common side effects, and warning signs → checked against a curated list of
   well-documented dangerous interactions.

**This is a priority-ordering aid, not a diagnostic tool.** It never claims to diagnose — it flags
patterns worth urgent attention using publicly documented clinical criteria, and always says so.
The Medication Safety Check module in particular draws a hard line: it will **only report a dosage
if it's actually printed on the label in the photo** — it never generates a dose from general
knowledge. Reading a label back to someone is safe; inventing a dose is not, so that boundary is
stated explicitly in the prompt rather than left to the model's judgment.

## Why the engine is shared, not three separate tools

All three modules follow the same shape: **match structured/free-text input against a fixed,
curated rule catalog → deterministically compute an urgency level from the matched tiers → have
Gemini explain the "why" in plain language.** The urgency decision itself (`lib/riskEngine.js`) is
plain code, not an LLM judgment call — the LLM's only job is classifying which of *our* predefined
rules apply (it can't invent new ones), which keeps the safety-critical decision auditable.

## Tech stack

Next.js 16 (App Router), Gemini API (`@google/genai`, structured JSON output, vision for the
medication photo), Tailwind CSS v4.

## Running locally

```bash
npm install
cp .env.local.example .env.local   # add your GEMINI_API_KEY
npm run dev
```

Get a **free** `GEMINI_API_KEY` at [aistudio.google.com/apikey](https://aistudio.google.com/apikey) —
no credit card required for the free tier.

**Symptom Triage** and **Maternal Screener** both work without an API key — the app falls back to a
small offline keyword matcher (`lib/keywordFallback.js`) or plain concatenated advice, so a demo
never depends on the network. **Medication Safety Check** requires a real API key, since reading a
photo needs a multimodal model — without one it returns a clear message instead of failing silently.

## Project structure

```
lib/
  rules/symptoms.js       public emergency-warning-sign criteria
  rules/maternal.js        WHO pregnancy danger signs
  rules/interactions.js    curated drug-interaction pairs + brand-name aliases
  riskEngine.js            deterministic tier -> urgency-level logic (shared)
  explain.js               Gemini calls: symptom classification, maternal synthesis, photo extraction
  keywordFallback.js        offline fallback for symptom matching
app/
  page.js                  landing page, links to the three modules
  triage/page.js            free-text symptom intake
  maternal/page.js          danger-sign checklist intake
  medication/page.js        photo upload intake (client-side resized before upload)
  api/{triage,maternal,medication}/route.js
```

## Known limitations (by design, for a time-boxed build)

- The interaction list in `lib/rules/interactions.js` is a small curated demonstration set, **not**
  an exhaustive drug database — a real deployment would integrate a licensed source (e.g. RxNorm).
- Symptom/danger-sign catalogs are illustrative, not clinically exhaustive or validated by a
  licensed physician — see the in-app disclaimer, shown on every page.
- Medication photo reading depends on label legibility; blurry or generic-label photos may fail to
  extract a drug name, in which case the app says so rather than guessing.

## Pushing to GitHub & deploying

```bash
git init
git add .
git commit -m "Initial commit: TriSentry AI"
gh repo create trisentry-ai --public --source=. --push
vercel
vercel env add GEMINI_API_KEY
vercel --prod
```

## Roadmap / scalability story

- Integrate a licensed drug-interaction database instead of the curated demo list
- SMS/voice intake for community health workers without smartphones
- Historical tracking per clinic to show reduced time-to-escalation
