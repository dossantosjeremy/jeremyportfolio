import React, { useEffect, useState } from 'react';
import { GlowCard } from './GlowCard';
import { supabase, Project } from '../lib/supabase';
import { WorkFilters } from './ui/work-filters';
import { Filter } from './ui/filters';

const CaseStudyTemplate = ({ project, onBack }: { project: any, onBack: () => void }) => {
  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 text-sm mb-8">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-900 transition-colors">Work</button>
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

        {/* Hero Image Placeholder */}
        <div className="w-full aspect-[21/9] bg-gray-100 rounded-2xl mb-24 flex items-center justify-center">
          <svg className="w-16 h-16 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-20">
            <section>
              <div className="text-teal-500 text-[10px] font-bold uppercase tracking-widest mb-4">The Situation</div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">{project.situationHeading || "The context."}</h2>
              <p className="text-gray-600 leading-relaxed">{project.situation || project.description}</p>
            </section>

            <section>
              <div className="text-teal-500 text-[10px] font-bold uppercase tracking-widest mb-4">What I Did</div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">Research first. Then build.</h2>
              <p className="text-gray-600 leading-relaxed mb-8">{project.approach || "A structured approach matched to the specific question."}</p>
              <div className="flex flex-wrap gap-3">
                {(project.methods || []).map((tag: string, i: number) => (
                  <span key={i} className="bg-gray-100 text-gray-600 text-xs font-medium py-2 px-4 rounded-full">{tag}</span>
                ))}
              </div>
            </section>

            {project.outcomes && (
              <section>
                <div className="text-teal-500 text-[10px] font-bold uppercase tracking-widest mb-4">The Impact</div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8">Measurable outcomes.</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {project.outcomes.map((outcome: any, i: number) => (
                    <div key={i} className="bg-gray-50 p-8 rounded-xl text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">{outcome.value}</div>
                      <div className="text-xs text-gray-600 font-medium">{outcome.label}</div>
                    </div>
                  ))}
                </div>
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
                {project.stack && project.stack.length > 0 && (
                  <>
                    <div className="h-px bg-gray-100 w-full"></div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Tools</div>
                      <div className="font-medium text-gray-900">{project.stack.join(' · ')}</div>
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

const staticProjects = [
  {
    title: "Courier Support App Redesign",
    category: "UX Research",
    discipline: "UX Research",
    year: "2022",
    bg: "bg-teal/10",
    company: "Glovo",
    industry: "Delivery",
    market: "Europe",
    methods: ["Moderated Interviews", "Open Card Sorting", "Closed Card Sorting", "Thematic Analysis"],
    stack: ["Dovetail", "Maze", "Miro"],
    project_type: "Discovery",
    work_type: "In-house",
    description: "Couriers were abandoning the support app mid-flow. I ran moderated interviews and card sorting across Spain and Portugal to understand how couriers actually categorise their problems — and redesigned the IA around their mental models.",
    situation: "Glovo's courier support app was the primary channel for resolving delivery issues. Couriers were abandoning mid-flow or escalating to phone support, driving up operational costs. The hypothesis: the IA reflected Glovo's internal taxonomy, not how couriers think.",
    approach: "8 moderated interviews in Spain and Portugal. Open + closed card sorting with 40 couriers via Maze. Thematic analysis revealing three distinct mental models.",
    outcomes: [
      { value: "23%", label: "drop in escalation rate" },
      { value: "8 wks", label: "research to redesign launch" },
      { value: "40+", label: "couriers in study" }
    ],
    content: (
      <div className="w-full h-full border border-white/10 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-105 bg-black/5">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
    )
  },
  {
    title: "AI Lead Qualification System",
    category: "AI Automation",
    discipline: "AI Automation",
    year: "2024",
    bg: "bg-navy",
    company: "V+D (Freelance)",
    industry: "Creative Agency",
    market: "Europe",
    methods: [],
    stack: ["n8n", "OpenAI API", "Airtable", "Webhooks"],
    project_type: "Automation",
    work_type: "Freelance",
    description: "A 24/7 AI agent that qualifies incoming client enquiries, retrieves context from a knowledge base, and routes high-value leads to the calendar — without human input. Reduced missed leads by 80% and saved ~2 hours of manual coordination per day.",
    situation: "A creative agency was losing inbound leads to slow response times and inconsistent intake. Every enquiry required manual reading, qualifying, and routing — often hours after the initial contact.",
    approach: "Designed an n8n workflow connecting the intake form to a GPT-4 agent with a RAG knowledge base. The agent classifies lead quality, generates a personalised response, and routes to calendar or CRM based on score.",
    outcomes: [
      { value: "80%", label: "reduction in missed leads" },
      { value: "~2hrs", label: "saved per day on manual routing" },
      { value: "<2min", label: "avg response time" }
    ],
    content: (
      <div className="w-full h-full border border-white/10 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-105 bg-black/20">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-primary"></div>
        </div>
      </div>
    )
  },
  {
    title: "HP eCommerce Research Programme",
    category: "UX Research · Strategy",
    discipline: "UX Research",
    year: "2022–2024",
    bg: "bg-surface",
    company: "HP",
    industry: "eCommerce",
    market: "Global",
    methods: ["Moderated Usability Testing", "Concept Validation", "Diary Studies", "Survey Design", "Competitive Benchmarking"],
    stack: ["UserTesting", "Dovetail", "Hotjar", "Lookback"],
    project_type: "Discovery",
    work_type: "In-house",
    description: "Led the UX research program for HP's global eCommerce team across 10+ markets. 8+ shipped studies covering financing, customisation, promotions, returns, and post-sale UX — informing product decisions at Fortune 500 scale.",
    situation: "HP's eCommerce team needed rigorous research to inform product decisions across a complex, multi-market purchase lifecycle. Research needed to scale across 4 product verticals with different PM stakeholders and business questions.",
    approach: "Built a systematic research cadence across 4 verticals — financing, promotions, customisation, and returns. Mix of moderated usability testing, concept validation, and diary studies. Reported directly to product leadership across Portland, Barcelona, and Singapore.",
    outcomes: [
      { value: "8+", label: "shipped research projects" },
      { value: "10+", label: "markets covered" },
      { value: "4", label: "product verticals" }
    ],
    content: (
      <div className="w-3/4 aspect-square bg-white rounded-full shadow-md transition-transform duration-500 group-hover:scale-105 flex items-center justify-center border border-cardborder">
        <div className="w-1/2 aspect-square bg-gray-100 rounded-full"></div>
      </div>
    )
  },
  {
    title: "AI In-Car Assistant Research",
    category: "UX Research · Strategy",
    discipline: "UX Research",
    year: "2018–2021",
    bg: "bg-gradient-to-br from-gray-100 to-gray-200",
    company: "Renault Group",
    industry: "Automotive",
    market: "Europe",
    methods: ["Car Simulator Studies", "In-context Interviews", "Journey Mapping", "Participatory Design"],
    stack: ["Miro", "Atlas.ti"],
    project_type: "Discovery",
    work_type: "In-house",
    description: "Led the research programme that defined the interaction model for Renault's next-generation AI in-car companion — combining in-car simulator studies with qualitative research to understand how drivers want to interact with AI without losing trust in safety-critical moments.",
    situation: "Renault was building an AI in-car assistant ahead of broader vehicle intelligence features. The core design question: how should AI communicate with drivers during different driving contexts without increasing cognitive load or eroding trust?",
    approach: "Combined qualitative in-context interviews with simulator-based studies in a controlled vehicle environment. Participants experienced different AI communication patterns while physiological and behavioural responses were measured.",
    outcomes: [
      { value: "3yrs", label: "research programme duration" },
      { value: "5+", label: "European markets" },
      { value: "1", label: "published patent" }
    ],
    content: (
      <div className="w-3/4 h-3/4 bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-xl transition-transform duration-500 group-hover:scale-105"></div>
    )
  }
];

export const Work = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [filters, setFilters] = useState<Filter[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setProjects(data);
        }
      } catch (err) {
        console.error('Error fetching projects from Supabase:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (selectedProject) {
    return <CaseStudyTemplate project={selectedProject} onBack={() => setSelectedProject(null)} />;
  }

  const displayProjects = projects.length > 0
    ? projects.map(p => ({
        title: p.title,
        category: p.category,
        year: p.created_at ? new Date(p.created_at).getFullYear().toString() : '2024',
        bg: "bg-surface",
        description: p.description || "A comprehensive case study detailing the problem, approach, and solution.",
        discipline: "UX Research",
        industry: "Tech",
        company: "Client",
        market: "Global",
        methods: [],
        stack: [],
        project_type: "Discovery",
        work_type: "Freelance",
        content: (
          <img
            src={p.image_url}
            alt={p.title}
            className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        )
      }))
    : staticProjects;

  const filteredProjects = displayProjects.filter((project) => {
    if (filters.length === 0) return true;
    return filters.every((filter) => {
      const propName = filter.type.toLowerCase().replace(' ', '_');
      const projectValue = project[propName as keyof typeof project];
      if (projectValue === undefined) return false;
      const filterValues = filter.value;
      switch (filter.operator) {
        case 'is': return filterValues.includes(projectValue as string);
        case 'is not': return !filterValues.includes(projectValue as string);
        case 'is any of': return filterValues.includes(projectValue as string);
        case 'include': return Array.isArray(projectValue) && filterValues.some(v => projectValue.includes(v));
        case 'do not include': return Array.isArray(projectValue) && !filterValues.some(v => projectValue.includes(v));
        case 'include all of': return Array.isArray(projectValue) && filterValues.every(v => projectValue.includes(v));
        case 'include any of': return Array.isArray(projectValue) && filterValues.some(v => projectValue.includes(v));
        case 'exclude all of': return Array.isArray(projectValue) && !filterValues.every(v => projectValue.includes(v));
        case 'exclude if any of': return Array.isArray(projectValue) && !filterValues.some(v => projectValue.includes(v));
        case 'before': return parseInt(projectValue as string) < parseInt(filterValues[0]);
        case 'after': return parseInt(projectValue as string) > parseInt(filterValues[0]);
        default: return true;
      }
    });
  });

  return (
    <section className="py-32 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-16">
        <div className="text-primary text-[11px] font-medium uppercase tracking-label mb-4">Selected Work</div>
        <h2 className="text-5xl md:text-6xl font-heading font-bold text-text tracking-tight mb-6">A few things I've worked on.</h2>
        <p className="text-xl text-grey max-w-2xl mb-12">Nine years across automotive, delivery, and eCommerce. A curated set of projects that show how I approach problems — and what happens after the research is done.</p>
        <WorkFilters filters={filters} setFilters={setFilters} />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {filteredProjects.map((project, idx) => (
            <div key={idx} className="group cursor-pointer flex flex-col" onClick={() => setSelectedProject(project)}>
              <div className={`mb-6 aspect-[4/3] rounded-[32px] overflow-hidden ${project.bg} border border-cardborder shadow-sm transition-transform duration-500 group-hover:scale-[1.02]`}>
                <div className="w-full h-full flex items-center justify-center p-8 md:p-12 relative">
                  {project.content}
                </div>
              </div>
              <div className="flex flex-col flex-grow px-2">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-label text-primary mb-2">{project.category}</div>
                    <h3 className="font-heading font-bold text-2xl text-text group-hover:text-primary transition-colors">{project.title}</h3>
                  </div>
                  <span className="text-sm font-medium text-grey bg-white px-3 py-1 rounded-full border border-cardborder">{project.year}</span>
                </div>
                <p className="text-grey text-sm leading-relaxed mt-2">{project.description}</p>
                <div className="mt-6 pt-4 border-t border-cardborder">
                  <span className="text-primary font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Case Study &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
          <p className="text-grey text-lg mb-6">Don't see your context here? Most client work isn't public.</p>
          <a href="mailto:jeremyguillaumedossantos@gmail.com" className="inline-block bg-primary text-white px-8 py-4 rounded-btn font-medium hover:bg-blue-700 transition-colors text-lg">
            Book a Discovery Call &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};
