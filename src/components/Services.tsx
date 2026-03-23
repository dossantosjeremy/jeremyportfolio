import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden">
      <button
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-heading font-bold text-gray-900">{question}</span>
        <ChevronDown className={`w-5 h-5 text-blue-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-5 text-gray-600 leading-relaxed text-sm">
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
        <div className="text-blue-500 text-[11px] font-bold uppercase tracking-widest mb-6">Services</div>
        <h1 className="text-5xl md:text-6xl font-heading font-bold text-gray-900 tracking-tight mb-6">
          Three disciplines. One<br/>consultant.
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          From a focused research sprint to a full automation build — scoped to your stage, delivered without handoff chaos.
        </p>
      </div>

      {/* Service Cards */}
      <div className="max-w-7xl mx-auto px-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1 — AI Automation */}
          <div className="bg-gray-50 rounded-2xl p-8 border-l-4 border-blue-500 flex flex-col h-full">
            <div className="mb-6">
              <span className="inline-block bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                AI Automation
              </span>
            </div>
            <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">
              AI Automation & Workflow Engineering
            </h3>
            <p className="text-gray-600 mb-6 flex-grow leading-relaxed text-sm">
              I build custom pipelines, AI agents, and workflow systems that replace the manual work eating your team's time. Intake forms that route automatically. Lead qualification that runs overnight. Document generation that fires without human input. If it's a repeatable process, it can be automated.
            </p>
            <div className="mb-4">
              <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider mb-2">Best for</p>
              <p className="text-gray-600 text-xs leading-relaxed">Agencies, SaaS teams, and founders whose operations involve repetitive, rule-based tasks — lead intake, client onboarding, content production, internal reporting.</p>
            </div>
            <div className="text-[11px] text-gray-500 font-medium mb-8 leading-relaxed">
              n8n · Make.com · OpenAI API · Anthropic API · Airtable · Webhooks · Python
            </div>
            <a href="/process" className="text-blue-500 font-bold text-sm hover:underline flex items-center">
              See how this works &rarr;
            </a>
          </div>

          {/* Card 2 — UX Research */}
          <div className="bg-gray-50 rounded-2xl p-8 border-l-4 border-teal-500 flex flex-col h-full">
            <div className="mb-6">
              <span className="inline-block bg-teal-500 text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                UX Research
              </span>
            </div>
            <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">
              UX Research & Discovery
            </h3>
            <p className="text-gray-600 mb-6 flex-grow leading-relaxed text-sm">
              Research that gets used, not filed away. I design studies around the specific decision you need to make — not a standard template. Whether you need to understand why users are churning, validate a concept before building, or evaluate a live product against its goals — I'll propose the right method, run the fieldwork, and give you findings you can act on. Available in 4 languages.
            </p>
            <div className="mb-4">
              <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider mb-2">Best for</p>
              <p className="text-gray-600 text-xs leading-relaxed">Product teams facing a decision they can't confidently make from data alone. Startups validating a direction. Scale-ups debugging a feature nobody's using.</p>
            </div>
            <div className="text-[11px] text-gray-500 font-medium mb-8 leading-relaxed">
              Dovetail · Lookback · Maze · Hotjar · Miro · UserTesting · Optimal Workshop
            </div>
            <a href="/process" className="text-teal-500 font-bold text-sm hover:underline flex items-center">
              See how this works &rarr;
            </a>
          </div>

          {/* Card 3 — UX Design */}
          <div className="bg-gray-50 rounded-2xl p-8 border-l-4 border-gray-900 flex flex-col h-full">
            <div className="mb-6">
              <span className="inline-block bg-gray-900 text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                UX Design
              </span>
            </div>
            <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">
              UX & Product Design
            </h3>
            <p className="text-gray-600 mb-6 flex-grow leading-relaxed text-sm">
              From research insight to finished artefact — no translation layer. I create audits, wireframes, prototypes, and design systems that are grounded in what users actually need. Because I run the research myself, the design rationale is built in from the start, not justified after the fact.
            </p>
            <div className="mb-4">
              <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider mb-2">Best for</p>
              <p className="text-gray-600 text-xs leading-relaxed">Teams who need a design overhaul grounded in evidence. Founders building their first product. Teams whose design system has grown inconsistent and needs a reset.</p>
            </div>
            <div className="text-[11px] text-gray-500 font-medium mb-8 leading-relaxed">
              Figma · FigJam · Protopie · Framer · Zeroheight
            </div>
            <a href="/process" className="text-gray-900 font-bold text-sm hover:underline flex items-center">
              See how this works &rarr;
            </a>
          </div>

        </div>
      </div>

      {/* Pricing / Engagement Model */}
      <div className="bg-[#111827] py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <div className="text-teal-500 text-[11px] font-bold uppercase tracking-widest mb-4">How we engage</div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
              Pick the model that fits your stage.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tier 1 */}
            <div className="bg-white rounded-xl p-8 relative border-t-4 border-blue-600 flex flex-col mt-4 md:mt-0">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-full text-center">
                <span className="bg-teal-500 text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                  Most Popular
                </span>
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-4 mt-2">Exploration Milestone</h3>
              <div className="text-4xl font-bold text-blue-600 mb-2">€800–€2,000</div>
              <div className="text-sm text-gray-500 mb-6 font-medium">1–2 weeks</div>
              <p className="text-gray-600 text-sm mb-8 leading-relaxed flex-grow">
                The lowest-risk way to start. Use this for an initial discovery audit, a focused usability study, or a proof-of-concept automation to validate direction before a larger commitment.
              </p>
              <ul className="space-y-3 mb-8">
                {['Weekly progress updates', 'Full asset handover', 'Written documentation', '14-day async support'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-700 font-medium">
                    <svg className="w-4 h-4 text-teal-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="mailto:jeremyguillaumedossantos@gmail.com" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-center block">
                Start Here
              </a>
            </div>

            {/* Tier 2 */}
            <div className="bg-white rounded-xl p-8 border-t-4 border-teal-500 flex flex-col mt-4 md:mt-0">
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">Fixed-Scope Project</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">Custom quote</div>
              <div className="text-sm text-gray-500 mb-6 font-medium">2–12 weeks</div>
              <p className="text-gray-600 text-sm mb-8 leading-relaxed flex-grow">
                For a clearly scoped problem — a full research study, a product redesign, or an end-to-end automation build. We agree on scope, deliverables, and price before any work starts. No surprises.
              </p>
              <ul className="space-y-3 mb-8">
                {['Kickoff and scoping call', 'Mon/Wed/Fri updates', 'Full asset handover', '14-day async support'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-700 font-medium">
                    <svg className="w-4 h-4 text-teal-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="mailto:jeremyguillaumedossantos@gmail.com" className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg transition-colors text-center block">
                Get a Quote
              </a>
            </div>

            {/* Tier 3 */}
            <div className="bg-white rounded-xl p-8 border-t-4 border-gray-900 flex flex-col mt-4 md:mt-0">
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">Monthly Retainer</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">€750–€3,000<span className="text-xl text-gray-500 font-normal">/mo</span></div>
              <div className="text-sm text-gray-500 mb-6 font-medium">Rolling — cancel any time</div>
              <p className="text-gray-600 text-sm mb-8 leading-relaxed flex-grow">
                Ongoing strategic support for teams who need continuous research, iterative design improvements, or automation maintenance. Ideal for product teams who want a reliable partner without hiring full-time.
              </p>
              <ul className="space-y-3 mb-8">
                {['Agreed weekly deliverables', 'Priority scheduling', 'Full asset handover', 'Documentation kept up to date'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-700 font-medium">
                    <svg className="w-4 h-4 text-teal-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="mailto:jeremyguillaumedossantos@gmail.com" className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3 px-4 rounded-lg transition-colors text-center block">
                Book a Call
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 py-32">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 text-center mb-16">
            What clients say.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-10 shadow-sm">
              <div className="text-blue-500 mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M10 11L8 17H5L7 11H5V7H10V11ZM19 11L17 17H14L16 11H14V7H19V11Z" /></svg>
              </div>
              <p className="text-gray-800 text-[15px] leading-relaxed mb-8">
                "Jérémy completely transformed how we handle courier support. The automation system saved us countless hours and the research insights were immediately actionable."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">Operations Lead</div>
                  <div className="text-gray-500 text-xs">Glovo</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-10 shadow-sm">
              <div className="text-blue-500 mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M10 11L8 17H5L7 11H5V7H10V11ZM19 11L17 17H14L16 11H14V7H19V11Z" /></svg>
              </div>
              <p className="text-gray-800 text-[15px] leading-relaxed mb-8">
                "The research insights were incredibly clear and immediately actionable. He didn't just hand over a report; he gave us a roadmap. Best investment we made this year."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">Product Manager</div>
                  <div className="text-gray-500 text-xs">HP</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white py-32">
        <div className="max-w-3xl mx-auto px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 text-center mb-12">
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
      <div className="bg-blue-600 py-24">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Not sure where to start?
          </h2>
          <p className="text-blue-100 text-lg mb-10">Book a free 20-minute call. You tell me what you're trying to solve — I'll tell you what I'd do, and whether it's a fit.</p>
          <a href="mailto:jeremyguillaumedossantos@gmail.com" className="inline-block bg-white text-blue-600 hover:bg-gray-50 font-bold py-4 px-8 rounded-lg transition-colors">
            Book a Free Call
          </a>
        </div>
      </div>

    </div>
  );
};
