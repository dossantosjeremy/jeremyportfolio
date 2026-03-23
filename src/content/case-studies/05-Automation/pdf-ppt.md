# V+D Architecture — AI Onboarding Automation
### Slide / PDF Deck Version

---

## SLIDE 1 — Hook

**A 3-person architecture firm was spending hours on admin for every new client enquiry.**

I designed and deployed a 3-stage AI automation that turned their manual intake process into a 15-minute client experience — generating professional briefs, scheduling meetings, and notifying the team automatically.

---

## SLIDE 2 — Snapshot

| | |
|---|---|
| **Role** | AI Automation Consultant (Freelance) |
| **Client** | Vision + Design (V+D) — Architecture & Interior Design |
| **Timeline** | February 2025 |
| **Stack** | Make · Typeform · OpenAI · Word templates · OneDrive · Calendar |
| **Impact** | Manual data entry eliminated · Brief generation: hours → minutes · Scalable onboarding for 5× more enquiries |

---

## SLIDE 3 — The Problem

**Four compounding pain points:**

| Problem | Impact |
|---|---|
| Inconsistent data collection | Difficult to plan or compare across projects |
| Manual document creation | Each brief: 2–3 hours of staff time |
| Ad-hoc calendar coordination | Email chains, delays, unprofessional impression |
| No structured intake process | Missed client signals before first meeting |

**The opportunity:** At 3 employees, every hour saved on admin is an hour available for design.

---

## SLIDE 4 — Automation Architecture

**3 stages, fully connected:**

```
Stage 1: Pre-Engagement
  Client fills Typeform →
  AI generates personalised brief summary →
  Branded PDF auto-created →
  Confirmation email + calendar invite sent automatically

Stage 2: Business Case
  Client fills detailed follow-up form →
  AI enriches brief with full project narrative →
  Business case document generated and shared →
  Client receives document before first meeting

Stage 3: Internal Handoff
  Team form submission →
  Project setup document auto-generated →
  Team notified, project folder created in OneDrive
```

---

## SLIDE 5 — What I Built

| Component | Detail |
|---|---|
| 3 Typeform forms | Conditional logic, multi-select, file upload |
| 3 Make scenarios | Real-time webhook triggers, multi-step processing |
| 2 Word templates | Conditional section logic, AI-populated placeholders |
| OpenAI integration | Prompt-engineered project brief generation |
| Calendar integration | Auto-scheduling from form submission |
| Email templates | Personalised, branded confirmation and delivery |
| OneDrive architecture | Auto-organised project folder structure |

**Key engineering challenges solved:**
- Word template conditional sections (unused project types disappear cleanly)
- File upload handling (single files + zip archives → merged into brief)
- Date/number format normalisation from natural language inputs
- Webhook refresh maintenance for production reliability

---

## SLIDE 6 — Results

**Operational:**

| Metric | Before | After |
|---|---|---|
| Manual data entry | Required for every enquiry | **Eliminated** |
| Brief generation | 2–3 hours | **< 3 minutes** |
| Calendar scheduling | Manual email back-and-forth | **Automated** |
| Data consistency | Variable | **100% structured** |

**Business:**
- V+D can handle **5× more enquiries** with the same team
- Clients receive a professional, personalised brief within minutes — before the first meeting
- Staff time redirected from administration to design work

---

## SLIDE 7 — Implementation Approach

**How I worked:**

1. **Stakeholder interview** — mapped existing manual process, identified bottlenecks and redundancies
2. **Architecture design** — defined 3-stage workflow before building anything
3. **Iterative build** — Stage 1 → tested → Stage 2 → tested → Stage 3 → integrated
4. **Edge case testing** — tested across all project types, typologies, and file upload scenarios
5. **Client walkthrough** — trained V+D team on maintenance and edge case handling
6. **Handoff documentation** — non-technical maintenance guide

**Key methodology insight:** Building and testing each stage independently before connecting them kept debugging contained and gave the client early value — they could see Stage 1 working before Stage 2 was complete.

---

## SLIDE 8 — Learnings

**What I'd repeat:** Investing time in OpenAI prompt engineering. Early drafts produced generic summaries. Iterating with real V+D project examples produced professional, client-ready output — the quality difference was substantial.

**What I'd improve:** Build a structured test matrix at the start (all project types × typologies × upload scenarios). I caught most edge cases through ad-hoc testing, but a matrix would have been faster and more systematic.

**Next step:** Connect Stage 3 to V+D's project management system (Trello/Notion) to auto-create project cards — closing the loop from client enquiry to active project without any manual steps.

---

## SLIDE 9 — The Broader Capability

This engagement represents one end of a spectrum of automation work I deliver for clients:

| Engagement type | Example |
|---|---|
| **Client intake & onboarding** | This project: full pre-engagement automation |
| **Internal process automation** | Approval workflows, reporting pipelines |
| **AI-assisted content generation** | Document drafting, brief generation, proposal creation |
| **Data integration** | Connecting CRMs, forms, spreadsheets, and communication tools |
| **Research & insights automation** | Automated synthesis, pattern detection, report generation |

The common thread: I find where humans are doing work that systems can do — and build the systems.
