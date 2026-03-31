import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { E } from './ui/E';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-surface rounded-card overflow-hidden">
      <button
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-heading font-bold text-text">{question}</span>
        <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-5 text-grey leading-relaxed text-sm">
          {answer}
        </div>
      )}
    </div>
  );
};

export const Services = () => {
  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-8 py-16 text-center">
        <div className="text-primary text-[11px] font-bold uppercase tracking-widest mb-6">Services</div>
        <h1 className="text-5xl md:text-6xl font-heading font-bold text-text tracking-tight mb-6">
          <E k="services.header">Three disciplines. One consultant.</E>
        </h1>
        <p className="text-xl text-grey max-w-3xl mx-auto leading-relaxed">
          <E k="services.subheader">From a focused research sprint to a full automation build — scoped to your stage, delivered without handoff chaos.</E>
        </p>
      </div>

      {/* Service Cards */}
      <div className="max-w-7xl mx-auto px-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1 — AI Automation */}
          <div className="bg-surface rounded-card p-8 border-l-4 border-primary flex flex-col h-full">
            <div className="mb-6">
              <span className="inline-block bg-primary text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                AI Automation
              </span>
            </div>
            <h3 className="text-2xl font-heading font-bold text-text mb-4">
              AI Automation & Workflow Engineering
            </h3>
            <p className="text-grey mb-6 flex-grow leading-relaxed text-sm">
              <E k="services.ai.desc">I build custom pipelines, AI agents, and workflow systems that replace the manual work eating your team's time. Intake forms that route automatically. Lead qualification that runs overnight. Document generation that fires without human input. If it's a repeatable process, it can be automated.</E>
            </p>
            <div className="mb-4">
              <p className="text-[11px] text-grey font-semibold uppercase tracking-wider mb-2">Best for</p>
              <p className="text-grey text-xs leading-relaxed">Agencies, SaaS teams, and founders whose operations involve repetitive, rule-based tasks — lead intake, client onboarding, content production, internal reporting.</p>
            </div>
            <div className="text-[11px] text-grey font-medium mb-8 leading-relaxed">
              n8n · Make.com · OpenAI API · Anthropic API · Airtable · Webhooks · Python
            </div>
            <a href="/process" className="text-primary font-bold text-sm hover:underline flex items-center">
              See how this works &rarr;
            </a>
          </div>

          {/* Card 2 — UX Research */}
          <div className="bg-surface rounded-card p-8 border-l-4 border-teal flex flex-col h-full">
            <div className="mb-6">
              <span className="inline-block bg-teal text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                UX Research
              </span>
            </div>
            <h3 className="text-2xl font-heading font-bold text-text mb-4">
              UX Research & Discovery
            </h3>
            <p className="text-grey mb-6 flex-grow leading-relaxed text-sm">
              <E k="services.uxr.desc">Research that gets used, not filed away. I design studies around the specific decision you need to make — not a standard template. Whether you need to understand why users are churning, validate a concept before building, or evaluate a live product against its goals — I'll propose the right method, run the fieldwork, and give you findings you can act on. Available in 4 languages.</E>
            </p>
            <div className="mb-4">
              <p className="text-[11px] text-grey font-semibold uppercase tracking-wider mb-2">Best for</p>
              <p className="text-grey text-xs leading-relaxed">Product teams facing a decision they can't confidently make from data alone. Startups validating a direction. Scale-ups debugging a feature nobody's using.</p>
            </div>
            <div className="text-[11px] text-grey font-medium mb-8 leading-relaxed">
              Dovetail · Lookback · Maze · Hotjar · Miro · UserTesting · Optimal Workshop
            </div>
            <a href="/process" className="text-teal font-bold text-sm hover:underline flex items-center">
              See how this works &rarr;
            </a>
          </div>

          {/* Card 3 — UX Design */}
          <div className="bg-surface rounded-card p-8 border-l-4 border-text flex flex-col h-full">
            <div className="mb-6">
              <span className="inline-block bg-text text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                UX Design
              </span>
            </div>
            <h3 className="text-2xl font-heading font-bold text-text mb-4">
              UX & Product Design
            </h3>
            <p className="text-grey mb-6 flex-grow leading-relaxed text-sm">
              <E k="services.uxd.desc">From research insight to finished artefact — no translation layer. I create audits, wireframes, prototypes, and design systems that are grounded in what users actually need. Because I run the research myself, the design rationale is built in from the start, not justified after the fact.</E>
            </p>
            <div className="mb-4">
              <p className="text-[11px] text-grey font-semibold uppercase tracking-wider mb-2">Best for</p>
              <p className="text-grey text-xs leading-relaxed">Teams who need a design overhaul grounded in evidence. Founders building their first product. Teams whose design system has grown inconsistent and needs a reset.</p>
            </div>
            <div className="text-[11px] text-grey font-medium mb-8 leading-relaxed">
              Figma · FigJam · Protopie · Framer · Zeroheight
            </div>
            <a href="/process" className="text-text font-bold text-sm hover:underline flex items-center">
              See how this works &rarr;
            </a>
          </div>

        </div>
      </div>

      {/* Pricing / Engagement Model */}
      <div className="bg-[#111827] py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <div className="text-teal text-[11px] font-bold uppercase tracking-widest mb-4">How we engage</div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
              Pick the model that fits your stage.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tier 1 */}
            <div className="bg-white rounded-card p-8 relative border-t-4 border-primary flex flex-col">
              <h3 className="text-xl font-heading font-bold text-text mb-4">Exploration Milestone</h3>
              <div className="text-sm text-grey mb-6 font-medium">1–2 weeks</div>
              <p className="text-grey text-sm mb-8 leading-relaxed flex-grow">
                <E k="services.tier1.desc">The lowest-risk way to start. Use this for an initial discovery audit, a focused usability study, or a proof-of-concept automation to validate direction before a larger commitment.</E>
              </p>
              <ul className="space-y-3 mb-8">
                {['Weekly progress updates', 'Full asset handover', 'Written documentation', '14-day async support'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm text-text font-medium">
                    <svg className="w-4 h-4 text-teal mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="mailto:jeremyguillaumedossantos@gmail.com" className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-btn transition-colors text-center block">
                Start Here
              </a>
            </div>

            {/* Tier 2 */}
            <div className="bg-white rounded-card p-8 border-t-4 border-teal flex flex-col">
              <h3 className="text-xl font-heading font-bold text-text mb-4">Fixed-Scope Project</h3>
              <div className="text-sm text-grey mb-6 font-medium">2–12 weeks</div>
              <p className="text-grey text-sm mb-8 leading-relaxed flex-grow">
                <E k="services.tier2.desc">For a clearly scoped problem — a full research study, a product redesign, or an end-to-end automation build. We agree on scope, deliverables, and price before any work starts. No surprises.</E>
              </p>
              <ul className="space-y-3 mb-8">
                {['Kickoff and scoping call', 'Mon/Wed/Fri updates', 'Full asset handover', '14-day async support'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm text-text font-medium">
                    <svg className="w-4 h-4 text-teal mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="mailto:jeremyguillaumedossantos@gmail.com" className="w-full bg-teal hover:bg-teal/90 text-white font-bold py-3 px-4 rounded-btn transition-colors text-center block">
                Get a Quote
              </a>
            </div>

            {/* Tier 3 */}
            <div className="bg-white rounded-card p-8 border-t-4 border-text flex flex-col">
              <h3 className="text-xl font-heading font-bold text-text mb-4">Monthly Retainer</h3>
              <div className="text-sm text-grey mb-6 font-medium">Rolling — cancel any time</div>
              <p className="text-grey text-sm mb-8 leading-relaxed flex-grow">
                <E k="services.tier3.desc">Ongoing strategic support for teams who need continuous research, iterative design improvements, or automation maintenance. Ideal for product teams who want a reliable partner without hiring full-time.</E>
              </p>
              <ul className="space-y-3 mb-8">
                {['Agreed weekly deliverables', 'Priority scheduling', 'Full asset handover', 'Documentation kept up to date'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm text-text font-medium">
                    <svg className="w-4 h-4 text-teal mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="mailto:jeremyguillaumedossantos@gmail.com" className="w-full bg-text hover:bg-navy text-white font-bold py-3 px-4 rounded-btn transition-colors text-center block">
                Book a Call
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white py-32">
        <div className="max-w-3xl mx-auto px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <FAQItem
              question="Not sure which service is right for you?"
              answer="We can figure it out on a 20-minute discovery call. You describe what you're trying to solve, I tell you what I'd do — and whether it's actually something I can help with. No pressure."
            />
            <FAQItem
              question="Do you work outside Spain?"
              answer="Yes. I work remotely with clients across Europe and North America. We'll find overlapping hours for key calls; everything else runs asynchronously via your preferred tool."
            />
            <FAQItem
              question="Can you combine services?"
              answer="Yes, and it often makes the work better. Research findings feed directly into design decisions. Automation builds are more durable when they're designed around a real understanding of how people use the system."
            />
            <FAQItem
              question="How quickly can you start?"
              answer="Typically within 1–2 weeks, depending on current availability. For smaller exploration milestones I can sometimes start within a few days. We'll confirm an exact start date during our discovery call."
            />
            <FAQItem
              question="Do you sign NDAs?"
              answer="Yes. I'm comfortable signing standard NDAs before any sensitive project details are shared."
            />
            <FAQItem
              question="What if scope changes mid-project?"
              answer="Scope changes happen. If they do, I'll give you a written change order — updated timeline, updated price — before any out-of-scope work begins. You'll never be surprised by a bill."
            />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary py-24">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            <E k="services.cta.heading">Not sure where to start?</E>
          </h2>
          <p className="text-white/80 text-lg mb-10"><E k="services.cta.sub">Book a free 20-minute call. You tell me what you're trying to solve — I'll tell you what I'd do, and whether it's a fit.</E></p>
          <a href="mailto:jeremyguillaumedossantos@gmail.com" className="inline-block bg-white text-primary hover:bg-surface font-bold py-4 px-8 rounded-btn transition-colors">
            Book a Free Call
          </a>
        </div>
      </div>

    </div>
  );
};
