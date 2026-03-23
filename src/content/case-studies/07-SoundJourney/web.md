---

title: "What If Your Spotify History Could Take You Somewhere? Designing SoundJourney"
slug: "soundjourney-product"
company: "SoundJourney"
discipline: ["Product Design", "Product Management"]
industry: "Consumer Apps"
market: ["Global"]
year: 2025
methods: ["Competitive analysis", "Concept testing", "Prototype testing"]
stack: ["Figma", "Spotify API", "React", "Node.js"]
project_type: ["Design"]
status: "completed"
nda: false
featured: true
work_type: "side-project"

---
# What If Your Spotify History Could Take You Somewhere? Designing SoundJourney

---

## The Context

SoundJourney is a product I designed and specified from scratch: a Spotify-connected travel discovery app that turns your listening history into personalised concert venue journeys.

This is a side project and product concept. The deliverable was a complete PRD — product strategy, matching architecture, Journey Builder functional specification, and an 8-week MVP roadmap. Development is planned.

---

## The Problem

Music apps know everything about your taste. Travel apps know nothing about who you are.

Spotify has 10+ years of your listening history. It knows your top artists, your genre fingerprints, how your listening shifts by mood and time of day. That data is a highly personal profile — behaviour, not declared preference. No product was using it to answer the question: *where should someone with your taste go next?*

The existing travel discovery market uses two levers: social proof (rated #1 by strangers) or generic personalisation (you went to London, here's Big Ben). Neither knows anything about who you actually are.

SoundJourney's bet: music taste is the richest honest signal available about a person's identity. If you build the matching logic correctly, the recommendations feel personal in a way that demographic targeting never can.

---

## What I Built

### Product strategy

The core experience is a "journey" — a single, curated venue experience explained through your music identity. Not a list. Exactly three journeys per session, each tied to a different facet of your taste, each independently explainable.

Three journeys, not more, because choice causes paralysis. Not fewer, because three gives enough variety to let users see different facets of their taste. Every product decision about the output format was made around this constraint.

The key UX principle: identity confirmation, not discovery. Users don't want to be told what they might like. They want to feel that the product already understands them. The language throughout uses second-person reflection: "You've listened to..." not "You might enjoy..."

### Matching architecture

A four-level hierarchical system that evaluates each slot in a journey independently:

| Level | Match type | Condition |
|---|---|---|
| 1 | Exact Artist | User's top artist has an event |
| 2 | Similar Artist | Related artist has an event |
| 3 | Genre Match | Genre fingerprint overlap above threshold |
| 4 | Venue/City Fallback | No music match — use location and venue quality signals |

Each slot in the three journeys evaluates the hierarchy from Level 1 down. A slot at Level 1 is a strong match; a slot at Level 4 is a contextual match. Users see the match reason — "You listen to a lot of X, and this artist is in the same genre" — which keeps the experience honest.

Confidence scoring is calculated per slot but not shown by default. Showing a score of 72% creates algorithm anxiety — users start interrogating the number instead of engaging with the recommendation. The score is available in the app's data layer but surfaced only on request.

### Journey Builder specification

The slot-filling algorithm:
- Each journey has 3 slots
- Per slot: evaluate Level 1 → Level 2 → Level 3 → Level 4
- No duplication of venues or artists across slots within a journey
- No duplication of the same Level-4 fallback venue across all three journeys
- Output schema per slot: venue, story (one sentence), match reason, confidence score, journey metadata

### 8-week MVP roadmap

| Weeks | Focus |
|---|---|
| 1–2 | Core flow: Spotify connect, profile generation, journey result screen |
| 3–4 | Magic moments: story generation, match explanation copy |
| 5–6 | Growth loop: share mechanic, return triggers |
| 7–8 | Ship and iterate |

---

## The Impact

- Complete PRD delivered: product strategy, algorithm spec, Journey Builder spec, roadmap
- Four-level matching hierarchy defined with clear escalation logic
- Journey Builder specification ready for engineering handoff
- Validation plan designed: 5 users, qualitative emotional resonance testing (does it feel personal? does the explanation land?)

---

## What I Learned

The most interesting design problem was the confidence score decision. A scoring system feels like it adds transparency — but showing 72% to a user who doesn't understand how the score is calculated creates doubt rather than trust. Hiding the score by default was the right call, but it required getting comfortable with the idea that the system could be rigorous internally while appearing simple externally.

The three-journeys constraint shaped every other decision. Once you fix the output at three, the matching logic, the UI layout, and the copy model all follow from that. Constraints as product strategy — starting with what the user experience needs to feel like and working backwards to what the system needs to do.

What this would need to become a real product: a live Spotify OAuth integration to validate the matching logic against real listening data before building the full UI. The algorithm is specified in enough detail to build — but there are edge cases (users with very narrow taste, users whose top artists have no tour dates) that will only emerge in testing.
