import React from 'react';
import { GlowCard } from './GlowCard';
import { Layers, User, BarChart3, Zap, Search, Layout } from 'lucide-react';
import { GooeyText } from './ui/gooey-text-morphing';

const PHILOSOPHY_TEXTS = ["UX Research", "Design", "AI Automation"];

export const Philosophy = () => (
  <section className="max-w-7xl mx-auto px-8 pb-24 pt-12">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <div className="h-[120px] md:h-[150px] flex items-center justify-start w-full">
        <GooeyText
          texts={PHILOSOPHY_TEXTS}
          morphTime={1}
          cooldownTime={1.5}
          className="font-heading font-bold text-text w-full h-full"
          textClassName="text-4xl md:text-5xl lg:text-6xl leading-tight text-left w-full"
        />
      </div>
      <div className="flex flex-col gap-6">
        <p className="text-lg text-grey leading-relaxed">
          I believe the most valuable work happens at the intersection of disciplines. Most teams are good at one thing: research without implementation, or design without discovery, or automation without understanding who it's for.
        </p>
        <p className="text-lg text-grey leading-relaxed">
          My approach is different. Every project starts with the right question — not the obvious one. I work across the full problem-to-solution arc: understanding the real friction, designing around it, and building systems that hold up after the handover.
        </p>
        <div>
          <a href="/profile" className="text-primary font-medium hover:underline inline-flex items-center gap-1 mt-2">Read about my approach &rarr;</a>
        </div>
      </div>
    </div>
  </section>
);

export const WhyWorkWithMe = () => (
  <section className="max-w-7xl mx-auto px-8 pb-24 pt-12">
    <div className="mb-12">
      <h2 className="text-4xl md:text-5xl font-heading font-bold text-text mb-4">
        Why Work With Me
      </h2>
      <div className="w-16 h-1 bg-primary mb-8"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
      <GlowCard>
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 text-primary">
          <Layers className="w-6 h-6" />
        </div>
        <h3 className="font-heading font-bold text-xl mb-3 text-text">Three disciplines. One person.</h3>
        <p className="text-grey leading-relaxed text-sm">Traditional agencies lose context at every handoff. You brief the researcher, who briefs the designer, who briefs the developer. I own the full arc — from first user interview to deployed automation — so nothing falls through the cracks.</p>
      </GlowCard>
      <GlowCard>
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 text-primary">
          <User className="w-6 h-6" />
        </div>
        <h3 className="font-heading font-bold text-xl mb-3 text-text">Direct Access</h3>
        <p className="text-grey leading-relaxed text-sm">You speak to me, not an account manager. That means faster feedback loops, more honest conversations, and work that reflects what you actually need — not a repackaged template.</p>
      </GlowCard>
      <GlowCard>
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 text-primary">
          <BarChart3 className="w-6 h-6" />
        </div>
        <h3 className="font-heading font-bold text-xl mb-3 text-text">Measured Outcomes</h3>
        <p className="text-grey leading-relaxed text-sm">I track what changed, not just what was delivered. Every piece of research surfaces metrics worth acting on. Every automation is built to reduce a specific, quantifiable cost.</p>
      </GlowCard>
    </div>
  </section>
);

export const Expertise = () => (
  <section className="max-w-7xl mx-auto px-8 pb-24 text-center">
    <div className="max-w-3xl mx-auto mb-16">
      <h2 className="text-4xl md:text-5xl font-heading font-bold text-text mb-4">
        Three disciplines. One person.<br />
        <span className="text-teal">No handoff chaos.</span>
      </h2>
      <p className="text-lg text-grey leading-relaxed">
        Traditional agencies lose context between research and implementation. I own the entire lifecycle of a problem — from discovery to delivery.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
      <GlowCard>
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 text-primary">
          <Zap className="w-6 h-6" />
        </div>
        <h3 className="font-heading font-bold text-xl mb-3 text-text">AI & Automation</h3>
        <p className="text-grey leading-relaxed text-sm">Custom workflows and AI agents built in n8n, Make.com, and Python that replace the manual work eating your team's week. Triggers, routing, synthesis — automated.</p>
      </GlowCard>
      <GlowCard>
        <div className="w-12 h-12 bg-teal/10 rounded-lg flex items-center justify-center mb-6 text-teal">
          <Search className="w-6 h-6" />
        </div>
        <h3 className="font-heading font-bold text-xl mb-3 text-text">UX Research</h3>
        <p className="text-grey leading-relaxed text-sm">Qual and quant research designed around the actual decision you need to make — not a standard study template. From screener to synthesis to stakeholder readout.</p>
      </GlowCard>
      <GlowCard>
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6 text-grey">
          <Layout className="w-6 h-6" />
        </div>
        <h3 className="font-heading font-bold text-xl mb-3 text-text">Product Design</h3>
        <p className="text-grey leading-relaxed text-sm">High-fidelity interfaces and design systems that look like consumer software and hold up in development. Research-led, so the rationale is baked in.</p>
      </GlowCard>
    </div>
  </section>
);
