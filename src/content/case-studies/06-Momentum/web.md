---

title: "From Dream to Discipline: Designing Momentum, an AI-Powered Goal-Achievement App"
slug: "momentum-app"
company: "Momentum"
discipline: ["UX Research", "Product Design"]
industry: "Consumer Apps"
market: ["Spain", "France", "UK"]
year: 2024
methods: ["In-depth interviews", "Concept testing", "Usability testing", "Prototype testing", "Competitive analysis", "Affinity mapping"]
stack: ["Figma", "Maze", "Lookback", "Google Forms", "Dovetail"]
project_type: ["Discovery", "Design"]
status: "completed"
nda: false
featured: true
work_type: "side-project"

---
# From Dream to Discipline: Designing Momentum, an AI-Powered Goal-Achievement App

---

## The Context

Momentum is an AI-powered goal-achievement app. The concept: take any life goal or dream and translate it into a realistic, structured, habit-driven plan — personalised to the user's time, motivation, and starting point.

This was a team side project. I led the UX research programme: strategy, script development, participant recruitment across three markets, moderated testing sessions, synthesis, and design recommendations. I also contributed to product design direction based on what the research found.

The research ran in August 2024. We had a working prototype and needed to know whether the core concept landed, and what was broken.

---

## The Problem

Self-improvement apps fail at the same point: the gap between "I want to run a marathon" and "here's what you do tomorrow at 7am" never gets bridged. Users set goals and then have no idea what to do next. Most apps either oversimplify (to-do lists) or overwhelm (complex frameworks without guidance).

The Momentum concept was a four-stage model:
1. Goal Translation — user inputs a dream, AI converts it to a SMART goal through dialogue
2. Plan Design — app creates a structured plan with schedule and milestones
3. Habit Commitment — plan encoded into daily habits with specific implementation intentions
4. Daily Accountability — app checks in, tracks progress, adapts if user falls behind

We needed to know: does this resonate with real users? And where does it break?

---

## What I Did

I ran two types of research in parallel: discovery interviews and usability testing on the working prototype.

**Discovery interviews (8 participants, ES/FR/UK)**

Product-agnostic. I wanted to understand how users already thought about goal-setting before we showed them anything. Questions about existing habits, what had worked and failed, what an ideal tool would feel like.

Keeping this separate from the prototype testing was deliberate — it gave us a baseline to separate product-specific friction from deeper behavioural patterns.

**Usability testing (7 moderated sessions, 45–60 min each)**

Think-aloud protocol with the working Momentum prototype. Tasks covered: onboarding, goal input, goal refinement dialogue, plan review, and daily check-in.

I recruited 15 participants total across past goal-app users and people currently working toward a life goal. Mix of employed, self-employed, and students across the three markets.

I also ran competitive analysis before the primary research — mapping Atoms, Dreamfora, Habitica, Fabulous, and others against the Momentum proposition. This gave us a clear picture of the gap we were trying to fill.

---

## Key Findings

### Finding 1: Technical language kills onboarding

The single most consistent failure across sessions: "roadmap," "milestones," "OKRs," "KPIs." Every time a participant hit one of these terms in onboarding, they slowed down. Several expressed intent to leave.

> *"I don't know what an OKR is. Is this for businesses?"*

> *"I just want to run a marathon. This feels too complicated."*

The underlying model was sound. The language positioned it as a productivity tool for professionals, not a personal coach for regular people.

**Design direction:** Replace all framework terminology with everyday language. "Decide what success looks like" instead of "set your OKRs." Frame the AI as a coach throughout.

### Finding 2: Onboarding asked users to categorise before they had anything to anchor to

The initial onboarding presented three goal typologies simultaneously (Self-made, Guided, Pre-Made). Users wanted to start with their goal — not categorise it.

> *"I just want to type in what I want to do. Why do I need to pick a type first?"*

**Design direction:** Progressive disclosure. Start with free-form input. Categorise and structure happens behind the scenes.

### Finding 3: The AI dialogue was the strongest moment in the product

When the goal refinement dialogue worked, participants responded strongly. Several used the phrase "feeling heard." The back-and-forth iteration on their goal made the app feel like it was understanding them.

> *"This is exactly what I needed. It's like talking to a personal trainer."*

**Design direction:** The conversational AI mechanic is the differentiator. Eliminate everything that breaks the conversational flow — forms, dropdowns, toggles inside the dialogue.

### Finding 4: Users wanted to feel progress before they'd done anything

Visual progress, streaks, completion maps — users wanted these from the moment the plan was generated, not after they'd done the first thing.

> *"I want to feel like I'm already on the way before I've done the first task."*

**Design direction:** Show the journey map as soon as the plan generates. Micro-celebrations as default, not optional.

### Finding 5: Autonomy with guardrails

Users wanted ownership over their plan — and they wanted the AI to know what was best for them. The sweet spot: AI recommends, user confirms, adjustments are always possible.

**Design direction:** Present all AI-generated plans as proposals. Build obvious "adjust this" affordances at every stage. Set defaults intelligently — don't make users configure everything from scratch.

---

## The Impact

- Core concept validated: the goal-translation mechanic (dream → SMART goal → plan) was the most appreciated part of the product
- Language barrier identified as the critical onboarding fix — high urgency
- 4 prioritised design directions produced with participant evidence
- Competitive gap confirmed: no existing app adequately bridges personalised AI coaching with accessible language and habit accountability

**Design directions delivered:**
- Plain-language copy guidelines for onboarding and goal-setting flows
- Recommended IA restructuring (free-form input first, structure emerges)
- Design principles for the AI conversational interface
- Progress visualisation requirements based on motivation patterns across 15 participants

---

## What I Learned

Running discovery and usability testing in parallel was the right call. The discovery interviews surfaced the "what do I do next?" problem. The usability tests showed exactly where the product failed to answer it. The two datasets triangulated cleanly.

What I'd do differently: a longitudinal component. The daily check-in flow is genuinely hard to evaluate in a single session. A 5-day diary study would have captured habit formation dynamics that a one-time test can't reach.

The broader learning about AI product UX: the gap between a good AI concept and a good AI experience is almost entirely a language and framing problem. The underlying model can be sophisticated — but if the user-facing language isn't calibrated to their mental model, the intelligence is invisible.
