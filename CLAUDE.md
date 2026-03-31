# Design System
**Jeremy Dos Santos — Agency Website**
`/src/index.css` is the single source of truth for all design tokens.

---

## Design Principles

1. **Apple-influenced minimalism** — generous whitespace, tight type, restrained palette. Nothing decorative that isn't functional.
2. **Motion with purpose** — animations serve hierarchy (stagger reveals, cycling text) or delight (card glows, marquee). Nothing moves for the sake of it.
3. **Dark-on-light by default** — white and surface sections dominate; navy and primary sections are reserved for high-contrast moments (timeline, footer, CTA).
4. **Consistent section rhythm** — every section follows a label → heading → body → content hierarchy. Deviation signals intentional emphasis.

---

## Colour Tokens

Defined in `@theme` in `src/index.css`. Referenced throughout as Tailwind utilities (`text-primary`, `bg-surface`, etc.).

| Token | Utility | Hex | Usage |
|---|---|---|---|
| `--color-primary` | `primary` | `#0066cc` | Interactive elements, CTAs, active states, accent text |
| `--color-teal` | `teal` | `#0066cc` | Section labels, availability dot, timeline dots — same value as primary; kept as a semantic alias |
| `--color-text` | `text` | `#1d1d1f` | All body copy and headings on white/surface backgrounds |
| `--color-grey` | `grey` | `#86868b` | Supporting body text, subtitles, metadata |
| `--color-navy` | `navy` | `#1d1d1f` | Dark section backgrounds (timeline, footer) — same hex as text; semantic alias for bg use |
| `--color-background` | `background` | `#ffffff` | Page background, card fill |
| `--color-surface` | `surface` | `#f5f5f7` | Alternate section backgrounds, input fills, pill badges |
| `--color-cardborder` | `cardborder` | `#d2d2d7` | Card borders, dividers, nav border |

### Colour in context

| Section type | Background | Heading colour | Body colour |
|---|---|---|---|
| Default | `bg-white` | `text-text` | `text-grey` |
| Alternate | `bg-surface` | `text-text` | `text-grey` |
| Dark (timeline, footer) | `bg-navy` | `text-white` | `text-gray-400` / `text-white/70` |
| Accent (CTA) | `bg-primary` | `text-white` | `text-white/80` |

### Opacity modifiers used in dark sections
- `text-white/10` — very subtle rule/border
- `text-white/15` — timeline connector line
- `text-white/25` — step timing labels
- `text-white/30` — footer column headers
- `text-white/40` — footer legal text
- `text-white/70` — footer body text
- `bg-primary/10`, `bg-teal/10` — decorative blur blobs in footer

---

## Typography

### Font families

```css
--font-heading: -apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif;
--font-body:    -apple-system, BlinkMacSystemFont, "SF Pro Text",    system-ui, sans-serif;
```

Applied via: `font-heading` and `font-body` Tailwind utilities.
Base `<body>` uses `font-body`. All `h1–h6` elements use `font-heading font-semibold tracking-tight` (set in `@layer base`).

### Type scale in use

| Context | Tailwind class | Notes |
|---|---|---|
| Hero H1 | `text-5xl md:text-6xl lg:text-[64px]` | `font-bold`, `leading-[1.1]`, `tracking-tight` |
| Page H1 | `text-5xl md:text-6xl` | `font-bold`, `tracking-tight` |
| Section H2 | `text-4xl` | `font-bold` |
| Large section H2 | `text-4xl md:text-5xl` | CTA and footer headings |
| Footer H2 | `text-5xl md:text-7xl` | Maximum scale, footer only |
| Card / step H3 | `text-2xl` | `font-bold` |
| Body large | `text-xl` | `text-grey leading-relaxed` — hero subtitle, section intros |
| Body standard | `text-lg` | `text-grey leading-relaxed` — card descriptions, step body |
| Navigation | `text-lg font-medium` | Footer nav links |
| Label | `text-[11px] font-medium uppercase tracking-[0.05em]` | Section overlines in teal/primary |
| Label (footer variant) | `text-[11px] font-bold uppercase tracking-label` | `text-white/30` or `text-primary` |
| Small / metadata | `text-sm` | Tags, pills, footer legal |
| Tag / badge | `text-xs font-bold uppercase tracking-label` | Discipline badges on work cards |

### Label pattern
Every major section opens with a small overline label before the heading:
```jsx
<div className="text-teal text-[11px] font-medium uppercase tracking-label mb-4">
  Section name
</div>
```

---

## Spacing

### Layout container
```css
max-w-7xl mx-auto px-8
```
Used on all sections. `px-8` = 32px horizontal padding.

### Section vertical rhythm

| Context | Class |
|---|---|
| Standard section | `py-24` (96px top + bottom) |
| Dense timeline section | `py-[96px]` |
| Hero | `pt-[100px] pb-20` |
| Page hero header | `pt-[80px] pb-12` |
| Footer | `pt-32 pb-12` |

### Card internal padding
- Standard cards: `p-8` (32px)
- Dense / sidebar cards: `p-10` (40px)
- Communication norm cards: `p-10`

