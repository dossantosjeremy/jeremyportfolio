---

title: "AI-Powered Audio Classification for Sound-Based Content"
slug: "soundjourney-audio"
company: "SoundJourney"
discipline: ["AI Automation"]
industry: "Wellness"
market: ["Global"]
year: 2025
methods: []
stack: ["n8n", "AI", "Box", "Google Sheets"]
project_type: ["Automation"]
status: "in-progress"
nda: false
featured: false
work_type: "freelance"

images:
  - filename: "automation-agent-workflow.png"
    caption: "AI agent workflow — audio feature extraction → classification → content routing"
  - filename: "automation-workflow-diagram-2.png"
    caption: "Classification pipeline — audio analysis, tag assignment and recommendation delivery"
---
# AI-Powered Audio Classification for Sound-Based Content

> **One-line hook**: SoundJourney collects guided meditations, chants, and voice recordings from dozens of practitioners. Tagging them manually was creating a backlog. I built an upload-and-classify pipeline that handles it automatically.

---

## Snapshot

| | |
|---|---|
| **Role** | AI Automation Consultant (Freelance) |
| **Client** | SoundJourney |
| **Industry** | Wellness / Spiritual Audio Experiences |
| **Date** | Ongoing (2025) |
| **Stack** | n8n · GPT-4 · Box · Google Sheets |
| **Impact** | Consistent naming and routing from upload · Reduced editorial tagging burden · Designed to scale to hundreds of uploads per month |

---

## Problem

SoundJourney aggregates audio experiences — spiritual guidance, guided meditations, chants, personal voice stories — contributed by a diverse set of practitioners. Contributors uploaded content in inconsistent formats with unclear file names. Categories like "voice note," "chant," "guided meditation," or "personal story" had to be inferred from the content itself.

Editors were manually reviewing every upload to assign metadata before it could enter the content library. As upload volume grew, this became a bottleneck that delayed publishing timelines.

**Key issues:**
- Mixed audio formats with no naming standards
- Category inference required listening to content — not scalable
- Tags were inconsistently applied across contributors
- No structured way to track status, category, or routing decisions

---

## Solution



![AI agent workflow — audio feature extraction → classification → content routing](images/automation-agent-workflow.png)
*AI agent workflow — audio feature extraction → classification → content routing*An audio upload and classification workflow that handles tagging and organization automatically, with a lightweight editorial review layer for corrections.

**1. Form-Based Upload**
Contributors upload files via a form that captures basic metadata: contributor name, submission type, and any self-supplied context. The form is the only manual step.

**2. Audio Classification via GPT-4**
The workflow passes audio file metadata and any available context to GPT-4, which:
- Detects content type (guided meditation, chant, spoken word, voice note, ambient sound, etc.)
- Generates a short content description
- Suggests 3–5 classification tags
- Assigns a confidence level for editorial review

**3. Standardized Naming & Storage**
Files are renamed using a structured convention based on category and contributor. The renamed file is uploaded to the appropriate Box subfolder (organized by content category).

**4. Google Sheets Control Panel**
Every upload is logged to a shared Sheet with columns for filename, category, tags, GPT confidence score, and an approval status column. Editors can review flagged items and correct or approve — without touching the files directly.

---

## Impact (ongoing)



![AI classification pipeline — audio feature extraction, tag assignment and recommendation delivery](images/automation-workflow-diagram-2.png)
*AI classification pipeline — audio feature extraction, tag assignment and recommendation delivery*- Consistent naming and category routing from first upload — no manual sorting
- GPT-generated tags reduce per-file editorial time significantly
- Sheet-based control panel allows QA and corrections without technical access
- Designed to scale across hundreds of audio assets per month
- Architecture allows future addition of transcription (Whisper) for text-searchable content

---

## Key Engineering Notes

The design challenge was handling the range of audio content types — SoundJourney's library includes everything from 3-minute voice affirmations to 45-minute guided ceremonies. GPT-4 classification was prompted with examples of each category, not just category names, which significantly improved accuracy on borderline cases.

The decision to use a Sheet-based control panel (rather than auto-routing everything) was deliberate: wellness content often has nuanced intent that benefits from a final human eye before it enters the published library. The automation removes the volume burden, not the editorial judgment.
