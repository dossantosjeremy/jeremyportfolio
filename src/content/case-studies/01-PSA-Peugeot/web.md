---

title: "Can Sound Make Drivers Safer? Measuring the Physiological Impact of In-Car Auditory Relaxation"
slug: "psa-peugeot-neural-up"
company: "PSA Peugeot Citroën"
discipline: ["UX Research"]
industry: "Automotive"
market: ["France", "Spain"]
year: 2016
methods: ["Controlled experiment", "Physiological measurement", "Psychometric questionnaires", "Biometric analysis"]
stack: ["Python", "SPSS", "Biometric sensors"]
project_type: ["Evaluative"]
status: "completed"
nda: false
featured: true
work_type: "in-house"

---
# Can Sound Make Drivers Safer? Measuring the Physiological Impact of In-Car Auditory Relaxation

---

## The Context

PSA Peugeot Citroën's Cognitive Sciences department was evaluating Neural Up® — a rotational auditory technology developed by Human Up — to determine whether it could reduce driver stress during breaks in long journeys.

The technology was unproven. No peer-reviewed automotive evaluation existed. PSA needed empirical data before committing engineering resources. My job: design and run the study, deliver the recommendation.

I was an intern in the Human Factors department. I ran the study end-to-end over nine months — protocol design, participant recruitment, data collection, analysis, and final presentation to the R&D stakeholder group. My supervisor provided scientific oversight; I executed independently.

---

## The Problem

Drivers accumulate stress during long journeys and often don't decompress effectively during short breaks. Neural Up® proposed an active auditory intervention — rotating sound played through the cabin — designed to trigger physiological relaxation.

PSA had three specific conditions to evaluate:
1. No sound (control)
2. Neural Up® without rotation (stationary)
3. Neural Up® with consistent rotation
4. Neural Up® with variable-speed rotation

The question was whether any of these conditions produced a measurable relaxation effect — and whether the variable rotation option was safe.

---

## What I Did

I used a within-subjects counterbalanced design: each of the 75 participants experienced all conditions in randomised order. This controlled for individual baseline differences (some people are physiologically more reactive than others) while keeping the sample size manageable.

Dual measurement: EDA (skin conductance) and heart rate continuously throughout each session, plus self-report questionnaires after each exposure. I chose both because self-report alone is susceptible to demand characteristics — participants guess what you want to find. Physiological data provides a check that self-report can't.

The session flow:
1. Baseline questionnaire — general disposition, AI anxiety levels
2. 10-minute simulated driving phase — to induce realistic mild arousal before each break
3. 9-minute sound exposure under one condition
4. Post-exposure questionnaire — mood and arousal self-report

Repeat for each condition.

I ran all sessions in PSA's static driving simulator, managed all equipment setup personally (ensuring consistency across sessions), and conducted all data collection and coding myself.

One real-time call: the variable rotation condition caused mild nausea for a subset of participants. I allowed withdrawals and documented this as a finding rather than an exclusion. It became one of the most important results.

---

## Key Findings

| Condition | EDA Change vs. Baseline | Self-Reported Relaxation |
|---|---|---|
| Stationary | No significant change | Neutral |
| Consistent rotation | **−20% arousal** | **85% reported relaxation** |
| Variable rotation | No relaxation benefit | **60% reported discomfort** |

The consistent rotation condition was the only one that produced measurable physiological and subjective relaxation.

Variable rotation was actively harmful — 60% of participants reported discomfort, and a subset experienced mild nausea. This ruled it out as a viable product direction.

Stationary sound had no relaxation benefit. The team expected at least some ambient calming effect from any version of the technology. That expectation was wrong.

The regression analysis identified *consistency* — not amplitude or sound complexity — as the primary predictor of relaxation response. The vendor had been emphasising sound richness as the key variable. The data disagreed.

---

## The Impact

- Variable-speed rotation eliminated from the Neural Up® product roadmap before any engineering investment
- Consistent rotation validated as a viable in-car feature
- Stationary version reclassified as passive ambient rather than active relaxation
- Dual physiological + self-report methodology established as the benchmark for future in-car sensory feature evaluations at PSA

The study prevented an investment in a harmful feature and validated one that worked. That's what it was designed to do.

---

## What I Learned

The dual-measure approach was the right call. Had I relied on self-report alone, demand characteristics may have flattened the differences between conditions. The physiological data sharpened every conclusion.

The participant pool being PSA employees — tech-literate, familiar with the simulator — compresses ecological validity. A follow-up with external participants tested in a moving vehicle would strengthen the conclusions significantly. That's a limitation I documented and should have been the next study.

The most interesting methodological question going forward: does the relaxation effect of consistent rotation habituate over time, or does it persist with repeated exposure? The study answered whether it worked. It didn't answer how long it keeps working.