### Gap scale
- Grid gaps: `gap-6`, `gap-8`, `gap-12`, `gap-24`
- Flex gaps (nav icons, social links): `gap-3`, `gap-4`, `gap-6`, `gap-8`
- Section heading → body: `mb-6` or `mb-8`
- Section heading → grid: `mb-12` or `mb-16`
- Hero headline → subtitle: `mb-6`; subtitle → CTAs: `mb-10`

---

## Border Radius

| Token | Tailwind | Value | Used for |
|---|---|---|---|
| `--radius-card` | `rounded-card` | `24px` | All cards, section wrappers |
| `--radius-btn` | `rounded-btn` | `9999px` | All buttons, pill CTAs |
| — | `rounded-full` | `9999px` | Badges, avatar circles, icon wrappers, nav pill |
| — | `rounded-[20px]` | `20px` | GlowCard inner container |
| — | `rounded-[32px]` | `32px` | Work carousel cards |

---

## Elevation & Shadow

### Card hover (standard)
```css
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 30px -6px rgba(26, 107, 255, 0.15);
  border-color: rgba(26, 107, 255, 0.3);
}
```
Applied to `.rounded-card` globally in `index.css`.

### Work carousel card hover
```css
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px -8px rgba(26, 107, 255, 0.25);
  border-color: rgba(26, 107, 255, 0.3);
}
```

### GlowCard
Proximity-aware animated border glow. Parameters: `spread: 40`, `proximity: 64`, `borderWidth: 3`. Inner card lifts `hover:-translate-y-1`. Used for features, testimonials.

### Shallow elevation
`shadow-sm` — used on buttons and standard cards at rest.

### Nav blur
`bg-white/80 backdrop-blur-md` — top nav bar frosted glass effect.

### Pill nav blur
`bg-white/50 border border-zinc-200 backdrop-blur-lg shadow-lg` — floating bottom/top nav pill.

---

## Motion & Animation

### Defined in `index.css`

| Name | Class | Duration | Usage |
|---|---|---|---|
| Aurora | `animate-aurora` | 60s linear infinite | Hero background gradient |
| Text slide | `animate-text-slide` | 7.5s cubic-bezier(0.83,0,0.17,1) | Hero H1 cycling phrases |
| Marquee | `animate-marquee` | 40s linear infinite | Logo strip / ribbon; pauses on hover |
| Pulse | `animate-pulse` | Tailwind default | Availability badge dot, footer status dot |

### Framer Motion (via `framer-motion`)
Used in `NavBar` for the active tab indicator — `layoutId` spring animation. Used in `Hero` for entrance effects.

### Scroll-driven transform (Hero)
Hero right panel uses a passive scroll listener to apply `rotateX` (20° → 0°) and `scale` as the user scrolls down. Max effect at 400px scroll depth.

### Process timeline stagger
On tab switch, each `.timeline-step` is reset to `opacity: 0 / translateY(20px)` then revealed with a `0.5s ease` transition, staggered at `100ms * index + 50ms` intervals.

### Easing reference
All card and interactive transitions use: `cubic-bezier(0.4, 0, 0.2, 1)` (Material Design "standard" curve).

---

## Component Patterns

### Buttons

**Primary CTA**
```jsx
<a className="bg-primary text-white px-8 py-4 rounded-btn font-medium hover:bg-primary/90 transition-colors shadow-sm text-lg">
  Label
</a>
```

**Secondary / Ghost**
```jsx
<a className="bg-transparent border border-cardborder text-text px-8 py-4 rounded-btn font-medium hover:bg-surface transition-colors text-lg">
  Label
</a>
```

**Pill tab (active / inactive)**
```jsx
// Active
<button className="bg-primary text-white px-6 py-3 rounded-full font-medium transition-colors shadow-sm">

// Inactive
<button className="bg-surface text-grey hover:text-text px-6 py-3 rounded-full font-medium transition-colors">
```

**Dark section CTA**
```jsx
<a className="inline-block bg-white text-primary px-10 py-4 rounded-btn font-bold text-lg hover:bg-surface transition-colors shadow-sm">
```

### Cards

**Standard card**
```jsx
<div className="rounded-card border border-cardborder bg-white p-8">
```

**Surface card**
```jsx
<div className="bg-surface p-10 rounded-card flex flex-col items-center justify-center text-center">
```

**Dark card (inside navy section)**
```jsx
<div className="border border-white/10 rounded-card p-8 bg-transparent">
```

**GlowCard** — wraps any card content with proximity border glow. Import from `./GlowCard`.

### Section heading block
The canonical pattern used across all sections:
```jsx
<div className="text-teal text-[11px] font-medium uppercase tracking-label mb-4">
  Overline label
</div>
<h2 className="text-4xl font-heading font-bold text-text mb-6 tracking-tight">
  Section heading
</h2>
<p className="text-lg md:text-xl text-grey leading-relaxed">
  Supporting body copy.
</p>
```

