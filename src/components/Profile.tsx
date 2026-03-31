import React from 'react';
import { Timeline } from './ui/timeline';
import { ProfileProcessFlow } from './ui/profile-process-flow';
import { E } from './ui/E';

export const Profile = () => {
  const data = [
    {
      title: "2024–Present",
      content: (
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-xl font-bold text-text">Freelance Consulting</h4>
            <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider py-1 px-2 rounded-full">AI Automation & UX Research</span>
          </div>
          <p className="text-grey text-sm md:text-base mb-4">
            Building AI-powered workflows for SMBs and early-stage startups. Running research sprints for product teams who need fast, credible answers. Clients in creative agencies, SaaS, and media production.
          </p>
          <ul className="space-y-2 text-sm text-grey mb-4">
            <li className="flex gap-2 items-baseline"><span className="text-primary shrink-0">▸</span><span>Reduced client onboarding from 3h to 15 min by automating intake using Make, Typeform, and AI for a Barcelona design consultancy</span></li>
            <li className="flex gap-2 items-baseline"><span className="text-primary shrink-0">▸</span><span>Cut documentation time by 85% by automating meeting transcription with Whisper + GPT-4</span></li>
            <li className="flex gap-2 items-baseline"><span className="text-primary shrink-0">▸</span><span>Delivered AI-powered video pipelines for a music media company by building avatar generation flows using HeyGen and ElevenLabs</span></li>
            <li className="flex gap-2 items-baseline"><span className="text-primary shrink-0">▸</span><span>Improved prospecting accuracy by building a scalable AI lead scoring system for a B2B outreach platform using n8n and Google Sheets</span></li>
          </ul>
          <p className="text-grey text-xs">n8n · Make.com · OpenAI API · Figma · Dovetail</p>
        </div>
      ),
    },
    {
      title: "2024–Current",
      content: (
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-xl font-bold text-text">Oracle NetSuite HCM</h4>
            <span className="bg-red-100 text-red-600 text-[10px] font-bold uppercase tracking-wider py-1 px-2 rounded">Principal UX Researcher</span>
          </div>
          <p className="text-grey text-sm md:text-base mb-4">
            Scaling research practice, AI frameworks, and product insight across Oracle NetSuite's HCM platform. Leading high-visibility initiatives from strategy through measurement across a global, cross-functional team.
          </p>
          <ul className="space-y-2 text-sm text-grey mb-4">
            <li className="flex gap-2 items-baseline"><span className="text-primary shrink-0">▸</span><span>Secured leadership buy-in for a Virtual Customer Visits program by building the business case and co-leading strategy through cross-regional training and full rollout</span></li>
            <li className="flex gap-2 items-baseline"><span className="text-primary shrink-0">▸</span><span>Established an AI UX research framework adopted org-wide by synthesising literature and leading a Trust in AI Craft of Research session</span></li>
            <li className="flex gap-2 items-baseline"><span className="text-primary shrink-0">▸</span><span>Designed end-to-end experience measurement for the Narrative Insights Limited Release by leading moderated sessions, diary studies, and a post-release measurement plan</span></li>
            <li className="flex gap-2 items-baseline"><span className="text-primary shrink-0">▸</span><span>Improved cross-team research visibility by owning the research pipeline, Kanban board, and prioritisation dashboard aligned to PM and leadership</span></li>
            <li className="flex gap-2 items-baseline"><span className="text-primary shrink-0">▸</span><span>Led a 10-person team from ideation to demo in a GenAI Hackathon by uniting cross-timezone contributors around an AI Feedback Tool prototype</span></li>
          </ul>
          <p className="text-grey text-xs">dScout · Dovetail · Figma · Confluence · Miro</p>
        </div>
      ),
    },
    {
      title: "2022–2024",
      content: (
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-xl font-bold text-text">HP eCommerce</h4>
            <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider py-1 px-2 rounded-full">Lead UX Researcher</span>
          </div>
          <p className="text-grey text-sm md:text-base mb-4">
            Led the research program for HP's global eCommerce team. 8+ shipped research studies covering the full purchase lifecycle — financing, customisation, promotions, returns, and post-sale UX across 10+ markets.
          </p>
          <ul className="space-y-2 text-sm text-grey mb-4">
            <li className="flex gap-2 items-baseline"><span className="text-primary shrink-0">▸</span><span>Led 10 qualitative and quantitative research projects collaborating with cross-functional teams across regions, contributing to increased conversion rates</span></li>
            <li className="flex gap-2 items-baseline"><span className="text-primary shrink-0">▸</span><span>Doubled quarterly research output by coaching and managing a team of 3 UX Researchers and systemising processes, guides, and templates</span></li>
            <li className="flex gap-2 items-baseline"><span className="text-primary shrink-0">▸</span><span>Implemented a UX Research Insights Repository that streamlined knowledge management and reduced research redundancies</span></li>
            <li className="flex gap-2 items-baseline"><span className="text-primary shrink-0">▸</span><span>Reframed financing as a delight trigger (not a decision driver) — a counterintuitive finding that changed product prioritisation</span></li>
          </ul>
          <p className="text-grey text-xs">Moderated usability testing · Concept validation · Diary studies · UserTesting · Survey design</p>
        </div>
      ),
    },
    {
      title: "2022–Present",
      content: (
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-xl font-bold text-text">ADPList & MentorCruise</h4>
            <span className="bg-teal-100 text-teal-600 text-[10px] font-bold uppercase tracking-wider py-1 px-2 rounded">Mentor</span>
          </div>
          <p className="text-grey text-sm md:text-base mb-4">
            Mentoring aspiring UX researchers and career-changers. Portfolio reviews, research craft, and navigating the job market. 100+ sessions delivered since 2022.
          </p>
        </div>
      ),
    },
    {
      title: "2021–2023",
      content: (
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-xl font-bold text-text">Glovo</h4>
            <span className="bg-surface text-text text-[10px] font-bold uppercase tracking-wider py-1 px-2 rounded">UX Researcher</span>
          </div>
          <p className="text-grey text-sm md:text-base mb-4">
            Owned the research function for the Courier Experience vertical — support, earnings visibility, and unhappy-path flows. Studies across 8 countries in 3 languages. Findings directly influenced a product redesign that reduced support contacts.
          </p>
          <ul className="space-y-2 text-sm text-grey mb-4">
            <li className="flex gap-2 items-baseline"><span className="text-primary shrink-0">▸</span><span>Improved courier app support findability by 58% by restructuring the IA through tree testing with 300+ participants across 25 countries</span></li>
            <li className="flex gap-2 items-baseline"><span className="text-primary shrink-0">▸</span><span>Reduced support escalation rate by 23% by redesigning the support flow through mental model and behavioural research</span></li>
            <li className="flex gap-2 items-baseline"><span className="text-primary shrink-0">▸</span><span>Managed 11 UX Research projects across 8 countries, reducing support costs by 6%</span></li>
            <li className="flex gap-2 items-baseline"><span className="text-primary shrink-0">▸</span><span>Influenced product strategy by delivering actionable research reports and artefacts to 90+ collaborators</span></li>
          </ul>
          <p className="text-grey text-xs">Ethnographic interviews · Contextual inquiry · Usability testing · Synthesis workshops</p>
        </div>
      ),
    },
    {
      title: "2018–2021",
      content: (
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-xl font-bold text-text">Renault Group</h4>
            <span className="bg-surface text-text text-[10px] font-bold uppercase tracking-wider py-1 px-2 rounded">Lead UX Researcher</span>
          </div>
          <p className="text-grey text-sm md:text-base mb-4">
            Led research for Renault's AI in-car assistant program. Conducted qualitative studies and simulator-based research in a controlled vehicle environment — a technically demanding context rare in UX research.
          </p>
          <ul className="space-y-2 text-sm text-grey mb-4">
            <li className="flex gap-2 items-baseline"><span className="text-primary shrink-0">▸</span><span>Established 5 design principles across Renault, Nissan, and Mitsubishi by building an AI attachment framework through mixed-methods research</span></li>
            <li className="flex gap-2 items-baseline"><span className="text-primary shrink-0">▸</span><span>Quantified utility as the key driver (β=0.49, p&lt;0.0001) through structural equation modelling with a 200+ participant study</span></li>
            <li className="flex gap-2 items-baseline"><span className="text-primary shrink-0">▸</span><span>Shifted team strategy away from emotional warmth by surfacing a counterintuitive finding through longitudinal user research</span></li>
            <li className="flex gap-2 items-baseline"><span className="text-primary shrink-0">▸</span><span>Supervised a UX Design Intern for 6 months, setting goals and providing feedback toward the development of an AI assistant in the cockpit</span></li>
          </ul>
          <p className="text-grey text-xs">Car simulator studies · In-context interviews · Journey mapping · Participatory design workshops</p>
        </div>
      ),
    },
    {
      title: "2016–2018",
      content: (
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-xl font-bold text-text">PSA Peugeot Citroën (Stellantis)</h4>
            <span className="bg-surface text-text text-[10px] font-bold uppercase tracking-wider py-1 px-2 rounded">Cognitive Scientist</span>
          </div>
          <p className="text-grey text-sm md:text-base mb-4">
            Research on driver stress and cognitive load under real driving conditions. Combined physiological measures (GSR, HRV) with qualitative debriefs. Co-inventor on a published patent derived from this work.
          </p>
          <ul className="space-y-2 text-sm text-grey mb-4">
            <li className="flex gap-2 items-baseline"><span className="text-primary shrink-0">▸</span><span>Reduced driver arousal by 20% by validating an engineered sound condition through EDA physiological measurement</span></li>
            <li className="flex gap-2 items-baseline"><span className="text-primary shrink-0">▸</span><span>Prevented a harmful variant from shipping by testing variable-speed audio through controlled in-car study</span></li>
            <li className="flex gap-2 items-baseline"><span className="text-primary shrink-0">▸</span><span>Achieved an 85% relaxation success rate by identifying the optimal sound profile through biometric testing on 100+ participants</span></li>
            <li className="flex gap-2 items-baseline"><span className="text-primary shrink-0">▸</span><span>Co-invented a patented in-car wellness technology derived from the research programme</span></li>
          </ul>
          <p className="text-grey text-xs">Psychophysiological measurement · Semi-structured interviews · Controlled lab protocols</p>
        </div>
      ),
    },
  ];

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Hero / About Section */}
      <div className="max-w-7xl mx-auto px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-teal text-[10px] font-bold uppercase tracking-widest mb-6">About</div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-text tracking-tight mb-6 leading-tight">
              I'm Jérémy. I research,<br/>design, and automate.
            </h1>
            <p className="text-lg text-grey leading-relaxed mb-6">
              <E k="profile.intro1">My background is in Cognitive Neuroscience — which gave me a methodological foundation and a genuine fascination with how people think, decide, and behave. That foundation has been the through-line across nine years working in three different industries.</E>
            </p>
            <p className="text-lg text-grey leading-relaxed mb-8">
              <E k="profile.intro2">I've been embedded in product teams at Stellantis, Renault Group, Glovo, and HP. Since 2024 I've been freelancing — applying the same rigour to automation projects and consulting engagements for teams who need fast, credible answers or faster, more reliable operations.</E>
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-surface text-text text-xs font-medium py-2 px-4 rounded-full flex items-center gap-2">
                📍 Madrid, Spain
              </span>
              <span className="bg-surface text-text text-xs font-medium py-2 px-4 rounded-full flex items-center gap-2">
                🌍 4 languages
              </span>
              <span className="bg-surface text-text text-xs font-medium py-2 px-4 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div> Available
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-navy rounded-card flex items-center justify-center overflow-hidden">
              <ProfileProcessFlow className="scale-75 sm:scale-90 md:scale-100 origin-center" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-surface rounded-card p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-1">9+ years</div>
                <div className="text-xs text-grey font-medium">Across 5 industries</div>
              </div>
              <div className="bg-surface rounded-card p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-1">50+ projects</div>
                <div className="text-xs text-grey font-medium">Research, design & automation</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Languages & Education */}
      <div className="bg-[#111827] py-24">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-6">Languages</div>
            <div className="flex flex-wrap gap-3">
              <span className="bg-white/10 text-white text-xs font-medium py-2 px-4 rounded-full border border-white/10">🇫🇷 French — Native</span>
              <span className="bg-white/10 text-white text-xs font-medium py-2 px-4 rounded-full border border-white/10">🇬🇧 English — Professional</span>
              <span className="bg-white/10 text-white text-xs font-medium py-2 px-4 rounded-full border border-white/10">🇪🇸 Spanish — Fluent</span>
              <span className="bg-white/10 text-white text-xs font-medium py-2 px-4 rounded-full border border-white/10">🇵🇹 Portuguese — Conversational</span>
            </div>
          </div>
          <div>
            <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-6">Education</div>
            <div className="space-y-2">
              <div className="text-white font-bold">MSc Cognitive Neuroscience</div>
              <div className="text-gray-400 text-sm">Specialisation in psychophysiology and human factors methodology</div>
              <div className="text-gray-400 text-sm mt-3">BSc Psychology</div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <Timeline
        data={data}
        title="Where I've worked."
        description=""
      />

      {/* Mentorship Section */}
      <div className="bg-surface py-32 text-center">
        <div className="max-w-3xl mx-auto px-8">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text mb-6">
            I also mentor.
          </h2>
          <p className="text-grey leading-relaxed mb-10">
            <E k="profile.mentor.bio">Since 2022 I've been mentoring aspiring UX researchers and designers on ADPList and MentorCruise — portfolio reviews, research craft, career transitions into UX. If you're early in your research career and trying to figure out what good looks like, reach out.</E>
          </p>
          <div className="flex justify-center gap-4">
            <a href="https://adplist.org" target="_blank" rel="noopener noreferrer" className="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-btn transition-colors text-sm">
              Find me on ADPList
            </a>
            <a href="https://mentorcruise.com" target="_blank" rel="noopener noreferrer" className="bg-white border border-cardborder hover:bg-surface text-text font-bold py-3 px-6 rounded-btn transition-colors text-sm">
              Find me on MentorCruise
            </a>
          </div>
        </div>
      </div>

      {/* Testimonials from Colleagues */}
      <div className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text text-center mb-16">
            What colleagues say.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface rounded-card p-8">
              <div className="text-primary mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M10 11L8 17H5L7 11H5V7H10V11ZM19 11L17 17H14L16 11H14V7H19V11Z" /></svg>
              </div>
              <p className="text-text text-sm leading-relaxed mb-8">
                "Jérémy completely transformed how we handle courier support. The automation system saved us countless hours and the research insights were immediately actionable."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-surface rounded-full"></div>
                <div>
                  <div className="font-bold text-text text-xs">Operations Lead</div>
                  <div className="text-grey text-[10px]">Glovo</div>
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-card p-8">
              <div className="text-primary mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M10 11L8 17H5L7 11H5V7H10V11ZM19 11L17 17H14L16 11H14V7H19V11Z" /></svg>
              </div>
              <p className="text-text text-sm leading-relaxed mb-8">
                "The research insights were incredibly clear and immediately actionable. He didn't just hand over a report; he gave us a roadmap. Best investment we made this year."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-surface rounded-full"></div>
                <div>
                  <div className="font-bold text-text text-xs">Product Manager</div>
                  <div className="text-grey text-[10px]">HP</div>
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-card p-8">
              <div className="text-primary mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M10 11L8 17H5L7 11H5V7H10V11ZM19 11L17 17H14L16 11H14V7H19V11Z" /></svg>
              </div>
              <p className="text-text text-sm leading-relaxed mb-8">
                "Jérémy brings a rare combination of deep empathy for the user and a highly structured, analytical mind. He elevated our entire product team's approach to research."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-surface rounded-full"></div>
                <div>
                  <div className="font-bold text-text text-xs">Design Lead</div>
                  <div className="text-grey text-[10px]">Glovo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary py-32">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Want to work together?
          </h2>
          <p className="text-white/80 text-lg mb-10 leading-relaxed">
            Whether you have a research question that needs answering or an operational problem that needs automating — I'm happy to have a first conversation and tell you honestly whether I'm the right fit.
          </p>
          <a href="mailto:jeremyguillaumedossantos@gmail.com" className="inline-block bg-white text-primary hover:bg-surface font-bold py-4 px-8 rounded-btn transition-colors">
            Book a Discovery Call
          </a>
        </div>
      </div>
    </div>
  );
};
