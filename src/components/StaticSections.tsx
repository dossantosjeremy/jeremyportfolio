import React from 'react';

export const LogoStrip = () => {
  return (
    <section className="bg-surface h-auto md:h-[100px] py-6 md:py-0 border-y border-cardborder flex items-center mb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 w-full flex flex-col md:flex-row items-center gap-8">
        <div className="text-[11px] font-medium uppercase tracking-label text-grey whitespace-nowrap shrink-0">
          Collaborated with teams at
        </div>
        <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="animate-marquee flex items-center gap-4 px-2" style={{ animationDuration: '20s' }}>
            <div className="bg-white border border-cardborder rounded-card h-14 w-32 shrink-0 flex items-center justify-center shadow-sm"><span className="text-grey font-bold">HP</span></div>
            <div className="bg-white border border-cardborder rounded-card h-14 w-32 shrink-0 flex items-center justify-center shadow-sm"><span className="text-grey font-bold">Glovo</span></div>
            <div className="bg-white border border-cardborder rounded-card h-14 w-40 shrink-0 flex items-center justify-center shadow-sm"><span className="text-grey font-bold">Renault Group</span></div>
            <div className="bg-white border border-cardborder rounded-card h-14 w-32 shrink-0 flex items-center justify-center shadow-sm"><span className="text-grey font-bold">Stellantis</span></div>
            <div className="bg-white border border-cardborder rounded-card h-14 w-32 shrink-0 flex items-center justify-center shadow-sm"><span className="text-grey font-bold">Oracle</span></div>
            <div className="bg-white border border-cardborder rounded-card h-14 w-32 shrink-0 flex items-center justify-center shadow-sm" aria-hidden="true"><span className="text-grey font-bold">HP</span></div>
            <div className="bg-white border border-cardborder rounded-card h-14 w-32 shrink-0 flex items-center justify-center shadow-sm" aria-hidden="true"><span className="text-grey font-bold">Glovo</span></div>
            <div className="bg-white border border-cardborder rounded-card h-14 w-40 shrink-0 flex items-center justify-center shadow-sm" aria-hidden="true"><span className="text-grey font-bold">Renault Group</span></div>
            <div className="bg-white border border-cardborder rounded-card h-14 w-32 shrink-0 flex items-center justify-center shadow-sm" aria-hidden="true"><span className="text-grey font-bold">Stellantis</span></div>
            <div className="bg-white border border-cardborder rounded-card h-14 w-32 shrink-0 flex items-center justify-center shadow-sm" aria-hidden="true"><span className="text-grey font-bold">Oracle</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Challenges = () => {
  return (
    <section className="bg-surface py-24 mb-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text mb-6">
            Challenges I solve for <span className="text-teal">fast-moving</span> teams.
          </h2>
          <p className="text-lg text-grey leading-relaxed">
            Stop building features users don't need, or workflows that break at scale. I help you close the gap between what you think is happening and what's actually going on.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-cardborder rounded-card p-8 shadow-sm flex flex-col">
            <div className="w-10 h-10 bg-teal/10 rounded-full flex items-center justify-center mb-6 text-teal">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <h3 className="font-heading font-bold text-xl mb-6 text-text">AI & Automation</h3>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start gap-3 text-grey text-sm">
                <svg className="w-4 h-4 text-teal mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                <span>Manual processes eating 10–20% of your team's time</span>
              </li>
              <li className="flex items-start gap-3 text-grey text-sm">
                <svg className="w-4 h-4 text-teal mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                <span>Inconsistent data routing causing errors and delays</span>
              </li>
              <li className="flex items-start gap-3 text-grey text-sm">
                <svg className="w-4 h-4 text-teal mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                <span>Operational costs scaling faster than output</span>
              </li>
            </ul>
            <div className="pt-6 border-t border-cardborder mt-auto">
              <div className="text-[11px] font-bold uppercase tracking-label text-teal mb-2">The Solution</div>
              <p className="text-text font-medium text-sm leading-relaxed">Intelligent workflow engineering — from intake to output — built to handle volume without breaking.</p>
            </div>
          </div>

          <div className="bg-white border border-cardborder rounded-card p-8 shadow-sm flex flex-col">
            <div className="w-10 h-10 bg-teal/10 rounded-full flex items-center justify-center mb-6 text-teal">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
            </div>
            <h3 className="font-heading font-bold text-xl mb-6 text-text">UX Research</h3>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start gap-3 text-grey text-sm">
                <svg className="w-4 h-4 text-teal mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                <span>Product decisions made on assumptions, not evidence</span>
              </li>
              <li className="flex items-start gap-3 text-grey text-sm">
                <svg className="w-4 h-4 text-teal mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                <span>High churn at steps nobody has properly investigated</span>
              </li>
              <li className="flex items-start gap-3 text-grey text-sm">
                <svg className="w-4 h-4 text-teal mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                <span>Research that gets filed away instead of acted on</span>
              </li>
            </ul>
            <div className="pt-6 border-t border-cardborder mt-auto">
              <div className="text-[11px] font-bold uppercase tracking-label text-teal mb-2">The Solution</div>
              <p className="text-text font-medium text-sm leading-relaxed">Targeted studies matched to your actual question — with a readout designed to inform decisions, not just document findings.</p>
            </div>
          </div>

          <div className="bg-white border border-cardborder rounded-card p-8 shadow-sm flex flex-col">
            <div className="w-10 h-10 bg-teal/10 rounded-full flex items-center justify-center mb-6 text-teal">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path></svg>
            </div>
            <h3 className="font-heading font-bold text-xl mb-6 text-text">Product Design</h3>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start gap-3 text-grey text-sm">
                <svg className="w-4 h-4 text-teal mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                <span>Inconsistent UI slowing down engineering and eroding trust</span>
              </li>
              <li className="flex items-start gap-3 text-grey text-sm">
                <svg className="w-4 h-4 text-teal mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                <span>Complex flows alienating users who just want to get something done</span>
              </li>
              <li className="flex items-start gap-3 text-grey text-sm">
                <svg className="w-4 h-4 text-teal mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                <span>Features added without a clear design system to contain them</span>
              </li>
            </ul>
            <div className="pt-6 border-t border-cardborder mt-auto">
              <div className="text-[11px] font-bold uppercase tracking-label text-teal mb-2">The Solution</div>
              <p className="text-text font-medium text-sm leading-relaxed">Research-anchored design systems and interface overhauls that create clarity, not just polish.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Toolkit = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <div className="text-primary text-[11px] font-medium uppercase tracking-label mb-4">Skills & Tools</div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text mb-6">
            The toolkit that drives results.
          </h2>
          <p className="text-lg text-grey leading-relaxed">
            A modern stack built for speed, synthesis, and durability — not trendchasing.
          </p>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-cardborder rounded-card p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-5">
              <span className="text-primary font-heading font-bold text-xl">01</span>
              <h3 className="font-heading font-bold text-lg text-text">Automation & Ops</h3>
            </div>
            <div className="mb-3">
              <div className="text-[10px] font-bold uppercase tracking-label text-primary mb-2">Skills</div>
              <div className="flex flex-wrap gap-2">
                {['Workflow design', 'Process automation', 'AI agent development', 'Prompt engineering', 'System integration', 'Data pipeline architecture'].map(s => (
                  <span key={s} className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium text-primary">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-label text-grey mb-2">Tools</div>
              <div className="flex flex-wrap gap-2">
                {['Make.com', 'n8n', 'Zapier', 'OpenAI API', 'Anthropic API', 'Python', 'Airtable'].map(t => (
                  <span key={t} className="px-3 py-1.5 bg-surface border border-cardborder rounded-full text-xs font-medium text-text">{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white border border-cardborder rounded-card p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-5">
              <span className="text-primary font-heading font-bold text-xl opacity-50">02</span>
              <h3 className="font-heading font-bold text-lg text-text">UX & Research</h3>
            </div>
            <div className="mb-3">
              <div className="text-[10px] font-bold uppercase tracking-label text-teal mb-2">Skills</div>
              <div className="flex flex-wrap gap-2">
                {['Moderated usability testing', 'Semi-structured interviews', 'Tree testing', 'Card sorting', 'Diary studies', 'Thematic analysis', 'Statistical analysis', 'Journey mapping', 'Participatory design', 'Concept validation'].map(s => (
                  <span key={s} className="px-3 py-1.5 bg-teal/10 border border-teal/20 rounded-full text-xs font-medium text-teal">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-label text-grey mb-2">Tools</div>
              <div className="flex flex-wrap gap-2">
                {['Dovetail', 'Lookback', 'UserTesting', 'Maze', 'Hotjar', 'Miro', 'Optimal Workshop', 'dScout'].map(t => (
                  <span key={t} className="px-3 py-1.5 bg-surface border border-cardborder rounded-full text-xs font-medium text-text">{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white border border-cardborder rounded-card p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-5">
              <span className="text-primary font-heading font-bold text-xl opacity-50">03</span>
              <h3 className="font-heading font-bold text-lg text-text">Product & Design</h3>
            </div>
            <div className="mb-3">
              <div className="text-[10px] font-bold uppercase tracking-label text-grey mb-2">Skills</div>
              <div className="flex flex-wrap gap-2">
                {['Information architecture', 'Wireframing', 'Interaction design', 'Design systems', 'UX strategy', 'Cognitive load analysis', 'Prototyping', 'Product roadmapping'].map(s => (
                  <span key={s} className="px-3 py-1.5 bg-surface border border-cardborder rounded-full text-xs font-medium text-text">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-label text-grey mb-2">Tools</div>
              <div className="flex flex-wrap gap-2">
                {['Figma', 'FigJam', 'Protopie', 'Framer', 'Zeroheight'].map(t => (
                  <span key={t} className="px-3 py-1.5 bg-surface border border-cardborder rounded-full text-xs font-medium text-text">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FAQ = () => {
  return (
    <section className="max-w-3xl mx-auto px-8 pb-24">
      <div className="text-center mb-16">
        <div className="text-primary text-[11px] font-medium uppercase tracking-label mb-4">Questions</div>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-text">
          Common Inquiries
        </h2>
      </div>

      <div className="space-y-2">
        <div className="border-b border-cardborder pb-6 pt-4">
          <div className="flex justify-between items-center cursor-pointer group">
            <h3 className="font-heading font-bold text-lg text-text group-hover:text-primary transition-colors">How long does a typical automation project take?</h3>
            <svg className="w-5 h-5 text-grey group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          </div>
          <p className="text-grey leading-relaxed text-sm mt-4 pr-8">Depends on complexity. A scoped proof-of-concept can be ready in 1–2 weeks. A full workflow build typically runs 3–8 weeks. I'll give you a time estimate before any work starts — in writing.</p>
        </div>

        <div className="border-b border-cardborder pb-6 pt-4">
          <div className="flex justify-between items-center cursor-pointer group mb-4">
            <h3 className="font-heading font-bold text-lg text-primary">Do you work with non-technical founders?</h3>
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
          </div>
          <p className="text-grey leading-relaxed text-sm pr-8">Absolutely. I bridge the technical gap. I translate complex AI capabilities into simple, manageable systems that your team can run without engineering support.</p>
        </div>

        <div className="border-b border-cardborder pb-6 pt-4">
          <div className="flex justify-between items-center cursor-pointer group">
            <h3 className="font-heading font-bold text-lg text-text group-hover:text-primary transition-colors">What is your research methodology?</h3>
            <svg className="w-5 h-5 text-grey group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          </div>
          <p className="text-grey leading-relaxed text-sm mt-4 pr-8">I don't have a default method — I have a default question: what decision is this research meant to inform? From there I propose the right mix of qual and quant: in-depth interviews, usability testing, behavioural data analysis.</p>
        </div>

        <div className="border-b border-cardborder pb-6 pt-4">
          <div className="flex justify-between items-center cursor-pointer group">
            <h3 className="font-heading font-bold text-lg text-text group-hover:text-primary transition-colors">Can we start with a small pilot project?</h3>
            <svg className="w-5 h-5 text-grey group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          </div>
          <p className="text-grey leading-relaxed text-sm mt-4 pr-8">Yes, and I recommend it. The Exploration Milestone engagement (€800–€2,000) is designed exactly for that — a bounded, low-risk first step that validates direction before a larger commitment.</p>
        </div>
      </div>
    </section>
  );
};

export const Partnerships = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 pb-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-text leading-tight">
          Collaborated with teams at
        </h2>
      </div>
      <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee flex items-center gap-4 px-2" style={{ animationDuration: '20s' }}>
          {['HP', 'Glovo', 'Renault Group', 'Stellantis', 'Oracle', 'HP', 'Glovo', 'Renault Group', 'Stellantis', 'Oracle'].map((name, i) => (
            <div key={i} className={`bg-white border border-cardborder rounded-card h-20 ${name === 'Renault Group' ? 'w-48' : 'w-40'} shrink-0 flex items-center justify-center shadow-sm`} aria-hidden={i > 4 ? true : undefined}>
              <span className="text-grey font-bold text-lg">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CTA = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 pb-24">
      <div className="bg-gradient-to-br from-surface to-[#E0F2F1] rounded-card p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text mb-6 leading-tight">
            Let's talk about what you're trying to solve.
          </h2>
          <p className="text-lg text-grey leading-relaxed">
            Whether you're validating a product direction or eliminating a manual process that's costing you hours every week — I can help you scope it and figure out whether it's worth the investment.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
          <a href="mailto:jeremyguillaumedossantos@gmail.com" className="bg-teal text-white px-8 py-4 rounded-btn font-medium hover:bg-teal/90 transition-colors shadow-sm text-center">
            Book a Call
          </a>
          <a href="/work" className="bg-white text-text px-8 py-4 rounded-btn font-medium hover:bg-surface transition-colors shadow-sm text-center">
            View Work
          </a>
        </div>
      </div>
    </section>
  );
};
