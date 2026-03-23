---

title: "From Manual to Intelligent: Building AI-Powered Client Onboarding Automation for a Design Firm"
slug: "vd-automation-suite"
company: "V+D"
discipline: ["AI Automation"]
industry: "Architecture & Design"
market: ["Spain"]
year: 2025
methods: []
stack: ["Make", "Typeform", "AI", "Whisper", "Google Sheets", "Email"]
project_type: ["Automation"]
status: "completed"
nda: false
featured: true
work_type: "freelance"

---
# From Manual to Intelligent: Building AI-Powered Client Onboarding Automation for a Design Firm

---

## The Context

Vision + Design (V+D) is a 3-person architecture and interior design firm in Spain. They work with private clients, commercial businesses, and public bodies. Each engagement required tailored communication, a detailed project brief, and coordinated scheduling.

Everything was manual. A new client enquiry meant back-and-forth emails to gather project information, manually writing a brief, and coordinating the first meeting by hand. For a 3-person team, that overhead was disproportionate — time spent on admin was time not spent on design.

They had capacity to take on more clients. The intake process was the bottleneck.

---

## The Problem

The onboarding process took 2–3 hours per new client enquiry. It involved:
- Collecting project information over multiple emails
- Manually creating a briefing document from that information
- Booking a first meeting through calendar back-and-forth
- Writing a personalised follow-up

Every client got a slightly different experience depending on how busy the team was. There was no consistency and no record of what had been gathered before the first meeting.

The brief I designed for: automate the entire pre-engagement process without losing the personal feel of the client relationship.

---

## What I Built

I designed and deployed a three-stage automation system. Each stage connected to the next, with data flowing automatically from client contact through to internal project handoff.

**Stage 1 — Client intake**

A Typeform intake form sent to new enquiries. On submission, Make (formerly Integromat) triggered a webhook that:
- Sent the form data to OpenAI to generate a personalised project brief
- Populated a Word template with that brief
- Sent a confirmation email to the client with the brief attached
- Booked a discovery call via calendar integration

The brief was written in V+D's voice, referencing the client's specific project type, goals, and constraints. Not a form export — actual professional prose.

**Stage 2 — Follow-up business case**

A second Typeform for more detailed project information, sent after the discovery call. On submission:
- A more detailed brief generated using the combined Stage 1 + Stage 2 data
- Document delivered to the client automatically
- Internal record updated in Google Sheets

**Stage 3 — Internal handoff**

When a project was confirmed, a third form collected the internal project setup information. On submission, Make generated a project handoff document for the V+D team — scoping, timeline, client contact, notes from intake.

**Engineering decisions worth noting:**

The Word template conditional logic was the most technically involved part. V+D handles three project types (residential, commercial, public) and each required different sections in the brief. I used placeholder logic in the template to handle optional sections cleanly — unused sections deleted automatically rather than appearing blank.

File upload handling: Make handles single file uploads and zip files differently. I built branching logic to detect the upload type and route accordingly, so clients could attach one file or many without it breaking the flow.

---

## The Impact

- Client onboarding time: from 2–3 hours to under 15 minutes
- 100% data consistency — every brief generated from the same inputs, same structure
- Zero manual entry after form submission — the team receives a finished document, not raw data
- Scalable to 5× the current enquiry volume with no additional headcount
- Professional, personalised client experience from first contact

The V+D team's reaction on the walkthrough: they hadn't expected the brief to read like something they'd written. That was the objective — make automation that doesn't feel automated.

---

## What I Learned

The technical build was straightforward once the logic was mapped. The harder part was understanding V+D's brief-writing voice well enough to prompt OpenAI to replicate it. I spent more time on prompt engineering than on the Make workflow itself.

The conditional template logic was an edge case that took longer than expected — Word templates and conditional sections don't play well together out of the box, and the Make Word module has limits on how it handles placeholder deletion. Worth scoping this more carefully upfront in future projects.

The broader takeaway: for small professional services firms, the ROI on automation isn't just time saved — it's the professionalism of the client experience. A well-written, personalised brief sent automatically within minutes of an enquiry sets the tone for the whole engagement. That's harder to quantify than hours saved, but it matters more to the client.
