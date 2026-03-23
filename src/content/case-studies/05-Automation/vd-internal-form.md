---

title: "V+D Internal Form Automation"
slug: "vd-internal-form"
company: "V+D"
discipline: ["AI Automation"]
industry: "Architecture & Design"
market: ["Spain"]
year: 2025
methods: []
stack: ["Make", "Typeform", "Google Sheets", "Email"]
project_type: ["Automation"]
status: "completed"
nda: false
featured: false
work_type: "freelance"

images:
  - filename: "automation-intake-brief-case.png"
    caption: "Client brief automation — disorganised intake to structured brief in under 2 minutes"
  - filename: "automation-doc-gen-flow.png"
    caption: "Automation pipeline — form submission → AI categorisation → auto-generated brief"
---
# V+D Internal Form Automation

> **One-line hook**: V+D staff were filling in client project details manually and then re-entering them into their project management system. The internal intake form is now automated — data flows directly from submission to the right place, without anyone touching it twice.

---

## Snapshot

| | |
|---|---|
| **Role** | AI Automation Consultant (Freelance) |
| **Client** | Vision + Design (V+D) — Architecture & Interior Design |
| **Date** | February 2025 |
| **Stack** | Make · Typeform · Google Sheets · Email |

---

## Problem

Following the client-facing pre-engagement form automation, V+D had a parallel problem on the internal side: when project details were submitted or updated by staff, the same information was being manually re-entered into tracking sheets and passed between team members via email.

**Key issues:**
- Inconsistent data collection across team members — no structured format
- Manual data entry created delays and introduced errors
- No automated notification when a new internal form was submitted
- Project planning suffered from incomplete or inconsistently captured information

---

## Solution



![Pipeline — client form → GPT analysis → auto-structured brief sent to team in under 2 minutes](images/automation-doc-gen-flow.png)
*Pipeline — client form → GPT analysis → auto-structured brief sent to team in under 2 minutes*An internal form automation built in Make.com that connects V+D's internal intake process to their tracking infrastructure:

- **Structured intake form** — built in Typeform with standardised fields for project type, scope, timeline, team member assignments, and client reference
- **Webhook trigger** — Make.com watches for new form submissions in real time
- **Google Sheets logging** — all submitted data is appended to the master project tracking sheet automatically, with consistent field naming and formatting
- **Automated notifications** — the relevant team members receive an email summary of the new submission, formatted for quick review
- **Data validation and cleanup** — date fields, multi-select values, and numeric inputs are normalised before being written to Sheets, preventing formatting inconsistencies downstream

---

## Impact



![Client brief automation — intake to structured brief in 2 minutes, eliminating manual reformatting](images/automation-intake-brief-case.png)
*Client brief automation — intake to structured brief in 2 minutes, eliminating manual reformatting*- Manual re-entry of internal project data eliminated
- Consistent field structure across all internal submissions — no more ad hoc formats
- Team members notified automatically on submission — no chasing or forwarding required
- Works as the internal counterpart to the client-facing pre-engagement form, creating a complete intake-to-tracking pipeline

---

## Context: V+D Automation Suite

This is one of five automations built for V+D during the same engagement:

1. **Client Pre-Engagement Form** — client-facing intake with automated proposal generation
2. **Internal Form Automation** ← *this case study*
3. **Visual Form Automation** — AI-generated visual concepts from form submission
4. **Meeting Minutes Automation** — audio transcription + structured minutes via Whisper + GPT
5. **Leads Conversion Chatbot** — AI agent for qualifying and routing website enquiries

Together, these five workflows cover V+D's full client lifecycle, from first website visit to active project tracking.
