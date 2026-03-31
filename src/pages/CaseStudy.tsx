import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { portfolioProjects } from '../data/portfolioData';
import { caseStudyMap } from '../data/caseStudyContent';
import { useEditMode, EDIT_PREFIX } from '../context/EditContext';

// ── Images served from /public/case-studies/[slug]/ ────────────────────────
const imageManifest: Record<string, { src: string; caption: string }[]> = {
  'psa-peugeot-neural-up': [
    { src: '/case-studies/psa-peugeot-neural-up/psa-cover.png',                   caption: 'Neural Up® — in-car audio relaxation system overview' },
    { src: '/case-studies/psa-peugeot-neural-up/psa-context.png',                 caption: 'Study context — cabin environment and driver setup' },
    { src: '/case-studies/psa-peugeot-neural-up/psa-measurement-framework.png',   caption: 'Measurement framework — EDA + HR + psychometric combined protocol' },
    { src: '/case-studies/psa-peugeot-neural-up/psa-conditions.png',              caption: 'Sound conditions tested — four rotation variants' },
    { src: '/case-studies/psa-peugeot-neural-up/psa-results-physiological.png',   caption: 'Physiological results — arousal reduction across conditions' },
    { src: '/case-studies/psa-peugeot-neural-up/psa-results-subjective.png',      caption: 'Subjective results — relaxation ratings per condition' },
  ],
  'renault-ai-living': [
    { src: '/case-studies/renault-ai-living/renault-use-case-scenarios.png',  caption: 'Use case scenarios — six AI interaction contexts evaluated' },
    { src: '/case-studies/renault-ai-living/renault-journey-ambient.png',     caption: 'Ambient AI journey — how the assistant adapts across drive phases' },
    { src: '/case-studies/renault-ai-living/renault-enablers-levels.png',     caption: 'Attachment enablers — five-factor model across functional and emotional levels' },
    { src: '/case-studies/renault-ai-living/renault-hmi-visuals.png',         caption: 'HMI visual concepts — design stimuli used in evaluation studies' },
    { src: '/case-studies/renault-ai-living/renault-hmi-speed-usecase.png',   caption: 'Speed use case — AI assistant behaviour at variable driving speeds' },
  ],
  'glovo-courier-support': [
    { src: '/case-studies/glovo-courier-support/glovo-support-redesign-cover.png',  caption: 'Support IA redesign — overview of the restructured contact tree' },
    { src: '/case-studies/glovo-courier-support/glovo-support-card-sorting.png',    caption: 'Card sorting — couriers grouping support topics by their own mental model' },
    { src: '/case-studies/glovo-courier-support/glovo-support-tree-test-1.png',     caption: 'Tree test results — findability scores before redesign' },
    { src: '/case-studies/glovo-courier-support/glovo-support-tree-test-2.png',     caption: 'Tree test results — findability scores after redesign (+58%)' },
    { src: '/case-studies/glovo-courier-support/glovo-support-prototype.png',       caption: 'Prototype — redesigned support flow tested with couriers' },
    { src: '/case-studies/glovo-courier-support/glovo-support-contact-tree.png',    caption: 'Contact tree — final IA recommendation adopted by product team' },
  ],
  'glovo-note-taking': [
    { src: '/case-studies/glovo-note-taking/glovo-note-taking-context.jpg',            caption: 'Research context — couriers during active delivery rounds' },
    { src: '/case-studies/glovo-note-taking/glovo-note-taking-persona-main.jpg',       caption: 'Primary persona — main courier archetype and note-taking behaviour' },
    { src: '/case-studies/glovo-note-taking/glovo-note-taking-persona-secondary.jpg',  caption: 'Secondary persona — occasional courier with different workflow' },
    { src: '/case-studies/glovo-note-taking/glovo-note-taking-tree-test.png',          caption: 'Tree test results — navigation structure validation' },
    { src: '/case-studies/glovo-note-taking/glovo-note-taking-report-1.png',           caption: 'Research report — key findings summary' },
  ],
  'glovo-canceled-order': [
    { src: '/case-studies/glovo-canceled-order/glovo-canceled-order-journey-map.png',      caption: 'Customer journey map — emotional arc through order cancellation' },
    { src: '/case-studies/glovo-canceled-order/glovo-canceled-order-affinity-diagram.png', caption: 'Affinity diagram — insight clustering from diary study' },
    { src: '/case-studies/glovo-canceled-order/glovo-canceled-order-app-return-feature.png', caption: 'Return feature — app flow for handling cancellation scenarios' },
    { src: '/case-studies/glovo-canceled-order/glovo-canceled-order-research-report.png',  caption: 'Research report — findings and recommendations' },
  ],
  'glovo-unhappy-path': [
    { src: '/case-studies/glovo-unhappy-path/glovo-unhappy-path-journey-map.png',         caption: 'Journey map — unhappy path emotional touchpoints' },
    { src: '/case-studies/glovo-unhappy-path/glovo-unhappy-path-affinity-diagram.png',    caption: 'Affinity diagram — synthesis of support chat audit findings' },
    { src: '/case-studies/glovo-unhappy-path/glovo-unhappy-path-insight-extraction.png',  caption: 'Insight extraction — thematic analysis of support interactions' },
    { src: '/case-studies/glovo-unhappy-path/glovo-unhappy-path-research-report.png',     caption: 'Research report — recommendations and next steps' },
  ],
  'glovo-customer-absent': [
    { src: '/case-studies/glovo-customer-absent/glovo-customer-absent-problem-visual.png',   caption: 'Problem framing — customer absence impact on courier efficiency' },
    { src: '/case-studies/glovo-customer-absent/glovo-customer-absent-affinity-diagram.png', caption: 'Affinity diagram — clustering courier pain points' },
    { src: '/case-studies/glovo-customer-absent/glovo-customer-absent-card-sorting.png',     caption: 'Card sorting — understanding courier decision logic' },
    { src: '/case-studies/glovo-customer-absent/glovo-customer-absent-knowledge-board.png',  caption: 'Knowledge board — secondary research synthesis' },
  ],
  'hp-ecommerce': [
    { src: '/case-studies/hp-ecommerce/hp-financing-eval-customer-journey.png',  caption: 'Customer journey — financing discovery touchpoints across the purchase path' },
    { src: '/case-studies/hp-ecommerce/hp-financing-eval-desk-research-1.png',   caption: 'Desk research — competitive financing UX analysis' },
    { src: '/case-studies/hp-ecommerce/hp-financing-eval-behavior-analysis.png', caption: 'Behaviour analysis — how users interact with financing information' },
    { src: '/case-studies/hp-ecommerce/hp-returns-stimuli-comparison.png',       caption: 'A/B stimulus — returns flow comparison tested with UK users' },
    { src: '/case-studies/hp-ecommerce/hp-printers-shop.png',                    caption: 'Printer shop — stimulus used in Mexico printer-choice study' },
  ],
  'hp-registration': [
    { src: '/case-studies/hp-registration/hp-registration-competitive-1.png', caption: 'Competitive analysis — registration flow benchmarking' },
    { src: '/case-studies/hp-registration/hp-registration-competitive-2.png', caption: 'Competitive analysis — friction points across competitors' },
    { src: '/case-studies/hp-registration/hp-registration-report-1.png',      caption: 'Research report — registration pain points and recommendations' },
    { src: '/case-studies/hp-registration/hp-registration-report-2.png',      caption: 'Research report — usability findings summary' },
  ],
  'hp-bundles': [
    { src: '/case-studies/hp-bundles/hp-bundles-card-sorting-1.png',      caption: 'Card sorting — how users mentally categorise bundle components' },
    { src: '/case-studies/hp-bundles/hp-bundles-card-sorting-2.png',      caption: 'Card sorting — naming and grouping preferences' },
    { src: '/case-studies/hp-bundles/hp-bundles-insight-expectations.png',caption: 'Insight — user expectations vs actual bundle structure' },
    { src: '/case-studies/hp-bundles/hp-bundles-insight-naming.png',      caption: 'Insight — bundle naming confusion patterns' },
  ],
  'hp-cross-sell': [
    { src: '/case-studies/hp-cross-sell/hp-cross-sell-analytics-flow.png',  caption: 'Analytics flow — user paths leading to cross-sell exposure' },
    { src: '/case-studies/hp-cross-sell/hp-cross-sell-knowledge-board.png', caption: 'Knowledge board — synthesised secondary research' },
    { src: '/case-studies/hp-cross-sell/hp-cross-sell-affinity-1.png',      caption: 'Affinity diagram — qualitative insight clustering' },
    { src: '/case-studies/hp-cross-sell/hp-cross-sell-insights-summary.png',caption: 'Insights summary — key findings for product team' },
    { src: '/case-studies/hp-cross-sell/hp-cross-sell-stimuli.png',         caption: 'Test stimuli — cross-sell placement variants' },
  ],
  'hp-customization': [
    { src: '/case-studies/hp-customization/hp-customization-overview.png',      caption: 'Study overview — customisation experience research scope' },
    { src: '/case-studies/hp-customization/hp-customization-heuristic-1.png',   caption: 'Heuristic analysis — usability issues in customisation flow' },
    { src: '/case-studies/hp-customization/hp-customization-methodology.png',   caption: 'Methodology — mixed-methods approach combining heuristic + usability' },
    { src: '/case-studies/hp-customization/hp-customization-insights-summary.png', caption: 'Insights — key findings on configurator friction' },
  ],
  'hp-financing-evaluation': [
    { src: '/case-studies/hp-financing-evaluation/hp-financing-eval-customer-journey.png',  caption: 'Customer journey — financing discovery across purchase funnel' },
    { src: '/case-studies/hp-financing-evaluation/hp-financing-eval-desk-research-1.png',   caption: 'Desk research — competitive financing UX landscape' },
    { src: '/case-studies/hp-financing-evaluation/hp-financing-eval-desk-research-2.png',   caption: 'Desk research — financing information architecture benchmarks' },
    { src: '/case-studies/hp-financing-evaluation/hp-financing-eval-test-plan.png',         caption: 'Test plan — moderated study design for financing evaluation' },
    { src: '/case-studies/hp-financing-evaluation/hp-financing-eval-behavior-analysis.png', caption: 'Behaviour analysis — post-study task completion patterns' },
  ],
  'hp-subscriptions': [
    { src: '/case-studies/hp-subscriptions/hp-subscriptions-empathy-map.png',    caption: 'Empathy map — subscriber attitudes and mental models' },
    { src: '/case-studies/hp-subscriptions/hp-subscriptions-affinity-diagram.png',caption: 'Affinity diagram — subscription pain point clustering' },
    { src: '/case-studies/hp-subscriptions/hp-subscriptions-insights-1.png',     caption: 'Insights — subscription model perception findings' },
    { src: '/case-studies/hp-subscriptions/hp-subscriptions-insights-2.png',     caption: 'Insights — cancellation and churn driver analysis' },
  ],
  'hp-ratings-reviews': [
    { src: '/case-studies/hp-ratings-reviews/hp-ratings-reviews-report.png',   caption: 'Research report — ratings & reviews experience findings' },
    { src: '/case-studies/hp-ratings-reviews/hp-ratings-reviews-findings.png', caption: 'Key findings — trust signals and review reading behaviour' },
  ],
  'hp-returns-uk': [
    { src: '/case-studies/hp-returns-uk/hp-returns-uk-overview.png',           caption: 'Study overview — UK returns experience scope' },
    { src: '/case-studies/hp-returns-uk/hp-returns-uk-heuristic-analysis.png', caption: 'Heuristic analysis — returns flow usability issues' },
    { src: '/case-studies/hp-returns-uk/hp-returns-uk-usertesting.png',        caption: 'Usability testing — moderated sessions with UK participants' },
    { src: '/case-studies/hp-returns-uk/hp-returns-uk-research-report.png',    caption: 'Research report — findings and recommendations' },
  ],
  'vd-automation-suite': [
    { src: '/case-studies/vd-automation-suite/automation-intake-brief-case.png',        caption: 'Client intake → brief automation — document generation pipeline' },
    { src: '/case-studies/vd-automation-suite/automation-n8n-workflow.png',             caption: 'n8n workflow — full automation architecture diagram' },
    { src: '/case-studies/vd-automation-suite/automation-proposals-case.png',           caption: 'Proposal automation — AI-generated client proposals from brief' },
    { src: '/case-studies/vd-automation-suite/automation-meeting-minutes-case.png',     caption: 'Meeting minutes — audio → structured minutes pipeline' },
    { src: '/case-studies/vd-automation-suite/automation-chatbot-case.png',             caption: 'Client chatbot — pre-qualification flow for new enquiries' },
    { src: '/case-studies/vd-automation-suite/automation-ai-concierge-case.png',        caption: 'AI concierge — automated follow-up and scheduling system' },
    { src: '/case-studies/vd-automation-suite/automation-document-generation-flow.png', caption: 'Document generation flow — data → GPT → formatted output' },
  ],
  'vd-chatbot': [
    { src: '/case-studies/vd-chatbot/automation-chatbot-case.png',           caption: 'Chatbot overview — client pre-qualification flow' },
    { src: '/case-studies/vd-chatbot/automation-chatbot-flow.png',           caption: 'Conversation flow — decision tree and handoff logic' },
    { src: '/case-studies/vd-chatbot/automation-chatbot-decision-flow.png',  caption: 'Decision flow — qualification criteria and routing logic' },
  ],
  'vd-meeting-minutes': [
    { src: '/case-studies/vd-meeting-minutes/automation-meeting-minutes-case.png', caption: 'Meeting minutes pipeline — audio recording → structured minutes in minutes' },
    { src: '/case-studies/vd-meeting-minutes/automation-workflow-diagram-1.png',   caption: 'Workflow diagram — Whisper transcription → GPT structuring → OneDrive storage' },
  ],
  'vd-internal-form': [
    { src: '/case-studies/vd-internal-form/automation-intake-brief-case.png',        caption: 'Intake automation — internal form → structured client brief' },
    { src: '/case-studies/vd-internal-form/automation-doc-gen-flow.png',             caption: 'Document generation flow — form data → GPT → formatted PDF brief' },
  ],
  'momentum-app': [
    { src: '/case-studies/momentum-app/momentum-app-home.png',             caption: 'Momentum app — home screen showing AI coaching interface' },
    { src: '/case-studies/momentum-app/momentum-app-add-goal.png',         caption: 'Add goal flow — AI-assisted goal setting and tracking' },
    { src: '/case-studies/momentum-app/momentum-competitive.png',          caption: 'Competitive analysis — AI coaching app landscape mapping' },
    { src: '/case-studies/momentum-app/momentum-customer-journey.png',     caption: 'Customer journey — emotional arc across onboarding and coaching' },
    { src: '/case-studies/momentum-app/momentum-navigation-analysis.png',  caption: 'Navigation analysis — IA issues identified in usability testing' },
    { src: '/case-studies/momentum-app/momentum-user-flow.png',            caption: 'User flow — redesigned onboarding and goal-setting architecture' },
  ],
  'soundjourney-product': [
    { src: '/case-studies/soundjourney-product/soundjourney-onboarding.png',      caption: 'Onboarding flow — Spotify connect and sonic profile generation' },
    { src: '/case-studies/soundjourney-product/soundjourney-sonic-profile.png',   caption: 'Sonic profile — how listening history maps to taste fingerprint' },
    { src: '/case-studies/soundjourney-product/soundjourney-journey-result.png',  caption: 'Journey result — three personalised venue journeys with match explanations' },
    { src: '/case-studies/soundjourney-product/soundjourney-architecture.png',    caption: 'Matching architecture — four-level hierarchy from exact artist to venue fallback' },
  ],
};

