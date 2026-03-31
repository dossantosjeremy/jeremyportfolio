import React, { useEffect, useState } from 'react';
import { E } from './ui/E';

export const Process = () => {
  const [activeTab, setActiveTab] = useState<'ai' | 'ux'>('ai');

  useEffect(() => {
    const triggerStagger = (containerId: string) => {
      const container = document.getElementById(containerId);
      if (!container) return;
      const steps = container.querySelectorAll('.timeline-step');
      steps.forEach((step, index) => {
        const el = step as HTMLElement;
        el.style.transition = 'none';
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        void el.offsetWidth;
        
        setTimeout(() => {
          el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 100 * index + 50);
      });
    };

    triggerStagger(`${activeTab}-steps`);
  }, [activeTab]);

  const toggleFaq = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const content = btn.nextElementSibling as HTMLElement;
    const icon = btn.querySelector('.faq-icon') as HTMLElement;
    
    if (content.style.maxHeight) {
      content.style.maxHeight = '';
      icon.style.transform = 'rotate(0deg)';
    } else {
      document.querySelectorAll('.faq-content').forEach(c => {
        (c as HTMLElement).style.maxHeight = '';
      });
      document.querySelectorAll('.faq-icon').forEach(i => {
        (i as HTMLElement).style.transform = 'rotate(0deg)';
      });
      
      content.style.maxHeight = content.scrollHeight + "px";
      icon.style.transform = 'rotate(180deg)';
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* SECTION: HERO */}
      <header className="pt-[80px] pb-12 px-8 text-center max-w-3xl mx-auto">
        <div className="text-teal text-[11px] font-medium uppercase tracking-label mb-4">How it works</div>
        <h1 className="text-5xl md:text-6xl font-heading font-bold text-text mb-6 tracking-tight">
          <E k="process.hero.heading">Every project is different. The way I work stays consistent.</E>
        </h1>
        <p className="text-lg md:text-xl text-grey leading-relaxed">
          <E k="process.hero.sub">Here's what working together looks like — from first message to final handover. Two modes, one working style.</E>
        </p>
      </header>

      {/* SECTION: TAB SWITCHER */}
      <div className="flex justify-center gap-4 mb-16 px-8">
        <button 
          onClick={() => setActiveTab('ai')} 
          className={activeTab === 'ai' ? 'bg-primary text-white px-6 py-3 rounded-full font-medium transition-colors shadow-sm' : 'bg-surface text-grey hover:text-text px-6 py-3 rounded-full font-medium transition-colors'}
        >
          AI Automation
        </button>
        <button 
          onClick={() => setActiveTab('ux')} 
          className={activeTab === 'ux' ? 'bg-primary text-white px-6 py-3 rounded-full font-medium transition-colors shadow-sm' : 'bg-surface text-grey hover:text-text px-6 py-3 rounded-full font-medium transition-colors'}
        >
          UX Research
        </button>
      </div>

      {/* SECTION: TIMELINE */}
      <section className="bg-navy text-white py-[96px] px-8 overflow-hidden">
        <div className="max-w-3xl mx-auto relative min-h-[600px]">

          {/* AI AUTOMATION STEPS */}
          <div id="ai-steps" className={`transition-opacity duration-150 relative ${activeTab === 'ai' ? 'block' : 'hidden'}`}>
            <div className="absolute left-8 top-8 bottom-8 w-[1px] bg-white/15 z-0"></div>

            <div className="timeline-step relative flex justify-start pt-10 md:pt-16 md:gap-10 opacity-0 translate-y-5">
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start w-[72px] md:w-[190px] shrink-0">
                <div className="h-10 absolute left-3 top-0 w-10 rounded-full bg-navy border border-white/20 flex items-center justify-center z-10">
                  <div className="w-[9px] h-[9px] rounded-full bg-teal"></div>
                </div>
                <p className="hidden md:block text-2xl md:pl-20 font-bold text-white/25">Week 0</p>
              </div>
              <div className="relative pl-14 md:pl-0 w-full pb-8">
                <p className="md:hidden text-base mb-3 font-bold text-white/40">Week 0</p>
                <div className="border border-white/10 rounded-card p-8 bg-transparent">
                  <h3 className="text-2xl font-heading font-bold text-white mb-3">Discovery & Audit</h3>
                  <p className="text-gray-400 text-lg mb-6 leading-relaxed">Before I build anything, I map the current state. We look at your existing workflows, tools, and team capacity — and identify where automation creates genuine leverage versus where it adds unnecessary complexity.</p>
                  <div className="inline-block bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium">
                    📄 Workflow Opportunity Map — highest-value automation candidates ranked by impact and effort
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-step relative flex justify-start md:gap-10 opacity-0 translate-y-5">
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start w-[72px] md:w-[190px] shrink-0">
                <div className="h-10 absolute left-3 top-0 w-10 rounded-full bg-navy border border-white/20 flex items-center justify-center z-10">
                  <div className="w-[9px] h-[9px] rounded-full bg-teal"></div>
                </div>
                <p className="hidden md:block text-2xl md:pl-20 font-bold text-white/25">Week 1</p>
              </div>
              <div className="relative pl-14 md:pl-0 w-full pb-8">
                <p className="md:hidden text-base mb-3 font-bold text-white/40">Week 1</p>
                <div className="border border-white/10 rounded-card p-8 bg-transparent">
                  <h3 className="text-2xl font-heading font-bold text-white mb-3">Scoping & Agreement</h3>
                  <p className="text-gray-400 text-lg mb-6 leading-relaxed">I write a project scope document that defines exactly what gets built, what's out of scope, the timeline, and the price. We agree on it in writing before any building begins. No ambiguity, no surprises.</p>
                  <div className="inline-block bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium">
                    📄 Project Scope Document — signed before work starts
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-step relative flex justify-start md:gap-10 opacity-0 translate-y-5">
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start w-[72px] md:w-[190px] shrink-0">
                <div className="h-10 absolute left-3 top-0 w-10 rounded-full bg-navy border border-white/20 flex items-center justify-center z-10">
                  <div className="w-[9px] h-[9px] rounded-full bg-teal"></div>
                </div>
                <p className="hidden md:block text-2xl md:pl-20 font-bold text-white/25">Weeks 2–8</p>
              </div>
              <div className="relative pl-14 md:pl-0 w-full pb-8">
                <p className="md:hidden text-base mb-3 font-bold text-white/40">Weeks 2–8</p>
                <div className="border border-white/10 rounded-card p-8 bg-transparent">
                  <h3 className="text-2xl font-heading font-bold text-white mb-3">Active Build</h3>
                  <p className="text-gray-400 text-lg mb-6 leading-relaxed">I build the automation in your stack, with full visibility at every stage. You receive updates every Monday, Wednesday, and Friday — what was done, what's next, and any blockers or decisions that need your input. You have access to the live environment throughout.</p>
                  <div className="inline-block bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium">
                    🔧 Live Automation System — running in your environment, tested against real inputs
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-step relative flex justify-start md:gap-10 opacity-0 translate-y-5">
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start w-[72px] md:w-[190px] shrink-0">
                <div className="h-10 absolute left-3 top-0 w-10 rounded-full bg-navy border border-white/20 flex items-center justify-center z-10">
                  <div className="w-[9px] h-[9px] rounded-full bg-teal"></div>
                </div>
                <p className="hidden md:block text-2xl md:pl-20 font-bold text-white/25">Final week</p>
              </div>
              <div className="relative pl-14 md:pl-0 w-full pb-8">
                <p className="md:hidden text-base mb-3 font-bold text-white/40">Final week</p>
                <div className="border border-white/10 rounded-card p-8 bg-transparent">
                  <h3 className="text-2xl font-heading font-bold text-white mb-3">Handover & Documentation</h3>
                  <p className="text-gray-400 text-lg mb-6 leading-relaxed">Full asset transfer. I hand over the workflow files, credentials documentation, operator guide, and a recorded walkthrough so your team can manage it independently. Nothing is a black box.</p>
                  <div className="inline-block bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium">
                    📦 Full Asset Transfer + Documentation + Video Walkthrough
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-step relative flex justify-start md:gap-10 opacity-0 translate-y-5">
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start w-[72px] md:w-[190px] shrink-0">
                <div className="h-10 absolute left-3 top-0 w-10 rounded-full bg-navy border border-white/20 flex items-center justify-center z-10">
                  <div className="w-[9px] h-[9px] rounded-full bg-teal"></div>
                </div>
                <p className="hidden md:block text-2xl md:pl-20 font-bold text-white/25">Post-delivery</p>
              </div>
              <div className="relative pl-14 md:pl-0 w-full pb-8">
                <p className="md:hidden text-base mb-3 font-bold text-white/40">Post-delivery</p>
                <div className="border border-white/10 rounded-card p-8 bg-transparent">
                  <h3 className="text-2xl font-heading font-bold text-white mb-3">14-Day Support</h3>
                  <p className="text-gray-400 text-lg mb-6 leading-relaxed">I remain available for questions, minor fixes, and edge-case debugging for 14 days after handover. If you want ongoing support after that, we can discuss a retainer.</p>
                  <div className="inline-block bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium">
                    ✅ 14-Day Async Support
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* UX RESEARCH STEPS */}
          <div id="ux-steps" className={`transition-opacity duration-150 relative ${activeTab === 'ux' ? 'block' : 'hidden'}`}>
            <div className="absolute left-8 top-8 bottom-8 w-[1px] bg-white/15 z-0"></div>

            <div className="timeline-step relative flex justify-start pt-10 md:pt-16 md:gap-10 opacity-0 translate-y-5">
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start w-[72px] md:w-[190px] shrink-0">
                <div className="h-10 absolute left-3 top-0 w-10 rounded-full bg-navy border border-white/20 flex items-center justify-center z-10">
                  <div className="w-[9px] h-[9px] rounded-full bg-teal"></div>
                </div>
                <p className="hidden md:block text-2xl md:pl-20 font-bold text-white/25">Day 1–2</p>
              </div>
              <div className="relative pl-14 md:pl-0 w-full pb-8">
                <p className="md:hidden text-base mb-3 font-bold text-white/40">Day 1–2</p>
                <div className="border border-white/10 rounded-card p-8 bg-transparent">
                  <h3 className="text-2xl font-heading font-bold text-white mb-3">Kickoff & Brief</h3>
                  <p className="text-gray-400 text-lg mb-6 leading-relaxed">We align on the specific research question — not a generalised "learn about users" mandate, but a precise decision your team needs to make. I review any existing data, previous studies, and analytics you can share. This prevents us from re-learning what you already know.</p>
                  <div className="inline-block bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium">
                    📄 Research Brief — defines the question, method, and success criteria
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-step relative flex justify-start md:gap-10 opacity-0 translate-y-5">
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start w-[72px] md:w-[190px] shrink-0">
                <div className="h-10 absolute left-3 top-0 w-10 rounded-full bg-navy border border-white/20 flex items-center justify-center z-10">
                  <div className="w-[9px] h-[9px] rounded-full bg-teal"></div>
                </div>
                <p className="hidden md:block text-2xl md:pl-20 font-bold text-white/25">Days 3–5</p>
              </div>
              <div className="relative pl-14 md:pl-0 w-full pb-8">
                <p className="md:hidden text-base mb-3 font-bold text-white/40">Days 3–5</p>
                <div className="border border-white/10 rounded-card p-8 bg-transparent">
                  <h3 className="text-2xl font-heading font-bold text-white mb-3">Research Design</h3>
                  <p className="text-gray-400 text-lg mb-6 leading-relaxed">I propose a methodology matched to the question and your budget. Sometimes that's 8 moderated interviews. Sometimes it's a survey followed by 4 deep-dives. Sometimes it's a 60-minute unmoderated usability test with 20 participants. I'll tell you what I'd recommend and why — and we agree before recruiting begins.</p>
                  <div className="inline-block bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium">
                    📄 Research Plan — method rationale, screening criteria, discussion guide, timeline
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-step relative flex justify-start md:gap-10 opacity-0 translate-y-5">
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start w-[72px] md:w-[190px] shrink-0">
                <div className="h-10 absolute left-3 top-0 w-10 rounded-full bg-navy border border-white/20 flex items-center justify-center z-10">
                  <div className="w-[9px] h-[9px] rounded-full bg-teal"></div>
                </div>
                <p className="hidden md:block text-2xl md:pl-20 font-bold text-white/25">Weeks 2–4</p>
              </div>
              <div className="relative pl-14 md:pl-0 w-full pb-8">
                <p className="md:hidden text-base mb-3 font-bold text-white/40">Weeks 2–4</p>
                <div className="border border-white/10 rounded-card p-8 bg-transparent">
                  <h3 className="text-2xl font-heading font-bold text-white mb-3">Fieldwork</h3>
                  <p className="text-gray-400 text-lg mb-6 leading-relaxed">I run the sessions — recruiting, scheduling, moderating, and note-taking. I conduct sessions in English, French, Spanish, or Portuguese depending on your user base. Sessions are recorded (with consent) and I share raw recordings with you if you want them.</p>
                  <div className="inline-block bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium">
                    🎙️ Raw Session Recordings + Transcripts + Observer Notes
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-step relative flex justify-start md:gap-10 opacity-0 translate-y-5">
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start w-[72px] md:w-[190px] shrink-0">
                <div className="h-10 absolute left-3 top-0 w-10 rounded-full bg-navy border border-white/20 flex items-center justify-center z-10">
                  <div className="w-[9px] h-[9px] rounded-full bg-teal"></div>
                </div>
                <p className="hidden md:block text-2xl md:pl-20 font-bold text-white/25">Weeks 4–5</p>
              </div>
              <div className="relative pl-14 md:pl-0 w-full pb-8">
                <p className="md:hidden text-base mb-3 font-bold text-white/40">Weeks 4–5</p>
                <div className="border border-white/10 rounded-card p-8 bg-transparent">
                  <h3 className="text-2xl font-heading font-bold text-white mb-3">Analysis & Synthesis</h3>
                  <p className="text-gray-400 text-lg mb-6 leading-relaxed">I analyse the data using thematic analysis — grouping observations into patterns, surfacing the findings that challenge assumptions, and flagging the ones that support them. I prioritise insights by business impact, not frequency. The most common thing users said is not always the most important thing you should know.</p>
                  <div className="inline-block bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium">
                    📊 Insight Repository — tagged, searchable, and shareable across your team
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-step relative flex justify-start md:gap-10 opacity-0 translate-y-5">
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start w-[72px] md:w-[190px] shrink-0">
                <div className="h-10 absolute left-3 top-0 w-10 rounded-full bg-navy border border-white/20 flex items-center justify-center z-10">
                  <div className="w-[9px] h-[9px] rounded-full bg-teal"></div>
                </div>
                <p className="hidden md:block text-2xl md:pl-20 font-bold text-white/25">Final week</p>
              </div>
              <div className="relative pl-14 md:pl-0 w-full pb-8">
                <p className="md:hidden text-base mb-3 font-bold text-white/40">Final week</p>
                <div className="border border-white/10 rounded-card p-8 bg-transparent">
                  <h3 className="text-2xl font-heading font-bold text-white mb-3">Readout & Recommendations</h3>
                  <p className="text-gray-400 text-lg mb-6 leading-relaxed">I present findings to your team in a structured readout session — usually 60–90 minutes. The format is: key insights, implications, and a prioritised recommendation set. I include a "what we'd do next" section so you leave with a clear path forward, not just a document to file.</p>
                  <div className="inline-block bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium">
                    📊 Insight Report + Readout Deck + Recommendation Workshop (optional)
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION: COMMUNICATION NORMS */}
      <section className="bg-white py-24 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-teal text-[11px] font-medium uppercase tracking-label mb-4">How we stay in sync</div>
          <h2 className="text-4xl font-heading font-bold text-text mb-12">No surprises. Always async-friendly.</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface p-10 rounded-card flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary mb-6 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="font-heading font-bold text-xl text-text mb-3">Same business-day response</h3>
              <p className="text-grey leading-relaxed">If you send a message during business hours, you'll hear back the same day. I don't disappear mid-project.</p>
            </div>
            <div className="bg-surface p-10 rounded-card flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary mb-6 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="font-heading font-bold text-xl text-text mb-3">Mon/Wed/Fri updates</h3>
              <p className="text-grey leading-relaxed">Every Monday, Wednesday, and Friday you'll receive a written progress update — what was done, what's next, and whether there's anything I need from you.</p>
            </div>
            <div className="bg-surface p-10 rounded-card flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary mb-6 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
              </div>
              <h3 className="font-heading font-bold text-xl text-text mb-3">Your tool of choice</h3>
              <p className="text-grey leading-relaxed">Slack, email, Notion, Linear, WhatsApp — wherever your team already lives. I adapt to your workflow, not the other way around.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: FAQ */}
      <section className="bg-white py-24 px-8">
        <div className="max-w-[720px] mx-auto">
          <h2 className="text-4xl font-heading font-bold text-text mb-10 text-center">Frequently Asked Questions</h2>
          
          <div className="border-t border-cardborder">
            <div className="border-b border-cardborder">
              <button onClick={toggleFaq} className="faq-btn w-full py-6 flex justify-between items-center text-left focus:outline-none group">
                <span className="font-heading font-bold text-lg text-text group-hover:text-primary transition-colors">How quickly can you start?</span>
                <svg className="faq-icon w-5 h-5 text-primary transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div className="faq-content max-h-0 overflow-hidden transition-all duration-300">
                <p className="pb-6 text-grey leading-relaxed">Typically within 1-2 weeks depending on my current workload. For smaller exploration milestones, I can sometimes start within a few days. We'll confirm an exact start date during our discovery call.</p>
              </div>
            </div>

            <div className="border-b border-cardborder">
              <button onClick={toggleFaq} className="faq-btn w-full py-6 flex justify-between items-center text-left focus:outline-none group">
                <span className="font-heading font-bold text-lg text-text group-hover:text-primary transition-colors">What if scope changes?</span>
                <svg className="faq-icon w-5 h-5 text-primary transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div className="faq-content max-h-0 overflow-hidden transition-all duration-300">
                <p className="pb-6 text-grey leading-relaxed">Scope changes are normal. If a new requirement arises, we'll discuss the impact on the timeline and budget. I will always provide a written change order for your approval before proceeding with any out-of-scope work.</p>
              </div>
            </div>

            <div className="border-b border-cardborder">
              <button onClick={toggleFaq} className="faq-btn w-full py-6 flex justify-between items-center text-left focus:outline-none group">
                <span className="font-heading font-bold text-lg text-text group-hover:text-primary transition-colors">Do you work in my timezone?</span>
                <svg className="faq-icon w-5 h-5 text-primary transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div className="faq-content max-h-0 overflow-hidden transition-all duration-300">
                <p className="pb-6 text-grey leading-relaxed">I am based in Europe (CET), but I work asynchronously with clients globally. We will find overlapping hours for our kickoff and readout calls, and the rest of the communication happens seamlessly via Slack, email, or your preferred tool.</p>
              </div>
            </div>

            <div className="border-b border-cardborder">
              <button onClick={toggleFaq} className="faq-btn w-full py-6 flex justify-between items-center text-left focus:outline-none group">
                <span className="font-heading font-bold text-lg text-text group-hover:text-primary transition-colors">Can I see work in progress?</span>
                <svg className="faq-icon w-5 h-5 text-primary transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div className="faq-content max-h-0 overflow-hidden transition-all duration-300">
                <p className="pb-6 text-grey leading-relaxed">Absolutely. I believe in full transparency. You will receive updates every Monday, Wednesday, and Friday. Depending on the project, you'll also have access to the live staging environment, Figma files, or raw research data as it's being generated.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: CTA */}
      <section className="bg-primary text-white py-24 px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6"><E k="process.cta.heading">Ready to start?</E></h2>
          <p className="text-white/80 text-lg mb-10 leading-relaxed"><E k="process.cta.sub">Book a 20-minute discovery call. No pitch, no pressure — just a conversation about what you're trying to solve and whether I'm the right person to help.</E></p>
          <a href="mailto:jeremyguillaumedossantos@gmail.com" className="inline-block bg-white text-primary px-10 py-4 rounded-btn font-bold text-lg hover:bg-surface transition-colors shadow-sm">
            Book a Discovery Call
          </a>
        </div>
      </section>
    </div>
  );
};
