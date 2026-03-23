import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { portfolioProjects } from '../data/portfolioData';
import { caseStudyMap } from '../data/caseStudyContent';

// ── Images served from /public/case-studies/[slug]/ ────────────────────────
const imageManifest: Record<string, { src: string; caption: string }[]> = {
  'glovo-courier-support': [
    { src: '/case-studies/glovo-courier-support/glovo-ia-redesign.png',   caption: 'IA redesign — recommended contact tree structure based on courier mental models' },
    { src: '/case-studies/glovo-courier-support/glovo-card-sorting.png',  caption: 'Card sorting session — couriers grouping support categories by their own logic' },
    { src: '/case-studies/glovo-courier-support/glovo-tree-test.png',     caption: 'Tree test results — findability scores before and after redesign' },
  ],
  'hp-ecommerce': [
    { src: '/case-studies/hp-ecommerce/hp-returns-stimuli-comparison.png', caption: 'Returns flow — A/B stimulus comparison used in unmoderated testing' },
    { src: '/case-studies/hp-ecommerce/hp-returns-stimuli-defective.png',  caption: 'Defective product return flow — desktop stimulus, UK study' },
    { src: '/case-studies/hp-ecommerce/hp-printers-shop.png',              caption: 'Printer shop page — stimulus used in Mexico printer-choice study' },
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
      parts.push(<strong key={m.index} className="font-semibold text-gray-900">{m[1]}</strong>);
    else if (m[2] !== undefined)
      parts.push(<em key={m.index}>{m[2]}</em>);
    else if (m[3] !== undefined)
      parts.push(<code key={m.index} className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800">{m[3]}</code>);
    last = regex.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 && typeof parts[0] === 'string' ? text : <>{parts}</>;
}

// ── Block types ─────────────────────────────────────────────────────────────
type MdBlock =
  | { type: 'h1'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'blockquote'; lines: string[] }
  | { type: 'table'; rows: string[][] }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'hr' };

// ── Markdown → blocks ───────────────────────────────────────────────────────
function parseMd(raw: string): MdBlock[] {
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
      blocks.push({ type: 'hr' });
      continue;
    }

    // H2 before H1 check (## before #)
    if (first.startsWith('## ') && !first.startsWith('### ')) {
      blocks.push({ type: 'h2', text: first.slice(3) });
      continue;
    }

    // H3
    if (first.startsWith('### ')) {
      blocks.push({ type: 'h3', text: first.slice(4) });
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
      if (rows.length > 0) blocks.push({ type: 'table', rows });
      continue;
    }

    // Blockquote
    if (first.startsWith('>')) {
      const bqLines = lines
        .filter(l => l.startsWith('>'))
        .map(l => l.replace(/^> ?/, ''));
      blocks.push({ type: 'blockquote', lines: bqLines });
      continue;
    }

    // Unordered list
    if (first.match(/^[-*•] /)) {
      const items = lines
        .filter(l => l.match(/^[-*•] /))
        .map(l => l.replace(/^[-*•] /, ''));
      if (items.length > 0) blocks.push({ type: 'ul', items });
      continue;
    }

    // Ordered list
    if (first.match(/^\d+\. /)) {
      const items = lines
        .filter(l => l.match(/^\d+\. /))
        .map(l => l.replace(/^\d+\. /, ''));
      if (items.length > 0) blocks.push({ type: 'ol', items });
      continue;
    }

    // Skip image lines and bare italic-only caption lines
    const filteredLines = lines.filter(
      l => !l.startsWith('![') && !/^\*[^*\n]+\*$/.test(l.trim())
    );
    if (filteredLines.length === 0) continue;

    const text = filteredLines.join(' ').trim();
    if (text) blocks.push({ type: 'p', text });
  }

  return blocks;
}