### Badges / pills
```jsx
// Tag on work card
<span className="text-xs font-bold uppercase tracking-label px-3 py-1 rounded-full bg-teal/10 text-teal">
  UX Research
</span>

// Deliverable pill (dark section)
<div className="inline-block bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium">
  📄 Deliverable label
</div>

// Availability badge
<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface text-grey text-sm font-medium">
  <span className="w-2 h-2 rounded-full bg-teal animate-pulse"></span>
  Available for new projects
</div>
```

### Navigation

**Top bar** — fixed, `z-40`, `bg-white/80 backdrop-blur-md border-b border-cardborder`. Logo left, no nav items (delegated to pill nav).

**Pill nav** (`NavBar`) — fixed, `z-50`, centered. Desktop: sits below top bar at `sm:top-0 sm:pt-6`. Mobile: pinned to bottom at `bottom-0 mb-6`. Active tab has `bg-zinc-100 text-primary` + Framer Motion layout animation.

### Timeline step (Process page)
Each step has a sticky left column (dot + timing label) and a content card on the right. On mobile, timing label moves above the card. The connector line is `absolute left-8 w-[1px] bg-white/15`.

### FAQ accordion
`maxHeight` toggle pattern — closed: `max-h-0 overflow-hidden`, open: `max-h: scrollHeight`. Icon rotates `0° → 180°` with `transition-transform duration-300`.

### Decorative blur blobs (footer)
```jsx
<div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
```
Positioned absolutely at corners, behind content (`z-10` on content).

---

## Layout & Grid

### Page structure
```
<nav>           fixed top bar + floating pill nav
<main>
  <Hero />      AuroraBackground, 12-column grid (7 + 5)
  <Section />   alternating white / surface backgrounds
  ...
</main>
<Footer />      navy background
```

### Grid patterns
| Context | Class |
|---|---|
| Hero | `grid grid-cols-1 lg:grid-cols-12` → `lg:col-span-7` + `lg:col-span-5` |
| Feature cards | `grid grid-cols-1 md:grid-cols-3 gap-6` |
| Services | `grid grid-cols-1 md:grid-cols-3 gap-8` |
| Testimonials | `grid grid-cols-1 md:grid-cols-3 gap-6` |
| Footer top | `grid grid-cols-1 md:grid-cols-2 gap-24` |
| Footer bottom links | `grid grid-cols-2 gap-12` |

---

## Iconography

All icons from `lucide-react`. Standard size: `w-6 h-6`. Used in nav items, section cards, social links, and arrows.

Icon wrapper pattern:
```jsx
<div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center text-teal mb-6">
  <svg className="w-6 h-6" />
</div>
```

---

## Page Routing

| Route | Component | Background pattern |
|---|---|---|
| `/` | Home (Hero + sections) | Aurora → white → surface → white → … |
| `/services` | Services | white |
| `/work` | Work | white |
| `/work/:slug` | CaseStudy | white |
| `/process` | Process | white → navy → white → surface → white |
| `/profile` | Profile | white |
| `/contact` | Footer only | navy |
| `/admin` | Admin | white |

---

## Do / Don't

| Do | Don't |
|---|---|
| Use `rounded-btn` for all interactive buttons | Use `rounded-md` or `rounded-lg` on buttons |
| Use `rounded-card` for all card wrappers | Mix arbitrary radius values on cards |
| Use `rounded-full` for icon wrappers and badges | Use `rounded-lg` on icon wrappers |
| Use the label → H2 → body hierarchy in every section | Jump straight to a heading with no overline |
| Use `text-grey` for supporting body copy | Use `text-gray-500` or other grey utilities |
| Use `bg-surface` for alternate-row sections | Use `bg-gray-100` or other off-white utilities |
| Use `bg-primary` / `text-primary` for CTAs and interactive elements | Hardcode `bg-blue-600` / `text-blue-600` |
| Keep section padding at `py-24` | Use arbitrary vertical padding values |
| Use `cubic-bezier(0.4, 0, 0.2, 1)` for all transitions | Use linear or ease transitions on interactive elements |
| Use `transition-colors` for colour-only hover changes | Animate transforms and colours in the same `transition` shorthand |
| Use `text-white/80` for body copy on primary backgrounds | Use pure `text-white` for everything on coloured backgrounds |
| Use `hover:bg-surface` on light-bg ghost buttons | Use `hover:bg-gray-50` |
| Keep decorative elements in `absolute` positioning behind `z-10` content | Let decorative blur blobs interfere with layout flow |

---

## Project Info

- **Local path:** `/Users/jeremydossantos/Desktop/Agency & Freelance/04_Website/WebsiteWithCopy`
- **Live URL:** https://jeremyportfolio-alpha.vercel.app/
- **GitHub:** https://github.com/dossantosjeremy/jeremyportfolio
- **Deployment:** Vercel — auto-deploys on push to `main`
- **Stack:** React 19 · TypeScript · Vite 6 · Tailwind v4 · React Router v7 · Framer Motion
- **Admin panel:** `/admin` — requires Supabase Auth login (set up user at https://supabase.com/dashboard/project/fuqfnhyiyoviaoabfeqg)
