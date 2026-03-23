# SoundJourney — Music-to-Travel Discovery App
### Slide / PDF Deck Version

---

## SLIDE 1 — Hook

**Spotify knows exactly who you are. Travel apps don't know you exist.**

SoundJourney bridges the gap: connect your Spotify account, and the app translates your listening history into three personalised venue journeys — concerts and experiences anchored in what you actually love.

I designed the product strategy, matching algorithm, and full PRD for this 2026 product concept.

---

## SLIDE 2 — Snapshot

| | |
|---|---|
| **Role** | Product Designer & Product Manager |
| **Project type** | Personal project — 2026 concept |
| **Deliverable** | Full PRD: vision + matching architecture + 8-week roadmap |
| **Tech** | Spotify OAuth · Matching engine · Lovable |
| **Status** | Specification complete; development planned |

---

## SLIDE 3 — The Problem

**Discovery apps know what others liked. SoundJourney knows who you are.**

| Current tools | SoundJourney |
|---|---|
| Generic recommendations | Personalised to your listening identity |
| Social proof (what others rated) | Behavioural signal (what you actually play) |
| Venue lists | Exactly 3 curated journeys |
| Algorithmic black box | Every match is explained in plain language |

**The core insight:** Music listening history is the most honest self-report data available. Not what people say they like — what they actually play, on repeat, every morning.

---

## SLIDE 4 — What a Journey Is

**Not a list. A curated set of three.**

Each journey has:
- One anchor (a specific artist, genre, or venue identity from your taste)
- One venue with upcoming events
- One story — the sentence that explains the connection

> *"You listen to Bicep every week — they're playing at Fabric in London next month. This is their home venue."*

The product succeeds when the user reads their three journeys and thinks: *this understands me*.

---

## SLIDE 5 — The Matching Architecture

**Four-level hierarchy, slot-by-slot:**

| Level | Match type | Confidence |
|---|---|---|
| 1 — Exact Artist | Your top Spotify artist has an upcoming event | 0.90–1.00 |
| 2 — Similar Artist | Related artist (Spotify API) has an event | 0.75–0.89 |
| 3 — Genre Match | Your genre fingerprint overlaps with venue tags | 0.60–0.74 |
| 4 — Venue Fallback | Venue aligned to your sonic identity | 0.45–0.59 |

**Key rule:** The hierarchy is applied per journey slot — not globally. Each slot independently tries Level 1 first. This means users can get a mix: one exact match, one similar artist match, one genre match.

No artist or venue is ever repeated across the three journeys.

---

## SLIDE 6 — Product Design Decisions

| Decision | Rationale |
|---|---|
| Exactly 3 journeys (never more) | Curation vs. catalogue — 3 maximises engagement, minimises paralysis |
| Story field (plain language explanation) | Resonance requires explanation; black-box matching feels impersonal |
| Hierarchy resets per slot | Ensures diversity — one exact match doesn't crowd out two genre discoveries |
| Confidence scores hidden by default | Reduces algorithm anxiety; expert view available for transparency |
| Journeys refresh with Spotify listening | Discovery stays ambient — no active user effort required |

---

## SLIDE 7 — 8-Week Roadmap

```
Weeks 1–2:  Core Flow
            Spotify OAuth + Journey Builder + basic result screen

Weeks 3–4:  Magic Moments
            Story generation + venue imagery + confidence scoring

Weeks 5–6:  Growth Loop
            Journey saving + social sharing + listening refresh

Weeks 7–8:  Ship & Scale
            Edge case testing + 5-user validation + launch prep
```

---

## SLIDE 8 — Validation Plan

**The central product risk:** Does a technically correct match *feel* personal?

**Approach:** 5-user qualitative sessions, focused on emotional resonance.

**Protocol:** Show result screen immediately after Spotify connect. No instructions. Measure spontaneous response.

**Threshold:** 4 of 5 users express recognition ("this feels like me") before any prompt.

**Secondary check:** Level 1 (Exact Artist) should generate results for >60% of users. If Level 4 (Fallback) is triggered >25% of the time, the candidate pipeline needs enrichment.

---

## SLIDE 9 — The Hardest Design Challenge

**Writing the `story` field.**

The line between "this gets me" and "this is stalking me" is narrow — and it's determined by the language of the match explanation, not the quality of the match.

The spec defines:
- What information can appear in the story (artist name ✓, listening frequency × — too surveillance-like)
- Tone: personal but not intimate, specific but not intrusive
- Length: one sentence maximum — a story, not a report

This is where product design and AI content design intersect — and where most products fail.

---

## SLIDE 10 — What This Signals

**Three PM capabilities this project demonstrates:**

1. **Product strategy from first principles** — identifying a genuine market gap (music identity as discovery signal) and defining the product logic to exploit it

2. **Technical product design** — specifying an algorithm as a product artefact: rules, constraints, output contracts, edge cases — not as an engineering brief, but as a product design document

3. **Validation before build** — defining success criteria (emotional resonance threshold) and research protocol before a line of code is written