// ── Inline markdown → React nodes ──────────────────────────────────────────
function renderInline(text: string): React.ReactNode {
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`/g;
  const parts: React.ReactNode[] = [];
  let last = 0, m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1] !== undefined)
      parts.push(<strong key={m.index} className="font-semibold text-text">{m[1]}</strong>);
    else if (m[2] !== undefined)
      parts.push(<em key={m.index}>{m[2]}</em>);
    else if (m[3] !== undefined)
      parts.push(<code key={m.index} className="bg-surface px-1.5 py-0.5 rounded text-sm font-mono text-text">{m[3]}</code>);
    last = regex.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 && typeof parts[0] === 'string' ? text : <>{parts}</>;
}

// ── Block types ─────────────────────────────────────────────────────────────
type MdBlock =
  | { type: 'h1'; text: string; raw: string }
  | { type: 'h2'; text: string; raw: string }
  | { type: 'h3'; text: string; raw: string }
  | { type: 'p'; text: string; raw: string }
  | { type: 'blockquote'; lines: string[]; raw: string }
  | { type: 'table'; rows: string[][]; raw: string }
  | { type: 'ul'; items: string[]; raw: string }
  | { type: 'ol'; items: string[]; raw: string }
  | { type: 'hr'; raw: string }
  | { type: 'img'; src: string; caption: string; raw: string };

// ── Markdown → blocks ───────────────────────────────────────────────────────
function parseMd(raw: string, slug = ''): MdBlock[] {
  // Strip frontmatter
  const md = raw.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const chunks = md.split(/\n{2,}/);
  const blocks: MdBlock[] = [];

  for (const rawChunk of chunks) {
    const chunk = rawChunk.trim();
    if (!chunk) continue;

    const lines = chunk.split('\n');
    const first = lines[0];

    // HR
    if (/^-{3,}$/.test(first) && lines.length === 1) {
      blocks.push({ type: 'hr', raw: chunk });
      continue;
    }

    // H2 before H1 check (## before #)
    if (first.startsWith('## ') && !first.startsWith('### ')) {
      blocks.push({ type: 'h2', text: first.slice(3), raw: chunk });
      continue;
    }

    // H3
    if (first.startsWith('### ')) {
      blocks.push({ type: 'h3', text: first.slice(4), raw: chunk });
      continue;
    }

    // H1 (skip — title shown in header)
    if (first.startsWith('# ')) {
      continue;
    }

    // Table
    if (first.startsWith('|')) {
      const rows: string[][] = [];
      for (const line of lines) {
        if (!line.startsWith('|')) continue;
        const cells = line.split('|').slice(1, -1).map(c => c.trim());
        if (cells.every(c => /^[-: ]+$/.test(c))) continue; // separator row
        rows.push(cells);
      }
      if (rows.length > 0) blocks.push({ type: 'table', rows, raw: chunk });
      continue;
    }

    // Blockquote
    if (first.startsWith('>')) {
      const bqLines = lines
        .filter(l => l.startsWith('>'))
        .map(l => l.replace(/^> ?/, ''));
      blocks.push({ type: 'blockquote', lines: bqLines, raw: chunk });
      continue;
    }

    // Unordered list
    if (first.match(/^[-*•] /)) {
      const items = lines
        .filter(l => l.match(/^[-*•] /))
        .map(l => l.replace(/^[-*•] /, ''));
      if (items.length > 0) blocks.push({ type: 'ul', items, raw: chunk });
      continue;
    }

    // Ordered list
    if (first.match(/^\d+\. /)) {
      const items = lines
        .filter(l => l.match(/^\d+\. /))
        .map(l => l.replace(/^\d+\. /, ''));
      if (items.length > 0) blocks.push({ type: 'ol', items, raw: chunk });
      continue;
    }

    // Parse image lines: ![caption](images/file.png)
    const imgLine = lines.find(l => l.trim().startsWith('!['));
    if (imgLine) {
      const m = imgLine.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (m) {
        const [, caption, rawPath] = m;
        const src = rawPath.startsWith('images/')
          ? `/case-studies/${slug}/${rawPath.slice(7)}`
          : rawPath;
        blocks.push({ type: 'img', src, caption, raw: chunk });
      }
      // Emit any non-image, non-italic-caption text in the same chunk
      const remainingLines = lines.filter(l => {
        const t = l.trim();
        return t && !t.startsWith('![') && !/^\*[^*\n]+\*$/.test(t);
      });
      if (remainingLines.length > 0) {
        const text = remainingLines.join(' ').trim();
        if (text) blocks.push({ type: 'p', text, raw: chunk });
      }
      continue;
    }

    // Skip bare italic-only caption lines
    const filteredLines = lines.filter(l => !/^\*[^*\n]+\*$/.test(l.trim()));
    if (filteredLines.length === 0) continue;

    const text = filteredLines.join(' ').trim();
    if (text) blocks.push({ type: 'p', text, raw: chunk });
  }

  return blocks;
}

// ── Replace one block's raw text in the full markdown ───────────────────────
function replaceBlockInMd(fullMd: string, oldRaw: string, newRaw: string): string {
  const fmMatch = fullMd.match(/^---\n[\s\S]*?\n---\n?/);
  const fm = fmMatch ? fmMatch[0] : '';
  const body = fullMd.slice(fm.length);
  const updated = body.includes(oldRaw) ? body.replace(oldRaw, newRaw) : body;
  return fm + updated;
}

// ── Inline edit wrapper ──────────────────────────────────────────────────────
type InlineEditOpts = {
  isEditing: boolean;
  editingIdx: number | null;
  inlineDraft: string;
  onBlockClick: (idx: number, block: MdBlock) => void;
  onDraftChange: (v: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onImgReplace: (idx: number) => void;
};

// ── Blocks → JSX ────────────────────────────────────────────────────────────
function renderBlocks(blocks: MdBlock[], heroImages: { src: string; caption: string }[], editOpts?: InlineEditOpts): React.ReactNode {
  const elements: React.ReactNode[] = [];
  let h2Count = 0;
  let secondaryImagesInjected = false;

  const { isEditing, editingIdx, inlineDraft, onBlockClick, onDraftChange, onSave, onCancel, onImgReplace } = editOpts ?? {};

  // Wrap a block node with inline-edit hover + click behaviour
  const wrapEditable = (key: string, blockIdx: number, block: MdBlock, node: React.ReactNode) => {
    if (!isEditing) return <React.Fragment key={key}>{node}</React.Fragment>;
    if (editingIdx === blockIdx) {
      return (
        <div key={key} className="relative">
          <textarea
            autoFocus
            className="w-full border-2 border-primary rounded-card p-4 font-mono text-sm leading-relaxed resize-none outline-none min-h-[100px] bg-white"
            value={inlineDraft}
            onChange={e => onDraftChange?.(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); onSave?.(); }
              if (e.key === 'Escape') { onCancel?.(); }
            }}
            rows={Math.max(3, (inlineDraft ?? '').split('\n').length + 1)}
          />
          <div className="flex gap-2 mt-2">
            <button onClick={onSave} className="bg-primary text-white px-4 py-1.5 rounded-btn text-sm font-medium hover:bg-primary/90 transition-colors">Save</button>
            <button onClick={onCancel} className="text-grey px-4 py-1.5 text-sm hover:text-text transition-colors">Cancel</button>
          </div>
        </div>
      );
    }
    return (
      <div
        key={key}
        className="group relative cursor-text rounded-lg hover:ring-2 hover:ring-primary/25 hover:ring-offset-1 transition-all"
        onClick={() => onBlockClick?.(blockIdx, block)}
        title="Click to edit"
      >
        {node}
        <span className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 w-6 h-6 bg-primary text-white rounded-full text-[11px] flex items-center justify-center transition-opacity shadow-sm pointer-events-none select-none">✎</span>
      </div>
    );
  };

  // Wrap an image block with replace overlay
  const wrapImgEditable = (key: string, blockIdx: number, node: React.ReactNode) => {
    if (!isEditing) return <React.Fragment key={key}>{node}</React.Fragment>;
    return (
      <div key={key} className="group relative cursor-pointer" onClick={() => onImgReplace?.(blockIdx)}>
        {node}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/25 transition-all rounded-card">
          <span className="opacity-0 group-hover:opacity-100 bg-white text-text font-medium text-sm px-4 py-2 rounded-btn shadow transition-opacity">📷 Replace image</span>
        </div>
      </div>
    );
  };

  // If the markdown already contains inline images, skip the auto-gallery injection
  // so images appear exactly where the user placed them in the markdown.
  const mdHasInlineImages = blocks.some(b => b.type === 'img');

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];

    switch (b.type) {
      case 'hr':
        elements.push(<div key={`hr-${i}`} className="my-2 border-t border-gray-100" />);
        break;

      case 'h2': {
        h2Count++;
        // Only auto-inject gallery images when there are no inline images in the markdown
        if (!mdHasInlineImages && h2Count === 4 && !secondaryImagesInjected && heroImages.length > 1) {
          secondaryImagesInjected = true;
          elements.push(
            <div key="secondary-images" className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
              {heroImages.slice(1).map((img, ii) => (
                <figure key={ii}>
                  <img src={img.src} alt={img.caption} className="w-full rounded-card object-cover" />
                  {img.caption && (
                    <figcaption className="text-xs text-grey mt-2 text-center">{img.caption}</figcaption>
                  )}
                </figure>
              ))}
            </div>
          );
        }
        elements.push(wrapEditable(`h2-${i}`, i, b,
          <div className="pt-16 first:pt-0">
            <div className="text-teal text-[10px] font-bold uppercase tracking-widest mb-3">
              {String(h2Count).padStart(2, '0')}
            </div>
            <h2 className="text-3xl font-heading font-bold text-text mb-8 pb-5 border-b border-cardborder">
              {b.text}
            </h2>
          </div>
        ));
        break;
      }

      case 'h3':
        elements.push(wrapEditable(`h3-${i}`, i, b,
          <h3 className="text-lg font-heading font-bold text-text mt-10 mb-4">
            {renderInline(b.text)}
          </h3>
        ));
        break;

      case 'p':
        elements.push(wrapEditable(`p-${i}`, i, b,
          <p className="text-grey leading-relaxed">
            {renderInline(b.text)}
          </p>
        ));
        break;

      case 'blockquote':
        elements.push(wrapEditable(`bq-${i}`, i, b,
          <blockquote className="border-l-4 border-teal pl-6 py-1 my-6 bg-surface rounded-r-lg">
            {b.lines.map((line, li) => (
              line.trim() ? (
                <p key={li} className="text-grey italic leading-relaxed">
                  {renderInline(line)}
                </p>
              ) : null
            ))}
          </blockquote>
        ));
        break;

      case 'table': {
        const [headerRow, ...bodyRows] = b.rows;
        elements.push(wrapEditable(`table-${i}`, i, b,
          <div className="overflow-x-auto my-8">
            <table className="w-full text-sm border-collapse">
              {headerRow && (
                <thead>
                  <tr className="bg-surface">
                    {headerRow.map((cell, ci) => (
                      <th key={ci} className="text-left px-4 py-3 font-semibold text-text border border-cardborder whitespace-nowrap">
                        {renderInline(cell)}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {bodyRows.map((row, ri) => (
                  <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-surface/50'}>
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-4 py-3 text-grey border border-cardborder align-top">
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ));
        break;
      }

      case 'ul':
        elements.push(wrapEditable(`ul-${i}`, i, b,
          <ul className="space-y-2 my-4 ml-1">
            {b.items.map((item, ii) => (
              <li key={ii} className="flex gap-3 text-grey leading-relaxed">
                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                <span>{renderInline(item)}</span>
              </li>
            ))}
          </ul>
        ));
        break;

      case 'ol':
        elements.push(wrapEditable(`ol-${i}`, i, b,
          <ol className="space-y-3 my-4">
            {b.items.map((item, ii) => (
              <li key={ii} className="flex gap-3 text-grey leading-relaxed">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                  {ii + 1}
                </span>
                <span>{renderInline(item)}</span>
              </li>
            ))}
          </ol>
        ));
        break;

      case 'img':
        elements.push(wrapImgEditable(`img-${i}`, i,
          <figure className="my-10">
            <img
              src={b.src}
              alt={b.caption}
              className="w-full rounded-card object-cover border border-cardborder shadow-sm"
            />
            {b.caption && (
              <figcaption className="text-xs text-grey mt-2.5 text-center leading-snug">
                {b.caption}
              </figcaption>
            )}
          </figure>
        ));
        break;
    }
  }

  // Auto-inject remaining gallery images at the end — only if markdown has no inline images
  if (!mdHasInlineImages && !secondaryImagesInjected && heroImages.length > 1) {
    elements.push(
      <div key="secondary-images-end" className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
        {heroImages.slice(1).map((img, ii) => (
          <figure key={ii}>
            <img src={img.src} alt={img.caption} className="w-full rounded-card object-cover" />
            {img.caption && (
              <figcaption className="text-xs text-grey mt-2 text-center">{img.caption}</figcaption>
            )}
          </figure>
        ))}
      </div>
    );
  }

  return <div className="space-y-5">{elements}</div>;
}

// ── Image type ───────────────────────────────────────────────────────────────
type ImgEntry = { src: string; caption: string };

// ── Section-placement helpers ────────────────────────────────────────────────

/** Returns the h2 section titles in order */
function extractSections(md: string): string[] {
  return md.split('\n')
    .filter(l => /^## /.test(l))
    .map(l => l.slice(3).trim());
}

/** Parse inline images from markdown and return which section index they fall in.
 *  sectionIdx 0 = before first ##, 1 = after first ## heading, etc. */
function parsePlacements(md: string): Record<number, ImgEntry[]> {
  const result: Record<number, ImgEntry[]> = {};
  let si = 0;
  for (const line of md.split('\n')) {
    if (/^## /.test(line)) { si++; continue; }
    const m = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if (m) {
      if (!result[si]) result[si] = [];
      result[si].push({ caption: m[1], src: m[2] });
    }
  }
  return result;
}

/** Gallery images that haven't been placed in any section yet */
function getUnplaced(gallery: ImgEntry[], placements: Record<number, ImgEntry[]>): ImgEntry[] {
  const placed = new Set(Object.values(placements).flat().map(i => i.src));
  return gallery.filter(i => !placed.has(i.src));
}

/** Rebuild markdown by removing existing inline images then inserting them at their sections */
function rebuildMd(md: string, placements: Record<number, ImgEntry[]>): string {
  // Strip existing inline image lines
  const lines = md.split('\n').filter(l => !/^!\[[^\]]*\]\([^)]+\)/.test(l.trim()));
  const out: string[] = [];
  let si = 0;
  for (const line of lines) {
    if (/^## /.test(line)) {
      // Inject images that belong after the PREVIOUS section (si)
      for (const img of placements[si] ?? []) {
        out.push('', `![${img.caption}](${img.src})`, '');
      }
      si++;
    }
    out.push(line);
  }
  // Inject images for the last section
  for (const img of placements[si] ?? []) {
    out.push('', `![${img.caption}](${img.src})`, '');
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

// ── Main component ───────────────────────────────────────────────────────────
export const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = portfolioProjects.find(p => p.slug === slug);

  if (!project) return <Navigate to="/work" replace />;

  const entry = caseStudyMap[slug!];
  const fullMd = entry?.fullMd ?? '';
  const baseImages: ImgEntry[] = imageManifest[slug!] ?? [];

  const EDIT_KEY = `case-study:${slug}`;
  const IMAGES_KEY = `images:${slug}`;

  // Load persisted images (override) or fall back to hardcoded manifest
  const loadImages = (): ImgEntry[] => {
    const raw = localStorage.getItem(EDIT_PREFIX + IMAGES_KEY);
    if (raw) { try { return JSON.parse(raw); } catch { /* ignore */ } }
    return baseImages;
  };

  const [currentMd, setCurrentMd] = React.useState(() =>
    localStorage.getItem(EDIT_PREFIX + EDIT_KEY) ?? fullMd
  );
  const [editorDraft, setEditorDraft] = React.useState(currentMd);
  const [images, setImages] = React.useState<ImgEntry[]>(loadImages);
  const [editImages, setEditImages] = React.useState<ImgEntry[]>(images);
  const [activeTab, setActiveTab] = React.useState<'content' | 'images'>('content');

  // Section-based placement: maps sectionIdx → images to place after it
  const [placements, setPlacements] = React.useState<Record<number, ImgEntry[]>>(() =>
    parsePlacements(localStorage.getItem(EDIT_PREFIX + EDIT_KEY) ?? fullMd)
  );
  const [dragTarget, setDragTarget] = React.useState<number | null>(null);
  const [lightboxImg, setLightboxImg] = React.useState<ImgEntry | null>(null);
  const [uploading, setUploading] = React.useState<string | null>(null); // which field is uploading

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const cursorPosRef = React.useRef<number>(0);
  const coverUploadRef = React.useRef<HTMLInputElement>(null);
  const poolUploadRef = React.useRef<HTMLInputElement>(null);

  // Upload a file to public/case-studies/[slug]/ via the Vite dev server
  const uploadFile = async (file: File): Promise<string> => {
    const form = new FormData();
    form.append('file', file);
    const res = await fetch(`/api/upload?slug=${slug}`, { method: 'POST', body: form });
    const json = await res.json();
    if (json.error) throw new Error(json.error);
    return json.url as string;
  };

  // ── Inline editing state ──────────────────────────────────────────────────
  const [inlineEdit, setInlineEdit] = React.useState<{ blockIdx: number; draft: string; oldRaw: string } | null>(null);
  const [heroImgReplace, setHeroImgReplace] = React.useState(false);
  const [inlineImgBlockIdx, setInlineImgBlockIdx] = React.useState<number | null>(null);
  const inlineImgInputRef = React.useRef<HTMLInputElement>(null);
  const heroImgInputRef = React.useRef<HTMLInputElement>(null);

  const handleInlineSave = () => {
    if (!inlineEdit) return;
    const newMd = replaceBlockInMd(currentMd, inlineEdit.oldRaw, inlineEdit.draft);
    localStorage.setItem(EDIT_PREFIX + EDIT_KEY, newMd);
    setCurrentMd(newMd);
    setEditorDraft(newMd);
    setInlineEdit(null);
  };

  const handleInlineImgUpload = async (file: File, blockIdx: number | null) => {
    setUploading('inline-img');
    try {
      const url = await uploadFile(file);
      if (blockIdx === null) {
        // Hero image replace
        const updated = [...images];
        updated[0] = { ...updated[0], src: url };
        setImages(updated);
        setEditImages(updated);
        localStorage.setItem(EDIT_PREFIX + IMAGES_KEY, JSON.stringify(updated));
        localStorage.setItem(EDIT_PREFIX + `cover:${slug}`, url);
      } else {
        // Inline markdown image block replace — update the raw markdown
        const b = parseMd(currentMd, slug!)[blockIdx];
        if (b?.type === 'img') {
          const newRaw = `![${b.caption}](${url})`;
          const newMd = replaceBlockInMd(currentMd, b.raw, newRaw);
          localStorage.setItem(EDIT_PREFIX + EDIT_KEY, newMd);
          setCurrentMd(newMd);
          setEditorDraft(newMd);
        }
      }
    } catch (err: any) { alert('Upload failed: ' + err.message); }
    setUploading(null);
    setInlineImgBlockIdx(null);
    setHeroImgReplace(false);
  };

  // Trigger hero image file picker
  React.useEffect(() => {
    if (heroImgReplace) {
      heroImgInputRef.current?.click();
      setHeroImgReplace(false);
    }
  }, [heroImgReplace]);

  const { isEditing } = useEditMode();
  React.useEffect(() => {
    if (isEditing) {
      const stored = localStorage.getItem(EDIT_PREFIX + EDIT_KEY) ?? fullMd;
      setEditorDraft(stored);
      setCurrentMd(stored);
      setEditImages(loadImages());
      setPlacements(parsePlacements(stored));
    }
  }, [isEditing]);

  // ── Drag handlers for section-based image placement ──────────────────────
  const handleImgDragStart = (e: React.DragEvent, img: ImgEntry, fromSection: number | null) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', JSON.stringify({ ...img, fromSection }));
  };
  const handleSectionDragOver = (e: React.DragEvent, si: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragTarget(si);
  };
  const handleSectionDrop = (e: React.DragEvent, toSi: number) => {
    e.preventDefault();
    try {
      const { src, caption, fromSection } = JSON.parse(e.dataTransfer.getData('text/plain'));
      setPlacements(prev => {
        const next = { ...prev };
        if (fromSection !== null) {
          next[fromSection] = (next[fromSection] ?? []).filter(i => i.src !== src);
        }
        next[toSi] = [...(next[toSi] ?? []), { src, caption }];
        return next;
      });
    } catch { /* ignore bad data */ }
    setDragTarget(null);
  };
  const removeFromSection = (si: number, src: string) => {
    setPlacements(prev => ({ ...prev, [si]: (prev[si] ?? []).filter(i => i.src !== src) }));
  };

  // Save images + apply placements into the markdown
  const handleApplyImages = () => {
    const filtered = editImages.filter(img => img.src.trim());
    const newMd = rebuildMd(editorDraft, placements);
    localStorage.setItem(EDIT_PREFIX + IMAGES_KEY, JSON.stringify(filtered));
    if (filtered[0]) localStorage.setItem(EDIT_PREFIX + `cover:${slug}`, filtered[0].src);
    else localStorage.removeItem(EDIT_PREFIX + `cover:${slug}`);
    localStorage.setItem(EDIT_PREFIX + EDIT_KEY, newMd);
    setImages(filtered);
    setEditorDraft(newMd);
    setCurrentMd(newMd);
  };

  const blocks = parseMd(currentMd, slug!);

  // Extract the first blockquote as a pull-quote (often used in these markdowns)
  const firstBq = blocks.find(b => b.type === 'blockquote') as { type: 'blockquote'; lines: string[] } | undefined;
  const pullQuote = firstBq?.lines.join(' ').trim();

  const hasContent = blocks.some(b => b.type !== 'hr' && b.type !== 'h1');

  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-3 text-sm mb-10">
          <Link to="/work" className="text-grey hover:text-text transition-colors">Work</Link>
          <span className="text-grey">/</span>
          <span className="text-text font-medium">{project.company}</span>
          <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider py-1 px-2 rounded ml-1">
            {Array.isArray(project.discipline) ? (project.discipline as string[]).join(', ') : project.discipline}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-text tracking-tight mb-4 max-w-3xl leading-tight">
          {project.title}
        </h1>

        {/* Pull quote from first blockquote in markdown */}
        {pullQuote && (
          <p className="text-xl text-grey max-w-2xl leading-relaxed mb-12 font-light">
            {renderInline(pullQuote.replace(/^[""]/, '').replace(/[""]$/, ''))}
          </p>
        )}

        {/* Hero image */}
        {images.length > 0 ? (
          <div className={`group w-full mb-20 relative ${isEditing ? 'cursor-pointer' : ''}`}
            onClick={() => isEditing && setHeroImgReplace(true)}
          >
            <img
              src={images[0].src}
              alt={images[0].caption}
              className="w-full rounded-2xl object-cover max-h-[480px]"
            />
            {images[0].caption && (
              <p className="text-xs text-grey mt-3 text-center">{images[0].caption}</p>
            )}
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/25 transition-all rounded-2xl">
                <span className="opacity-0 group-hover:opacity-100 bg-white text-text font-medium text-sm px-4 py-2 rounded-btn shadow transition-opacity">📷 Replace cover image</span>
              </div>
            )}
          </div>
        ) : (
          <div
            className={`group w-full aspect-[21/9] rounded-2xl mb-20 flex items-center justify-center relative ${project.bg || 'bg-surface'} ${isEditing ? 'cursor-pointer' : ''}`}
            onClick={() => isEditing && setHeroImgReplace(true)}
          >
            <div className="w-24 h-24 rounded-full bg-white/30 flex items-center justify-center">
              <span className="text-5xl font-bold text-white/70">{project.company[0]}</span>
            </div>
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all rounded-2xl">
                <span className="opacity-0 group-hover:opacity-100 bg-white text-text font-medium text-sm px-4 py-2 rounded-btn shadow transition-opacity">📷 Add cover image</span>
              </div>
            )}
          </div>
        )}

        {/* Hidden file inputs for inline image replacement */}
        <input
          ref={heroImgInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) handleInlineImgUpload(file, null);
            e.target.value = '';
          }}
        />
        <input
          ref={inlineImgInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) handleInlineImgUpload(file, inlineImgBlockIdx);
            e.target.value = '';
          }}
        />

        {/* Trigger hero img file picker (via effect) */}

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left: full markdown content */}
          <div className="lg:col-span-8">
            {hasContent ? (
              renderBlocks(blocks, images, {
                isEditing,
                editingIdx: inlineEdit?.blockIdx ?? null,
                inlineDraft: inlineEdit?.draft ?? '',
                onBlockClick: (idx, block) => setInlineEdit({ blockIdx: idx, draft: block.raw, oldRaw: block.raw }),
                onDraftChange: v => setInlineEdit(prev => prev ? { ...prev, draft: v } : null),
                onSave: handleInlineSave,
                onCancel: () => setInlineEdit(null),
                onImgReplace: idx => {
                  setInlineImgBlockIdx(idx);
                  setTimeout(() => inlineImgInputRef.current?.click(), 0);
                },
              })
            ) : (
              <div className="space-y-6">
                <div className="pt-16">
                  <div className="text-teal text-[10px] font-bold uppercase tracking-widest mb-3">01</div>
                  <h2 className="text-3xl font-heading font-bold text-text mb-8 pb-5 border-b border-cardborder">
                    The context.
                  </h2>
                </div>
                <p className="text-grey leading-relaxed">{project.description || project.situation || 'Case study content coming soon.'}</p>
              </div>
            )}
          </div>

          {/* Right: metadata sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-cardborder shadow-sm rounded-card p-8 sticky top-32">
              <div className="space-y-7">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-grey mb-1.5">Client</div>
                  <div className="font-semibold text-text">{project.company}</div>
                </div>
                <div className="h-px bg-cardborder" />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-grey mb-1.5">Discipline</div>
                  <div className="font-medium text-text text-sm">
                    {Array.isArray(project.discipline) ? (project.discipline as string[]).join(', ') : project.discipline}
                  </div>
                </div>
                <div className="h-px bg-cardborder" />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-grey mb-1.5">Year</div>
                  <div className="font-medium text-text text-sm">{project.year}</div>
                </div>
                {project.market && (
                  <>
                    <div className="h-px bg-cardborder" />
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-grey mb-1.5">Market</div>
                      <div className="font-medium text-text text-sm">{project.market}</div>
                    </div>
                  </>
                )}
                {project.methods && project.methods.length > 0 && (
                  <>
                    <div className="h-px bg-cardborder" />
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-grey mb-2.5">Methods</div>
                      <div className="flex flex-wrap gap-1.5">
                        {(project.methods as string[]).map((m: string, i: number) => (
                          <span key={i} className="bg-surface text-grey text-xs font-medium py-1 px-2.5 rounded-full">{m}</span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                {project.stack && project.stack.length > 0 && (
                  <>
                    <div className="h-px bg-cardborder" />
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-grey mb-2.5">Tools</div>
                      <div className="flex flex-wrap gap-1.5">
                        {(project.stack as string[]).map((t: string, i: number) => (
                          <span key={i} className="bg-surface text-grey text-xs font-medium py-1 px-2.5 rounded-full">{t}</span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                <div className="h-px bg-cardborder" />
                <a
                  href="mailto:jeremyguillaumedossantos@gmail.com"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-4 rounded-btn transition-colors text-sm text-center block"
                >
                  Book a similar project &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-primary py-28 mt-24">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-10">
            Interested in similar work?
          </h2>
          <a
            href="mailto:jeremyguillaumedossantos@gmail.com"
            className="inline-block bg-white text-primary hover:bg-surface font-bold py-4 px-8 rounded-btn transition-colors"
          >
            Book a Discovery Call
          </a>
        </div>
      </div>

      {/* Editor panel — only in edit mode */}
      {isEditing && (
        <div className="fixed right-0 top-0 bottom-0 w-[520px] bg-white border-l border-gray-200 shadow-2xl z-[150] flex flex-col">
          {/* Panel header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50 shrink-0">
            <div className="font-semibold text-gray-900 text-sm">Edit Case Study</div>
            <button
              onClick={() => {
                localStorage.removeItem(EDIT_PREFIX + EDIT_KEY);
                localStorage.removeItem(EDIT_PREFIX + IMAGES_KEY);
                setCurrentMd(fullMd);
                setEditorDraft(fullMd);
                setImages(baseImages);
                setEditImages(baseImages);
              }}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors"
            >
              ↺ Reset all to original
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-100 shrink-0">
            {(['content', 'images'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                    : 'text-gray-400 hover:text-gray-600 bg-gray-50'
                }`}
              >
                {tab === 'content' ? 'Markdown' : 'Images'}
              </button>
            ))}
          </div>

          {/* Content tab */}
          {activeTab === 'content' && (
            <>
              <textarea
                ref={textareaRef}
                className="flex-1 p-4 font-mono text-xs leading-relaxed resize-none outline-none text-gray-800 bg-white"
                value={editorDraft}
                onChange={e => setEditorDraft(e.target.value)}
                onSelect={e => { cursorPosRef.current = (e.target as HTMLTextAreaElement).selectionStart; }}
                onBlur={e => { cursorPosRef.current = e.target.selectionStart; }}
                spellCheck={false}
              />
              <div className="px-5 py-4 border-t border-gray-100 bg-gray-50 flex gap-3 shrink-0">
                <button
                  onClick={() => {
                    localStorage.setItem(EDIT_PREFIX + EDIT_KEY, editorDraft);
                    setCurrentMd(editorDraft);
                  }}
                  className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  Save &amp; Apply
                </button>
              </div>
            </>
          )}

          {/* Lightbox */}
          {lightboxImg && (
            <div
              className="fixed inset-0 z-[500] bg-black/90 flex flex-col items-center justify-center p-6 cursor-zoom-out"
              onClick={() => setLightboxImg(null)}
            >
              <img src={lightboxImg.src} alt={lightboxImg.caption}
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl" />
              {lightboxImg.caption && (
                <p className="text-white/60 text-sm mt-4 text-center max-w-xl">{lightboxImg.caption}</p>
              )}
              <p className="text-white/30 text-xs mt-2">Click anywhere to close</p>
            </div>
          )}

          {/* Images tab */}
          {activeTab === 'images' && (
            <div className="flex-1 overflow-y-auto flex flex-col">
              <div className="flex-1 p-4 space-y-4 overflow-y-auto">

                {/* ── Cover / hero image ── */}
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Cover Image <span className="font-normal normal-case tracking-normal">(hero + /work thumbnail)</span>
                  </div>
                  {editImages[0]?.src && (
                    <div className="relative group mb-2 cursor-zoom-in" onClick={() => editImages[0] && setLightboxImg(editImages[0])}>
                      <img src={editImages[0].src} alt="cover"
                        className="w-full h-28 object-cover rounded-lg border border-gray-100" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-lg transition-all flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 text-xs font-medium bg-black/50 px-2 py-1 rounded">🔍 Expand</span>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-1.5 mb-1.5">
                    <input type="text" value={editImages[0]?.src ?? ''}
                      onChange={e => { const u=[...editImages]; u[0]={...(u[0]??{caption:''}), src:e.target.value}; setEditImages(u); }}
                      placeholder="/case-studies/slug/cover.png"
                      className="flex-1 px-3 py-1.5 text-xs border border-gray-200 rounded-lg outline-none focus:border-blue-400 font-mono" />
                    <button
                      onClick={() => coverUploadRef.current?.click()}
                      disabled={uploading === 'cover'}
                      className="shrink-0 px-2.5 py-1.5 text-xs bg-gray-100 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 rounded-lg transition-colors disabled:opacity-50"
                      title="Upload image file"
                    >
                      {uploading === 'cover' ? '⏳' : '📤 Upload'}
                    </button>
                    <input ref={coverUploadRef} type="file" accept="image/*" className="hidden"
                      onChange={async e => {
                        const file = e.target.files?.[0]; if (!file) return;
                        setUploading('cover');
                        try {
                          const url = await uploadFile(file);
                          const u=[...editImages]; u[0]={...(u[0]??{caption:''}), src:url}; setEditImages(u);
                        } catch(err: any) { alert('Upload failed: ' + err.message); }
                        setUploading(null); e.target.value='';
                      }} />
                  </div>
                  <input type="text" value={editImages[0]?.caption ?? ''}
                    onChange={e => { const u=[...editImages]; u[0]={...(u[0]??{src:''}), caption:e.target.value}; setEditImages(u); }}
                    placeholder="Caption"
                    className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg outline-none focus:border-blue-400" />
                </div>

                <div className="h-px bg-gray-100" />

                {/* ── Section placement ── */}
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Image Placement</div>
                  <p className="text-[10px] text-gray-400 mb-3 leading-relaxed">
                    Drag images from the <strong>pool</strong> below into any content section. Images appear immediately after that section when saved.
                  </p>

                  {/* Section drop zones */}
                  {(['↑ Top (before first section)', ...extractSections(editorDraft), '↓ End of content']).map((title, si) => {
                    const sectionImgs = placements[si] ?? [];
                    const isOver = dragTarget === si;
                    return (
                      <div key={si} className="mb-2"
                        onDragOver={e => handleSectionDragOver(e, si)}
                        onDragLeave={() => setDragTarget(null)}
                        onDrop={e => handleSectionDrop(e, si)}
                      >
                        {/* Section label */}
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-t-lg border-l-2 ${
                          si === 0 ? 'border-gray-200 bg-gray-50' :
                          si === extractSections(editorDraft).length + 1 ? 'border-gray-200 bg-gray-50' :
                          'border-teal-400 bg-teal-50'
                        }`}>
                          {si > 0 && si <= extractSections(editorDraft).length && (
                            <span className="text-teal-500 text-[9px] font-bold">{String(si).padStart(2,'0')}</span>
                          )}
                          <span className="text-[10px] font-semibold text-gray-600 truncate">{title}</span>
                        </div>

                        {/* Drop zone */}
                        <div className={`border border-t-0 rounded-b-lg px-3 py-2 min-h-[52px] flex flex-wrap gap-2 items-center transition-all ${
                          isOver ? 'bg-blue-50 border-blue-400' : 'bg-white border-gray-100'
                        }`}>
                          {sectionImgs.map(img => (
                            <div key={img.src} className="relative group shrink-0"
                              draggable
                              onDragStart={e => handleImgDragStart(e, img, si)}
                            >
                              <img src={img.src} alt={img.caption}
                                className="h-14 w-20 object-cover rounded-lg border border-gray-200 cursor-grab"
                                onError={e => { (e.target as HTMLImageElement).style.opacity='0.3'; }} />
                              <button onClick={() => removeFromSection(si, img.src)}
                                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[8px] hidden group-hover:flex items-center justify-center leading-none"
                              >✕</button>
                              {img.caption && (
                                <div className="text-[8px] text-gray-400 text-center mt-0.5 w-20 truncate">{img.caption}</div>
                              )}
                            </div>
                          ))}
                          {sectionImgs.length === 0 && (
                            <span className="text-[10px] text-gray-300 italic">Drop images here</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="h-px bg-gray-100" />

                {/* ── Image pool ── */}
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                    Image Pool
                  </div>
                  <p className="text-[10px] text-gray-400 mb-2">Click to expand · drag into a section · hover to remove</p>

                  {/* All gallery images as cards */}
                  <div className="space-y-2">
                    {editImages.slice(1).map((img, i) => {
                      const isUnplaced = getUnplaced(editImages.slice(1), placements).some(u => u.src === img.src);
                      const uploadKey = `pool-${i}`;
                      return (
                        <div key={i} className={`border rounded-xl overflow-hidden transition-all ${isUnplaced ? 'border-gray-200' : 'border-teal-200 bg-teal-50/30'}`}>
                          {/* Thumbnail row */}
                          <div className="flex items-start gap-2 p-2">
                            {/* Clickable thumbnail */}
                            <div
                              className="shrink-0 relative group cursor-zoom-in"
                              draggable={isUnplaced}
                              onDragStart={e => isUnplaced && handleImgDragStart(e, img, null)}
                              onClick={() => img.src && setLightboxImg(img)}
                            >
                              {img.src ? (
                                <>
                                  <img src={img.src} alt={img.caption}
                                    className="h-16 w-24 object-cover rounded-lg border border-gray-100"
                                    onError={e => { (e.target as HTMLImageElement).style.opacity='0.4'; }} />
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 rounded-lg transition-all flex items-center justify-center">
                                    <span className="text-white text-base opacity-0 group-hover:opacity-100">🔍</span>
                                  </div>
                                </>
                              ) : (
                                <div className="h-16 w-24 rounded-lg bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-300 text-xs">No img</div>
                              )}
                              {!isUnplaced && (
                                <div className="absolute -top-1 -left-1 bg-teal-500 text-white text-[8px] px-1 rounded font-bold">placed</div>
                              )}
                            </div>

                            {/* URL + caption + actions */}
                            <div className="flex-1 min-w-0">
                              <div className="flex gap-1 mb-1">
                                <input type="text" value={img.src}
                                  onChange={e => { const u=[...editImages]; u[i+1]={...u[i+1], src:e.target.value}; setEditImages(u); }}
                                  placeholder="/case-studies/slug/image.png"
                                  className="flex-1 min-w-0 px-2 py-1 text-[10px] border border-gray-200 rounded font-mono outline-none focus:border-blue-400" />
                                <button
                                  onClick={() => {
                                    const inp = document.getElementById(`pool-upload-${i}`) as HTMLInputElement;
                                    inp?.click();
                                  }}
                                  disabled={uploading === uploadKey}
                                  className="shrink-0 px-1.5 text-[10px] bg-gray-100 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 rounded transition-colors disabled:opacity-50"
                                  title="Upload image"
                                >
                                  {uploading === uploadKey ? '⏳' : '📤'}
                                </button>
                                <input id={`pool-upload-${i}`} type="file" accept="image/*" className="hidden"
                                  onChange={async e => {
                                    const file = e.target.files?.[0]; if (!file) return;
                                    setUploading(uploadKey);
                                    try {
                                      const url = await uploadFile(file);
                                      const u=[...editImages]; u[i+1]={...u[i+1], src:url}; setEditImages(u);
                                    } catch(err: any) { alert('Upload failed: ' + err.message); }
                                    setUploading(null); e.target.value='';
                                  }} />
                              </div>
                              <input type="text" value={img.caption}
                                onChange={e => { const u=[...editImages]; u[i+1]={...u[i+1], caption:e.target.value}; setEditImages(u); }}
                                placeholder="Caption"
                                className="w-full px-2 py-1 text-[10px] border border-gray-200 rounded outline-none focus:border-blue-400" />
                            </div>

                            {/* Remove */}
                            <button onClick={() => {
                                // Also remove from placements
                                const src = img.src;
                                setPlacements(prev => {
                                  const next = {...prev};
                                  for (const k in next) next[k] = next[k].filter(p => p.src !== src);
                                  return next;
                                });
                                setEditImages(prev => prev.filter((_,j) => j !== i+1));
                              }}
                              className="shrink-0 text-gray-300 hover:text-red-500 transition-colors text-xs self-start pt-1"
                              title="Remove image"
                            >✕</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Add new image to pool */}
                  <div className="mt-2 flex gap-1.5">
                    <button onClick={() => setEditImages(prev => [...prev, { src: '', caption: '' }])}
                      className="flex-1 border-2 border-dashed border-gray-200 hover:border-blue-400 text-gray-400 hover:text-blue-500 text-xs py-2.5 rounded-xl transition-colors font-medium">
                      + Add image URL
                    </button>
                    <button
                      onClick={() => poolUploadRef.current?.click()}
                      disabled={uploading === 'new'}
                      className="flex-1 border-2 border-dashed border-blue-200 hover:border-blue-400 text-blue-400 hover:text-blue-600 text-xs py-2.5 rounded-xl transition-colors font-medium disabled:opacity-50"
                    >
                      {uploading === 'new' ? '⏳ Uploading…' : '📤 Upload new image'}
                    </button>
                    <input ref={poolUploadRef} type="file" accept="image/*" className="hidden"
                      onChange={async e => {
                        const file = e.target.files?.[0]; if (!file) return;
                        setUploading('new');
                        try {
                          const url = await uploadFile(file);
                          setEditImages(prev => [...prev, { src: url, caption: file.name.replace(/\.[^.]+$/, '').replace(/-/g, ' ') }]);
                        } catch(err: any) { alert('Upload failed: ' + err.message); }
                        setUploading(null); e.target.value='';
                      }} />
                  </div>
                </div>
              </div>

              {/* Save */}
              <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 shrink-0">
                <button onClick={handleApplyImages}
                  className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                  Save Images &amp; Apply to Content
                </button>
                <p className="text-[10px] text-gray-400 text-center mt-1.5">Writes images into the markdown at their placed positions</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
