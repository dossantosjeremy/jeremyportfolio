---

title: "Avatar Video Generation Pipeline — From Text Prompt to Published Video"
slug: "andrew-avatar-video"
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
  - filename: "automation-agent-workflow.png"
    caption: "AI agent workflow — prompt processing → avatar generation → video rendering and publishing"
  - filename: "automation-doc-gen-flow.png"
    caption: "Generation pipeline — text input → AI video synthesis → automated publishing"
---
# Avatar Video Generation Pipeline — From Text Prompt to Published Video

> **One-line hook**: From a topic prompt to a narrated, avatar-fronted video — fully automated. Andrew needed high-volume DTC content without camera time or editing. I built the pipeline in n8n that made it happen.

---

## Snapshot

| | |
|---|---|
| **Role** | AI Automation Consultant (Freelance) |
| **Client** | Andrew — DTC Content Infrastructure |
| **Date** | 2025 |
| **Stack** | n8n · GPT (via OpenRouter) · ElevenLabs · JSON2Video |
| **Impact** | Full video from prompt in minutes · Zero camera time · Batch processing enabled |

---

## Problem

Andrew ran a DTC content operation requiring a high volume of short-form video content — but without the bandwidth to script, record, and edit individually. The goal was fully automated video production: a human provides a topic, the system produces a publishable video.

---

## Solution



![AI agent workflow — prompt processing → avatar generation → video rendering and publishing](images/automation-agent-workflow.png)
*AI agent workflow — prompt processing → avatar generation → video rendering and publishing*A multi-stage n8n workflow:

1. **Topic input** — user submits a topic or angle via a trigger (form, spreadsheet row, or API call)
2. **Script generation** — GPT generates a structured script optimised for avatar delivery (clear, direct, short sentences)
3. **Voiceover synthesis** — ElevenLabs converts the script to high-quality narration audio using Andrew's cloned or selected voice
4. **Avatar video creation** — JSON2Video renders the avatar against a branded background, synced to the audio
5. **Output delivery** — completed video named and stored to shared drive folder, ready for scheduling

**Batch mode:** The workflow supports batch processing — a CSV of topics triggers individual video generation in parallel.

---

## Impact



![Generation pipeline — text input → AI video synthesis → automated publishing](images/automation-doc-gen-flow.png)
*Generation pipeline — text input → AI video synthesis → automated publishing*- Full video production from prompt in under 10 minutes
- Zero camera time, zero editing time for Andrew
- Batch processing enables weekly content calendar to be populated from a single topic list
- Consistent brand presentation across all videos (same avatar, same template, same voice)

---

## Key Engineering Notes

Script formatting was critical: early drafts produced scripts that worked for reading but sounded unnatural when rendered as audio. I iterated the GPT prompt with examples of good avatar script structure — short sentences, no parenthetical remarks, natural breathing points — until the audio quality matched the visual quality.
