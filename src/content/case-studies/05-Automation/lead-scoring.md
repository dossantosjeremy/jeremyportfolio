---

title: "Scalable Lead Scoring System for B2B Prospecting"
slug: "lead-scoring"
company: "WEOP"
discipline: ["AI Automation"]
industry: "B2B SaaS"
market: ["Spain"]
year: 2025
methods: []
stack: ["n8n", "Google Sheets"]
project_type: ["Automation"]
status: "completed"
nda: false
featured: false
work_type: "freelance"

images:
  - filename: "automation-proposals-case.png"
    caption: "Portfolio view — automated and intelligent business case follow-up system"
  - filename: "automation-workflow-diagram-1.png"
    caption: "Lead scoring workflow — data enrichment → scoring logic → CRM update and routing"
---
# Scalable Lead Scoring System for B2B Prospecting

> **One-line hook**: A flat CSV with hundreds of companies isn't a lead list — it's noise. I built a scoring system that cuts through it automatically, tagging prospects by deal potential so outreach can focus where it matters.

---

## Snapshot

| | |
|---|---|
| **Role** | AI Automation Consultant (Internal) |
| **Client** | Internal — Jeremy's Agency Prospecting System |
| **Date** | 2025 |
| **Stack** | n8n · Google Sheets |
| **Impact** | ~80% reduction in manual lead qualification time · Top 20% of leads identified automatically · Reusable across campaigns and verticals |

---

## Problem

Outbound prospecting for automation consulting services generates large, flat lead lists — but not all leads are equal. Manually scanning hundreds of rows to assess revenue size, headcount, and contact seniority wasn't scalable, and gut-feel qualification introduced inconsistency into the outreach strategy.

**Key issues:**
- Lead lists were flat CSVs with no priority signal
- No way to distinguish high-value accounts from low-fit contacts at a glance
- Revenue, headcount, and job title fields were inconsistently populated
- Manual review slowed campaign launch by days

---

## Solution



![Portfolio view — automated and intelligent business case follow-up system](images/automation-proposals-case.png)
*Portfolio view — automated and intelligent business case follow-up system*A lightweight, reusable n8n workflow that scores every lead on three firmographic criteria and writes the result back to Google Sheets.

**Scoring Logic:**

*Revenue tiers (max 2 points)*
- Under $1M → 1 pt
- $1M–$5M → 2 pts
- $5M+ → bonus qualifier

*Headcount tiers (max 2 points)*
- Under 10 → 1 pt
- 10–50 → 2 pts
- 50+ → additional weight

*Title mapping (max 1 point)*
- "CEO," "Founder," "Head of," "Director" → 1 pt
- Generic titles → 0 pts

**Output columns written back to Sheets:**
- **Score** (1–5)
- **Segment tag**: "Priority" (4–5), "Secondary" (2–3), "Exclude" (<2)
- **Data quality flag**: highlights rows where revenue or headcount is missing, flagging them for enrichment

The workflow is triggered manually or on a schedule — a new batch of leads can be scored in seconds.

**Reusability:** The scoring thresholds and title keywords are configurable via the Sheet itself, so the same workflow can be re-parameterized for different campaigns or verticals without touching the automation.

---

## Impact



![Lead scoring workflow — data enrichment → scoring logic → CRM update and routing](images/automation-workflow-diagram-1.png)
*Lead scoring workflow — data enrichment → scoring logic → CRM update and routing*- **~80% reduction** in time spent qualifying leads manually
- **Top 20% identified** automatically for prioritized outreach
- Outreach reply rates improved due to better fit — reaching decision-makers at appropriately-sized companies
- The workflow serves as a reusable base: it's been adapted for multiple outbound campaigns across different automation service offerings
- Extensible for future enrichment steps (Clearbit, Apollo) or CRM sync

---

## Key Engineering Notes

The most important design decision was keeping the scoring logic transparent and editable — not abstracted away in the automation itself. By reading thresholds from the Sheet, any team member can adjust the scoring model without involving a developer. This was especially important for a solo consulting practice where the system needs to be self-serviceable.

The data quality flagging step (highlighting missing fields) turned out to be more valuable than anticipated: it revealed that roughly 30% of leads in the initial test batch had incomplete firmographic data — a finding that prompted a more systematic enrichment process upstream of the scoring workflow.
