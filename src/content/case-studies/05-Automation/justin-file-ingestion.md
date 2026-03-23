---

title: "AI File Ingestion Bot for Metadata Tagging"
slug: "justin-file-ingestion"
company: "Crown Jewel Marketing"
discipline: ["AI Automation"]
industry: "Consulting"
market: ["USA"]
year: 2025
methods: []
stack: ["n8n", "Whisper", "AI", "Box", "Google Sheets", "CloudConvert"]
project_type: ["Automation"]
status: "completed"
nda: false
featured: false
work_type: "freelance"

images:
  - filename: "automation-doc-gen-flow.png"
    caption: "Document processing pipeline — file ingestion → AI analysis → metadata tagging → storage"
  - filename: "automation-workflow-diagram-2.png"
    caption: "Workflow diagram — ingestion trigger, AI categorisation logic and output routing"
---
# AI File Ingestion Bot for Metadata Tagging

> **One-line hook**: A retiring founder's knowledge archive — 4,500+ files in mixed formats with inconsistent naming — needed to become a searchable, structured asset library. I built the bot that made it happen automatically.

---

## Snapshot

| | |
|---|---|
| **Role** | AI Automation Consultant (Freelance) |
| **Client** | Justin Sheehan — Crown Jewel Marketing |
| **Industry** | Leadership Consulting / Private Equity |
| **Date** | May–June 2025 |
| **Stack** | n8n · Whisper · GPT-4 (OpenAI) · Box · Google Sheets · CloudConvert · ConvertAPI |
| **Impact** | 6 file formats processed in under 90 seconds · 20+ metadata fields auto-generated per file · 100% file traceability with Box links |

---

## Problem

Justin was preparing a retiring founder's knowledge archive for use in a future AI knowledge assistant. The challenge: 4,500+ files across PDFs, Word documents, Outlook `.msg` files, PowerPoints, and video — with inconsistent naming, unreliable folder structures, and no metadata.

Box's built-in search was too unreliable to be useful at scale. Manual tagging was completely infeasible at that volume. The archive needed to become structured before any AI layer could sit on top of it.

**Key issues:**
- Files spanned 6+ formats with no consistent naming convention
- No metadata: no topics, no summaries, no content types
- Versioning and access levels had never been tracked
- Must work on both cloud and DigitalOcean self-hosted infrastructure

---

## Solution



![Document processing pipeline — file ingestion → AI analysis → metadata tagging → storage](images/automation-doc-gen-flow.png)
*Document processing pipeline — file ingestion → AI analysis → metadata tagging → storage*A multi-format AI ingestion pipeline that handles any file type and returns structured metadata automatically.

**1. Web Form Upload**
A structured form captures uploader identity, access level, and version — with drag-and-drop support for single or multi-file upload. Input is validated before any processing begins.

**2. File Type Detection & Routing**
The workflow detects file type (PDF, DOCX, PPTX, audio, video, `.msg`/`.eml`) and routes to the appropriate processing branch. No manual categorization needed.

**3. Content Extraction**
- **Audio/video**: Transcribed via Whisper
- **DOCX/PPTX**: Converted to PDF via CloudConvert or ConvertAPI for page count extraction
- **Email (.msg/.eml)**: Parsed for sender, subject, body, and attachment context

**4. Metadata Enrichment via GPT-4**
Each file's extracted content is passed to GPT-4, which generates:
- Auto-title (standardized)
- Topic classification
- Short summary (2–3 sentences)
- Bullet point summary
- Content type label
- Suggested tags
- Manual QA flag (where confidence is low)

**5. Standardized Renaming & Storage**
Files are renamed using the convention:
`Category_Topic_Title_ContentType_Date_Version.ext`

Then uploaded to the correct Box folder and logged to a shared Google Sheet with all 20+ metadata fields, including the Box direct link.

**Architecture decision**: Rather than hardcoding logic for each file type, the routing uses a modular node structure — making it easy to add new formats (e.g., `.eml`, scanned image PDFs) without reworking the core flow.

---

## Impact



![Workflow diagram — ingestion trigger, AI categorisation logic and output routing](images/automation-workflow-diagram-2.png)
*Workflow diagram — ingestion trigger, AI categorisation logic and output routing*- **Under 90 seconds** to process any supported file format end-to-end
- **20+ metadata fields** auto-generated per file, including Box link, topic, summary, and tags
- **100% traceability**: every file has a Sheet row with a direct Box link
- **Scale-ready**: supports both N8N Cloud and DigitalOcean self-hosted deployments
- **Foundation for RAG**: the structured metadata index is the pre-processing layer for the planned AI knowledge assistant

---

## Key Engineering Notes

The critical challenge was handling format heterogeneity without creating a brittle conditional tree. The solution was a routing architecture where each file type triggers its own sub-workflow, each returning a standardized output object — meaning GPT-4 and the metadata enrichment stage always receive the same input shape regardless of source format.

Whisper transcription accuracy on leadership consulting video content (often dense with jargon) was high enough that GPT-4 could generate meaningful summaries from raw transcripts without a cleaning step. For `.msg` files specifically, the challenge was parsing nested email threads — handled by extracting the most recent message body and metadata, not the full chain.

---

## Next Steps (Planned)

- Bi-directional sync from Box → Sheets for file updates
- Vector store layer + chatbot interface for RAG querying
- Internal QA workflow before final file upload
- Scheduled ingestion for shared Box folder monitoring
- Bulk legacy ingestion phase (processing all 4,500+ archived files)
