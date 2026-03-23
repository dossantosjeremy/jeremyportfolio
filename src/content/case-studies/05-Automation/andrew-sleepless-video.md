---

title: "Sleepless Video Generator — AI Narration with Visual Silence"
slug: "andrew-sleepless-video"
company: "AAB Media"
discipline: ["AI Automation"]
industry: "Content & Media"
market: ["USA"]
year: 2025
methods: []
stack: ["n8n", "AI", "ElevenLabs", "JSON2Video"]
project_type: ["Automation"]
status: "completed"
nda: false
featured: false
work_type: "freelance"

images:
  - filename: "automation-n8n-workflow.png"
    caption: "n8n workflow — script ingestion → AI narration synthesis → silent visual generation"
  - filename: "automation-doc-gen-flow.png"
    caption: "Automation pipeline — narration generation, visual composition and output delivery"
---
# Sleepless Video Generator — AI Narration with Visual Silence

> **One-line hook**: A growing category of ambient, voice-only content for sleep, focus, and emotional processing — generated automatically from a theme. Andrew wanted to produce these at scale, without a camera or studio. I built the pipeline.

---

## Snapshot

| | |
|---|---|
| **Role** | AI Automation Consultant (Freelance) |
| **Client** | Andrew — Content Creator / YouTube Automation |
| **Date** | 2025 |
| **Stack** | n8n · GPT-4 (via OpenRouter) · ElevenLabs · JSON2Video |
| **Impact** | Ambient content library scaled from 0 to ongoing · Generation time under 3 minutes per video |

---

## Problem

Andrew identified "sleepless videos" as an underserved content category on YouTube — ambient, voice-only content with a black screen, designed for listeners who want narration without visual stimulation. Producing these manually (scripting, recording, exporting) was time-prohibitive at the volume needed to build a channel.

---

## Solution



![n8n workflow — script ingestion → AI narration synthesis → silent visual generation](images/automation-n8n-workflow.png)
*n8n workflow — script ingestion → AI narration synthesis → silent visual generation*A minimal-content n8n pipeline:

1. **Theme input** — user provides a theme or emotional prompt (e.g. "acceptance", "letting go", "overthinking at 3am")
2. **Script generation** — GPT produces a calming, reflective script in a poetic or contemplative tone. Specific formatting rules: no metaphors that require visualisation, no action verbs, comfortable silence points
3. **Voiceover generation** — ElevenLabs converts the script to audio with a soft, measured voice profile
4. **Black-screen video creation** — JSON2Video renders a pure black screen with audio synced
5. **Output naming and delivery** — timestamped filename, delivered to content folder for scheduling

**Tone specification** was the design challenge: GPT's default "calming" output was too generic. I developed a prompt framework with examples of good and bad sleepless video scripts, and iterated until the output reliably matched the emotional register Andrew needed.

---

## Impact



![Automation pipeline — narration generation, visual composition and output delivery](images/automation-doc-gen-flow.png)
*Automation pipeline — narration generation, visual composition and output delivery*- Full video from theme to file in under 3 minutes
- Consistent emotional tone across the library — no manual quality checking required
- Scalable content model: one hour of automation produces a week of content
- Format adaptable for sleep, ASMR-adjacent, and emotional self-care categories
