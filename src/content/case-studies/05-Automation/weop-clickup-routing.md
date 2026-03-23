---

title: "WEOP — Specialized Asset Routing & Project Tagging in ClickUp"
slug: "weop-clickup-routing"
company: "WEOP"
discipline: ["AI Automation"]
industry: "Marketing & Branding"
market: ["Spain"]
year: 2025
methods: []
stack: ["Make", "Google Sheets", "ClickUp"]
project_type: ["Automation"]
status: "completed"
nda: false
featured: false
work_type: "freelance"

images:
  - filename: "automation-n8n-workflow.png"
    caption: "n8n workflow — intelligent routing logic distributing assets to correct ClickUp projects"
  - filename: "automation-workflow-diagram-1.png"
    caption: "Workflow diagram — trigger conditions, routing rules and ClickUp node configuration"
---
# WEOP — Specialized Asset Routing & Project Tagging in ClickUp

> **One-line hook**: After automating task creation, WEOP needed tasks to go to the right person automatically — based on asset type, project category, and assignee availability. Assignee routing logic, now handled without human intervention.

---

## Snapshot

| | |
|---|---|
| **Role** | AI Automation Consultant (Freelance) |
| **Client** | WEOP — Branding & Performance Agency, Spain |
| **Date** | April 2025 |
| **Stack** | Make · Google Sheets · ClickUp |

---

## Problem

Following the Google Sheets ↔ ClickUp task creation automation, WEOP faced a second challenge: specialized asset tasks (design, copy, video, SEO) needed to be routed to the right team member automatically. Manually assigning tasks after creation was still creating a bottleneck.

**Key issues:**
- No automatic assignee logic for different asset types
- Project tags inconsistently applied
- Assignees changed with project load — routing needed to be flexible

---

## Solution



![n8n workflow — intelligent routing logic distributing assets to correct ClickUp projects](images/automation-n8n-workflow.png)
*n8n workflow — intelligent routing logic distributing assets to correct ClickUp projects*A second Make.com scenario built on top of the first, adding:
- **Assignee Routing Logic** — maps asset type (design, copy, video, SEO) to current assignee IDs from a routing table in Google Sheets
- **Project Tagging** — automatically applies ClickUp tags based on project category and service type
- **Flexible Routing Table** — the Google Sheet routing table can be updated by WEOP without touching the automation
- **Error Handling** — unrouted tasks flagged in a review sheet rather than silently dropped

---

## Impact



![Workflow diagram — trigger conditions, routing rules and ClickUp node configuration](images/automation-workflow-diagram-1.png)
*Workflow diagram — trigger conditions, routing rules and ClickUp node configuration*- Tasks are assigned and tagged at creation — zero post-creation manual work
- Routing table allows WEOP to adjust assignees as team capacity changes
- The two automations together (task creation + routing) form a complete intake-to-assignment pipeline

---

## Combined System Architecture (WEOP ClickUp Suite)

```
Google Sheets (client brief row added)
  → Task Creation Automation
    → Folder/List created or found via mapping tables
      → Task created in correct list
        → Routing Automation triggered
          → Asset type detected
            → Assignee mapped from routing table
              → Tags applied
                → Task complete in ClickUp
```
