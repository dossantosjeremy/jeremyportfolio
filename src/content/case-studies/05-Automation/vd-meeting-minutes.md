---

title: "V+D Meeting Minutes Automation — 85% Reduction in Documentation Time"
slug: "vd-meeting-minutes"
company: "V+D"
discipline: ["AI Automation"]
industry: "Architecture & Design"
market: ["Spain"]
year: 2025
methods: []
stack: ["Make", "Whisper", "AI", "Google Docs", "Email"]
project_type: ["Automation"]
status: "completed"
nda: false
featured: false
work_type: "freelance"

images:
  - filename: "automation-meeting-minutes-case.png"
    caption: "Meeting Minutes automation — from transcript to team-ready minutes in under 10 minutes"
  - filename: "automation-doc-gen-flow.png"
    caption: "Document generation pipeline — upload → transcription → AI structuring → delivery"
---
# V+D Meeting Minutes Automation — 85% Reduction in Documentation Time

> **One-line hook**: Architecture projects generate hundreds of meeting minutes across years of delivery. V+D was spending disproportionate time transcribing, structuring, and distributing them. I built an end-to-end automation that takes a meeting recording and produces structured minutes, stored and distributed automatically.

---

## Snapshot

| | |
|---|---|
| **Role** | AI Automation Consultant (Freelance) |
| **Client** | Vision + Design (V+D) — Architecture & Interior Design |
| **Date** | March 2025 |
| **Stack** | Make · Whisper (transcription) · GPT · OneDrive · Email |
| **Impact** | 85% reduction in meeting documentation time |

---

## Problem

V+D's meeting documentation process was entirely manual: recording → transcription → structuring → formatting → distributing. For a 3-person studio managing multiple active projects, this represented significant recurring overhead that scaled with project volume.

---

## Solution



![Pipeline — audio/transcript upload → Whisper transcription → GPT structuring → formatted doc delivery](images/automation-doc-gen-flow.png)
*Pipeline — audio/transcript upload → Whisper transcription → GPT structuring → formatted doc delivery*A form-triggered automation where team members submit a meeting recording or transcript. The system then:
1. **Transcribes** the recording (Whisper) if a raw audio file is submitted
2. **Structures** the content into formal meeting minutes (GPT) — with attendees, discussion points, decisions, and action items
3. **Stores** the structured minutes in the correct OneDrive project folder
4. **Distributes** the minutes via email to relevant stakeholders

The output is consistent, professional, and traceable — every meeting produces an identical structure that can be searched and referenced throughout the project lifecycle.

---

## Impact



![Meeting Minutes automation — 85% reduction in documentation time, 4–6hrs saved per meeting](images/automation-meeting-minutes-case.png)
*Meeting Minutes automation — 85% reduction in documentation time, 4–6hrs saved per meeting*- **85% reduction** in meeting documentation time
- Improved consistency of record-keeping across all active projects
- Enhanced ability to track action items — minutes are searchable and structured identically
- Clients receive documentation faster, improving the professional impression

**Key engineering note:** The most complex element was handling the conditional logic for variable meeting types (client meetings, internal design reviews, contractor meetings) — each requiring different structural templates while sharing a common underlying format.
