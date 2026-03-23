---

title: "Guiding Couriers to Return a Canceled Order"
slug: "glovo-canceled-order"
company: "Glovo"
discipline: ["UX Research"]
industry: "On-Demand Delivery"
market: ["Portugal", "Kenya"]
year: 2022
methods: ["Diary study", "In-depth interviews", "Usability testing"]
stack: ["DScout", "Lookback", "Dovetail"]
project_type: ["Evaluative"]
status: "completed"
nda: true
featured: false
work_type: "in-house"
images:
  - filename: "glovo-canceled-order-app-return-feature.png"
    caption: "Post-launch return order feature in the Glovo courier app"
  - filename: "glovo-canceled-order-journey-map.png"
    caption: "Courier journey map to return a canceled order — created before the diary study"
  - filename: "glovo-canceled-order-diary-setup-1.png"
    caption: "Diary study setup — admin page and WhatsApp-moderated check-ins"
  - filename: "glovo-canceled-order-diary-setup-2.png"
    caption: "Study coordination — admin page tracking a live order in real time"
  - filename: "glovo-canceled-order-affinity-diagram.png"
    caption: "Affinity diagram — qualitative data from 8 courier diaries"
  - filename: "glovo-canceled-order-customer-journey.png"
    caption: "Customer journey — insights mapped across the return experience"
  - filename: "glovo-canceled-order-research-report.png"
    caption: "UX Research Report presented to product and design stakeholders"
  - filename: "glovo-canceled-order-50s-flyer.png"
    caption: "50-second update flyer for broader internal distribution"
---
# Guiding Couriers to Return a Canceled Order

> **One-line hook**: *"The returning process was like a basic order. It was peaceful. I liked this process."* — Glovo had a problem: canceled orders after pickup were being abandoned, generating food waste and support contacts. I ran a real-world diary study — coordinating with engineering and local operations teams across two markets — to evaluate a newly launched return automation before full rollout.

---

## Snapshot

| | |
|---|---|
| **Role** | UX Researcher Level II |
| **Client** | Glovo — Delivery Solutions team |
| **Period** | July 2022 |
| **Methods** | Diary study (WhatsApp-moderated) · Desk research · Journey mapping · Affinity diagramming |
| **Participants** | 8 beta couriers — Portugal, Kenya |
| **Deliverables** | Research report · Customer journey map · 50-second update flyer |

---

## Background & Problem

Glovo couriers frequently didn't know what to do with an order canceled after pickup. The existing communication was unclear — the cancelation message wasn't visible enough, return instructions were confusable with a new order notification, and compensation details were absent. The result: food waste, support contacts, and frustrated couriers.

**The team's goal:** Implement automated guidelines for returning canceled orders and evaluate whether the new flow improved understanding, compliance, and courier experience before full launch.

![The new return order feature as seen by couriers after pickup cancellation — the first automated guidance Glovo provided for this scenario.](images/glovo-canceled-order-app-return-feature.png)
*The new return order feature as seen by couriers after pickup cancellation — the first automated guidance Glovo provided for this scenario.*

---

## Research Design

This study had an unusual operational complexity: it required **cross-functional coordination in real-time**.

- **Engineering team** remotely enabled the return order feature on specific couriers' apps (beta group only)
- **Local operations teams** in Portugal and Kenya created a real order, then canceled it after pickup to trigger the exact scenario
- **Research team** moderated the diary study over WhatsApp, with 4 structured check-in prompts throughout the day

Running a research study with a live, artificially-created order scenario in two markets simultaneously was logistically demanding — and the Kenya pilot had to be rolled back midway due to delivery zone issues discovered during the study.

**Diary study chosen over interviews** because the return order experience is time-sensitive and in-the-moment — a post-hoc interview would miss the immediate emotional response and decision-making process that happens in the field.

![Study setup: admin page (top) tracking the live order; WhatsApp-moderated diary with 4 structured prompts (bottom).](images/glovo-canceled-order-diary-setup-1.png)
*Study setup: admin page (top) tracking the live order; WhatsApp-moderated diary with 4 structured prompts (bottom).*

---

## Key Insights

**Two patterns emerged from affinity diagramming of the 8 diary responses:**

![Affinity diagram built from 8 courier diary responses — clustering observations around the return flow experience.](images/glovo-canceled-order-affinity-diagram.png)
*Affinity diagram built from 8 courier diary responses — clustering observations around the return flow experience.*

**1. Couriers prefer the new return automation — it gives them clarity and a sense of control.**

> *"The returning process was like a basic order. It was peaceful. I liked this process of returning and for me it would work really well."* — a courier in Portugal

The step-by-step structure made the process feel manageable. Confirmation messages gave peace of mind. Knowing they would be compensated reduced the sting of a canceled order.

**2. Important details are still missing in the flow and copy.**

- The cancellation notification was not prominent enough — easy to miss or confuse with a new order
- Return instructions were sometimes interpreted as a new delivery task
- Couriers wanted more detail on the compensation amount and timing
- The return confirmation didn't feel "official" enough to trust

**Hypothesis validated:** Automated return instructions improve courier experience compared to the previous absence of guidance.

![Courier journey map — pre-study artefact used to align the team on the current experience before the diary study launched.](images/glovo-canceled-order-customer-journey.png)
*Courier journey map — pre-study artefact used to align the team on the current experience before the diary study launched.*

---

## UX Recommendations

Two targeted changes before full rollout:

1. **Add the return address directly in the cancellation message** — not as a separate screen, but as part of the first notification
2. **Display full compensation details** — amount, timing, conditions — rather than a vague confirmation

---

## Impact

Recommendations were incorporated into a final design iteration before the feature launched globally. The product team used the courier journey map as a reference artefact throughout the sprint.

![UX Research Report — full findings and recommendations delivered to the product team.](images/glovo-canceled-order-research-report.png)
*UX Research Report — full findings and recommendations delivered to the product team.*

**Key learning:** Real-world diary studies

![50-second update flyer — distributed internally to keep stakeholders informed of research findings.](images/glovo-canceled-order-50s-flyer.png)
*50-second update flyer — distributed internally to keep stakeholders informed of research findings.* — where the scenario is created by coordinating with operations rather than simulated in a lab — produce substantially more reliable data for in-the-moment decisions. The coordination overhead is worth it. The Kenya rollback also taught me to surface operational risks earlier when research requires engineering and local team dependencies.
