import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { portfolioProjects } from '../data/portfolioData';
import { caseStudyMap } from '../data/caseStudyContent';
import { extractSection, stripMarkdown } from '../lib/markdown';

// Images served from /public/case-studies/[slug]/
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

// Extract a full section and split into renderable paragraphs
const getSection = (md: string, ...headings: string[]): string[] => {
  let raw = '';
  for (const h of headings) {
    raw = extractSection(md, h);
    if (raw) break;
  }
  if (!raw) return [];
  return stripMarkdown(raw)
    .split('\n\n')
    .map(p => p.replace(/\n/g, ' ').trim())
    .filter(p => p.length > 15);
};

export const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = portfolioProjects.find(p => p.slug === slug);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const entry = caseStudyMap[slug!];
  const fullMd = entry?.fullMd ?? '';
  const images = imageManifest[slug!] ?? [];

  const overview   = getSection(fullMd, 'The Context', 'Project Overview');
  const problem    = getSection(fullMd, 'The Problem', 'Problem & Goals');
  const approach   = getSection(fullMd, 'What I Did', 'Process & Approach', 'Research Approach', 'Approach');
  const findings   = getSection(fullMd, 'Key Findings', 'What I Built', 'Solution / Outputs', 'Design Directions Derived from Research');
  const solution   = findings.length > 0 ? [] : getSection(fullMd, 'Product Strategy', 'Product Overview');
  const outcomes   = getSection(fullMd, 'The Impact', 'Outcomes & Impact', 'Outcomes');
  const learnings  = getSection(fullMd, 'What I Learned', 'Learnings & Next Steps', 'Learnings');

  const SectionBlock = ({ label, heading, paras }: { label: string; heading: string; paras: string[] }) => {
    if (paras.length === 0) return null;
    return (
      <section>
        <div className="text-teal-500 text-[10px] font-bold uppercase tracking-widest mb-4">{label}</div>
        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">{heading}</h2>
        <div className="space-y-4">
          {paras.map((p, i) => (
            <p key={i} className="text-gray-600 leading-relaxed">{p}</p>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 text-sm mb-8">
          <Link to="/work" className="text-gray-500 hover:text-gray-900 transition-colors">Work</Link>
          <span className="text-gray-300">&rarr;</span>
          <span className="text-gray-900 font-medium">{project.company}</span>
          <span className="bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider py-1 px-2 rounded">{project.discipline}</span>
        </div>

        {/* Header */}
        <h1 className="text-5xl md:text-6xl font-heading font-bold text-gray-900 tracking-tight mb-6">
          {project.title}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl leading-relaxed mb-16">
          {project.description}
        </p>

        {/* Hero image or placeholder */}
        {images.length > 0 ? (
          <div className="w-full mb-24">
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
          <div className="w-full aspect-[21/9] bg-gray-100 rounded-2xl mb-24 flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column — full case study content */}
          <div className="lg:col-span-8 space-y-20">
            <SectionBlock label="Overview" heading="The context." paras={overview} />
            <SectionBlock label="The Problem" heading="What needed solving." paras={problem} />
            <SectionBlock label="What I Did" heading="How I approached it." paras={approach} />
            <SectionBlock label="Key Findings" heading="What came out of it." paras={findings} />
            <SectionBlock label="Output" heading="What was delivered." paras={solution} />

            {/* Secondary images — shown after findings */}
            {images.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {images.slice(1).map((img, i) => (
                  <figure key={i}>
                    <img src={img.src} alt={img.caption} className="w-full rounded-xl object-cover" />
                    {img.caption && <figcaption className="text-xs text-gray-400 mt-2">{img.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            )}

            {outcomes.length > 0 && (
              <section>
                <div className="text-teal-500 text-[10px] font-bold uppercase tracking-widest mb-4">The Impact</div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8">Measurable outcomes.</h2>
                {project.outcomes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {project.outcomes.map((outcome: { value: string; label: string }, i: number) => (
                      <div key={i} className="bg-gray-50 p-8 rounded-xl text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">{outcome.value}</div>
                        <div className="text-xs text-gray-600 font-medium">{outcome.label}</div>
                      </div>
                    ))}
                  </div>
                ) : null}
                <div className="space-y-4">
                  {outcomes.map((p, i) => (
                    <p key={i} className="text-gray-600 leading-relaxed">{p}</p>
                  ))}
                </div>
              </section>
            )}

            <SectionBlock label="Reflections" heading="What I learned." paras={learnings} />

            {/* Fallback if no markdown content loaded */}
            {overview.length === 0 && problem.length === 0 && approach.length === 0 && (
              <section>
                <div className="text-teal-500 text-[10px] font-bold uppercase tracking-widest mb-4">The Situation</div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">The context.</h2>
                <p className="text-gray-600 leading-relaxed">{project.situation || project.description}</p>
              </section>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8 sticky top-32">
              <div className="space-y-8">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Client</div>
                  <div className="font-medium text-gray-900">{project.company}</div>
                </div>
                <div className="h-px bg-gray-100 w-full"></div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Discipline</div>
                  <div className="font-medium text-gray-900">{project.discipline}</div>
                </div>
                <div className="h-px bg-gray-100 w-full"></div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Year</div>
                  <div className="font-medium text-gray-900">{project.year}</div>
                </div>
                {project.market && (
                  <>
                    <div className="h-px bg-gray-100 w-full"></div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Market</div>
                      <div className="font-medium text-gray-900">{project.market}</div>
                    </div>
                  </>
                )}
                {project.methods && project.methods.length > 0 && (
                  <>
                    <div className="h-px bg-gray-100 w-full"></div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Methods</div>
                      <div className="flex flex-wrap gap-2">
                        {project.methods.map((m: string, i: number) => (
                          <span key={i} className="bg-gray-100 text-gray-600 text-xs font-medium py-1 px-3 rounded-full">{m}</span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                {project.stack && project.stack.length > 0 && (
                  <>
                    <div className="h-px bg-gray-100 w-full"></div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Tools</div>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((t: string, i: number) => (
                          <span key={i} className="bg-gray-100 text-gray-600 text-xs font-medium py-1 px-3 rounded-full">{t}</span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                <a href="mailto:jeremyguillaumedossantos@gmail.com" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-lg transition-colors mt-8 text-center block">
                  Book a similar project &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-600 py-32 mt-24">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-10">
            Interested in similar work?
          </h2>
          <a href="mailto:jeremyguillaumedossantos@gmail.com" className="inline-block bg-white text-blue-600 hover:bg-gray-50 font-bold py-4 px-8 rounded-lg transition-colors">
            Book a Discovery Call
          </a>
        </div>
      </div>
    </div>
  );
};
