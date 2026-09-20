# Presentation Script (~3 minutes, 7 slides + live demo)

Matches `TriSentry-AI.pptx`. Read naturally — don't memorize word for word.

---

### Slide 1 — Title
**"TriSentry AI"**

> "Hi, we're [names]. This is TriSentry AI — one shared risk engine that catches health danger
> signs early, before they become emergencies, across three real settings."

*(~10 seconds)*

---

### Slide 2 — The Problem
**"The queue doesn't know who's dying."**

> "In an overcrowded clinic, a patient with chest pain often waits behind someone with a mild cold —
> nothing flags urgency before a doctor actually sees them. A community health worker screening a
> pregnant patient without specialist training can miss a danger sign like severe headache with
> blurred vision — a warning sign of pre-eclampsia, which can be fatal if missed. And someone
> managing multiple prescriptions, especially an elderly patient, has no easy way to check whether
> two of them are dangerous together. Three different settings, one shared root problem: recognizing
> a danger sign early enough to act on it."

*(~30 seconds)*

---

### Slide 3 — The Solution
**"One engine. Three ways in."**

> "TriSentry AI is one shared risk engine with three intake channels. Describe symptoms in your own
> words, and we match them against public emergency-warning criteria. Check off pregnancy danger
> signs from WHO's own published list. Or photograph your pill bottles, and we check the actual
> medications against known dangerous combinations. Every channel produces the same thing: a clear
> urgency level, and a plain-language explanation of why."

*(~25 seconds)*

---

### Slide 4 — Live Demo
*(No script here — switch to the running app. See `DEMO_SCRIPT.md`.)*

*(~90 seconds)*

---

### Slide 5 — How It's Built (and why it's safe)
**"The AI classifies. The code decides."**

> "This is the part I want to be careful about: the urgency decision — red, yellow, or green — is
> deterministic code, not an AI guess. The AI's only job is classifying a patient's free text or
> photo against a fixed catalog of publicly documented clinical criteria — WHO pregnancy danger
> signs, NHS and CDC emergency warning signs. It can't invent a new rule. That's what makes this a
> priority-ordering aid, not a diagnostic tool — and we say that explicitly on every single page.
> The medication module draws the same line even more explicitly: it will only show a dosage if
> it's actually printed on the label in the photo. It never generates a dose from general
> knowledge — reading a label back to someone is safe, inventing one isn't."

*(~25 seconds)*

---

### Slide 6 — Why It's Different
**"One architecture, not three demos."**

> "These three modules aren't three separate projects bolted together — they share one engine:
> match against a rule catalog, score deterministically, explain in plain language. That's the real
> technical story here: the pattern generalizes. Adding a fourth intake channel — say, pediatric
> fever screening — is an extension of this architecture, not a rebuild."

*(~15 seconds)*

---

### Slide 7 — Impact & What's Next
**"Every correct flag is someone seen in time."**

> "This helps overcrowded clinics prioritize who needs care most urgently, helps community health
> workers catch pregnancy danger signs they weren't specialist-trained to recognize, and helps
> people avoid a dangerous medication combination before it happens. Next steps: integrating a
> licensed drug-interaction database instead of our curated demo list, and SMS or voice intake for
> health workers without smartphones. Thank you — happy to take questions."

*(~20 seconds)*