// ── Blocks → JSX ────────────────────────────────────────────────────────────
function renderBlocks(blocks: MdBlock[], heroImages: { src: string; caption: string }[]): React.ReactNode {
  const elements: React.ReactNode[] = [];
  let h2Count = 0;
  // Track where to inject secondary images (after 2nd h2)
  let secondaryImagesInjected = false;

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];

    switch (b.type) {
      case 'hr':
        // Visual divider between major sections
        elements.push(<div key={`hr-${i}`} className="my-2 border-t border-gray-100" />);
        break;

      case 'h2': {
        h2Count++;
        // Inject secondary images after Key Findings / What I Built section
        if (h2Count === 4 && !secondaryImagesInjected && heroImages.length > 1) {
          secondaryImagesInjected = true;
          elements.push(
            <div key="secondary-images" className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
              {heroImages.slice(1).map((img, ii) => (
                <figure key={ii}>
                  <img src={img.src} alt={img.caption} className="w-full rounded-xl object-cover" />
                  {img.caption && (
                    <figcaption className="text-xs text-gray-400 mt-2 text-center">{img.caption}</figcaption>
                  )}
                </figure>
              ))}
            </div>
          );
        }
        elements.push(
          <div key={`h2-${i}`} className="pt-16 first:pt-0">
            <div className="text-teal-500 text-[10px] font-bold uppercase tracking-widest mb-3">
              {String(h2Count).padStart(2, '0')}
            </div>
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8 pb-5 border-b border-gray-100">
              {b.text}
            </h2>
          </div>
        );
        break;
      }

      case 'h3':
        elements.push(
          <h3 key={`h3-${i}`} className="text-lg font-heading font-bold text-gray-900 mt-10 mb-4">
            {renderInline(b.text)}
          </h3>
        );
        break;

      case 'p':
        elements.push(
          <p key={`p-${i}`} className="text-gray-600 leading-relaxed">
            {renderInline(b.text)}
          </p>
        );
        break;

      case 'blockquote':
        elements.push(
          <blockquote key={`bq-${i}`} className="border-l-4 border-teal-400 pl-6 py-1 my-6 bg-gray-50 rounded-r-lg">
            {b.lines.map((line, li) => (
              line.trim() ? (
                <p key={li} className="text-gray-700 italic leading-relaxed">
                  {renderInline(line)}
                </p>
              ) : null
            ))}
          </blockquote>
        );
        break;

      case 'table': {
        const [headerRow, ...bodyRows] = b.rows;
        elements.push(
          <div key={`table-${i}`} className="overflow-x-auto my-8">
            <table className="w-full text-sm border-collapse">
              {headerRow && (
                <thead>
                  <tr className="bg-gray-50">
                    {headerRow.map((cell, ci) => (
                      <th key={ci} className="text-left px-4 py-3 font-semibold text-gray-900 border border-gray-200 whitespace-nowrap">
                        {renderInline(cell)}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {bodyRows.map((row, ri) => (
                  <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-4 py-3 text-gray-600 border border-gray-200 align-top">
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        break;
      }

      case 'ul':
        elements.push(
          <ul key={`ul-${i}`} className="space-y-2 my-4 ml-1">
            {b.items.map((item, ii) => (
              <li key={ii} className="flex gap-3 text-gray-600 leading-relaxed">
                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                <span>{renderInline(item)}</span>
              </li>
            ))}
          </ul>
        );
        break;

      case 'ol':
        elements.push(
          <ol key={`ol-${i}`} className="space-y-3 my-4">
            {b.items.map((item, ii) => (
              <li key={ii} className="flex gap-3 text-gray-600 leading-relaxed">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center mt-0.5">
                  {ii + 1}
                </span>
                <span>{renderInline(item)}</span>
              </li>
            ))}
          </ol>
        );
        break;
    }
  }

  // Inject any remaining secondary images at the end if not done yet
  if (!secondaryImagesInjected && heroImages.length > 1) {
    elements.push(
      <div key="secondary-images-end" className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
        {heroImages.slice(1).map((img, ii) => (
          <figure key={ii}>
            <img src={img.src} alt={img.caption} className="w-full rounded-xl object-cover" />
            {img.caption && (
              <figcaption className="text-xs text-gray-400 mt-2 text-center">{img.caption}</figcaption>
            )}
          </figure>
        ))}
      </div>
    );
  }

  return <div className="space-y-5">{elements}</div>;
}

// ── Main component ───────────────────────────────────────────────────────────
export const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = portfolioProjects.find(p => p.slug === slug);

  if (!project) return <Navigate to="/work" replace />;

  const entry = caseStudyMap[slug!];
  const fullMd = entry?.fullMd ?? '';
  const images = imageManifest[slug!] ?? [];
  const blocks = parseMd(fullMd);

  // Extract the first blockquote as a pull-quote (often used in these markdowns)
  const firstBq = blocks.find(b => b.type === 'blockquote') as { type: 'blockquote'; lines: string[] } | undefined;
  const pullQuote = firstBq?.lines.join(' ').trim();

  const hasContent = blocks.some(b => b.type !== 'hr' && b.type !== 'h1');

  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-3 text-sm mb-10">
          <Link to="/work" className="text-gray-400 hover:text-gray-900 transition-colors">Work</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">{project.company}</span>
          <span className="bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider py-1 px-2 rounded ml-1">
            {Array.isArray(project.discipline) ? (project.discipline as string[]).join(', ') : project.discipline}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 tracking-tight mb-4 max-w-3xl leading-tight">
          {project.title}
        </h1>

        {/* Pull quote from first blockquote in markdown */}
        {pullQuote && (
          <p className="text-xl text-gray-500 max-w-2xl leading-relaxed mb-12 font-light">
            {pullQuote.replace(/^\*/, '').replace(/\*$/, '').replace(/^"/, '').replace(/"$/, '')}
          </p>
        )}

        {/* Hero image */}
        {images.length > 0 ? (
          <div className="w-full mb-20">
            <img
              src={images[0].src}
              alt={images[0].caption}
              className="w-full rounded-2xl object-cover max-h-[480px]"
            />
            {images[0].caption && (
              <p className="text-xs text-gray-400 mt-3 text-center">{images[0].caption}</p>
            )}
          </div>
        ) : (
          <div className={`w-full aspect-[21/9] rounded-2xl mb-20 flex items-center justify-center ${project.bg || 'bg-gray-100'}`}>
            <div className="w-24 h-24 rounded-full bg-white/30 flex items-center justify-center">
              <span className="text-5xl font-bold text-white/70">{project.company[0]}</span>
            </div>
          </div>
        )}

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left: full markdown content */}
          <div className="lg:col-span-8">
            {hasContent ? (
              renderBlocks(blocks, images)
            ) : (
              <div className="space-y-6">
                <div className="pt-16">
                  <div className="text-teal-500 text-[10px] font-bold uppercase tracking-widest mb-3">01</div>
                  <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8 pb-5 border-b border-gray-100">
                    The context.
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed">{project.description || project.situation || 'Case study content coming soon.'}</p>
              </div>
            )}
          </div>

          {/* Right: metadata sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8 sticky top-32">
              <div className="space-y-7">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Client</div>
                  <div className="font-semibold text-gray-900">{project.company}</div>
                </div>
                <div className="h-px bg-gray-100" />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Discipline</div>
                  <div className="font-medium text-gray-700 text-sm">
                    {Array.isArray(project.discipline) ? (project.discipline as string[]).join(', ') : project.discipline}
                  </div>
                </div>
                <div className="h-px bg-gray-100" />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Year</div>
                  <div className="font-medium text-gray-700 text-sm">{project.year}</div>
                </div>
                {project.market && (
                  <>
                    <div className="h-px bg-gray-100" />
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Market</div>
                      <div className="font-medium text-gray-700 text-sm">{project.market}</div>
                    </div>
                  </>
                )}
                {project.methods && project.methods.length > 0 && (
                  <>
                    <div className="h-px bg-gray-100" />
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2.5">Methods</div>
                      <div className="flex flex-wrap gap-1.5">
                        {(project.methods as string[]).map((m: string, i: number) => (
                          <span key={i} className="bg-gray-100 text-gray-600 text-xs font-medium py-1 px-2.5 rounded-full">{m}</span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                {project.stack && project.stack.length > 0 && (
                  <>
                    <div className="h-px bg-gray-100" />
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2.5">Tools</div>
                      <div className="flex flex-wrap gap-1.5">
                        {(project.stack as string[]).map((t: string, i: number) => (
                          <span key={i} className="bg-gray-100 text-gray-600 text-xs font-medium py-1 px-2.5 rounded-full">{t}</span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                <div className="h-px bg-gray-100" />
                <a
                  href="mailto:jeremyguillaumedossantos@gmail.com"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-lg transition-colors text-sm text-center block"
                >
                  Book a similar project &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-blue-600 py-28 mt-24">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-10">
            Interested in similar work?
          </h2>
          <a
            href="mailto:jeremyguillaumedossantos@gmail.com"
            className="inline-block bg-white text-blue-600 hover:bg-gray-50 font-bold py-4 px-8 rounded-lg transition-colors"
          >
            Book a Discovery Call
          </a>
        </div>
      </div>
    </div>
  );
};
