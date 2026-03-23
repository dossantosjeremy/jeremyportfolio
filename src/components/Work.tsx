import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlowCard } from './GlowCard';
import { supabase, Project } from '../lib/supabase';
import { WorkFilters } from './ui/work-filters';
import { Filter, FilterType, FilterOperator } from './ui/filters';
import { portfolioProjects } from '../data/portfolioData';

const staticProjects = portfolioProjects;

export const Work = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filter[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (dir: 'left' | 'right') => {
    carouselRef.current?.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
  };

  const COMPANY_STORIES = [
    {
      company: 'PSA Peugeot Citroën',
      role: 'Human Factors Researcher',
      period: '2016',
      tagline: 'Proved that engineered sound reduces driver arousal — and ruled out a harmful variant before it shipped.',
      counterintuitive: 'Stationary sound had zero effect. Variable speed caused harm.',
      metrics: [{ value: '−20%', label: 'Arousal (EDA)' }, { value: '85%', label: 'Relaxation rate' }],
      slug: 'psa-peugeot-neural-up',
      gradient: 'from-slate-100 to-slate-200',
      accent: 'bg-slate-800',
      letter: 'P',
    },
    {
      company: 'Renault',
      role: 'Lead UX Researcher',
      period: '2018–2021',
      tagline: 'Built the first validated framework for AI attachment in automotive contexts — adopted across three Alliance brands.',
      counterintuitive: 'Emotional warmth doesn\'t drive acceptance. Utility does (β=0.49).',
      metrics: [{ value: '3 brands', label: 'Renault / Nissan / Mitsubishi' }, { value: '5', label: 'Design principles adopted' }],
      slug: 'renault-ai-living',
      gradient: 'from-yellow-50 to-amber-50',
      accent: 'bg-amber-500',
      letter: 'R',
    },
    {
      company: 'Glovo',
      role: 'UX Researcher',
      period: '2021–2023',
      tagline: 'A three-year programme that redesigned the support experience for 40,000+ couriers across 25 countries.',
      counterintuitive: 'Couriers weren\'t confused — they were deliberately bypassing the IA to reach a human.',
      metrics: [{ value: '+58%', label: 'Findability (tree test)' }, { value: '−23%', label: 'Support escalation' }],
      slug: 'glovo-courier-support',
      gradient: 'from-orange-50 to-yellow-50',
      accent: 'bg-orange-400',
      letter: 'G',
    },
    {
      company: 'HP',
      role: 'Lead UX Researcher',
      period: '2022–2024',
      tagline: '8+ research projects that reframed HP\'s eCommerce strategy — finding that financing is a delight trigger, not a decision driver.',
      counterintuitive: 'Customers don\'t use financing to decide what to buy. They discover it after.',
      metrics: [{ value: '8+', label: 'Research projects' }, { value: 'E2E', label: 'Journey architecture delivered' }],
      slug: 'hp-ecommerce',
      gradient: 'from-blue-50 to-sky-50',
      accent: 'bg-blue-600',
      letter: 'H',
    },
    {
      company: 'V+D',
      role: 'AI Automation Consultant',
      period: '2025',
      tagline: 'Turned 2–3 hours of manual client onboarding into a 15-minute automated flow — personalised and scalable.',
      counterintuitive: 'The hard part wasn\'t the automation. It was replicating their voice in the AI-generated briefs.',
      metrics: [{ value: '3h→15m', label: 'Onboarding time' }, { value: '100%', label: 'Data consistency' }],
      slug: 'vd-automation-suite',
      gradient: 'from-gray-800 to-gray-900',
      accent: 'bg-white',
      letter: 'V',
      dark: true,
    },
    {
      company: 'Momentum',
      role: 'UX Researcher & Product Designer',
      period: '2024',
      tagline: 'Validated an AI coaching concept across three markets and produced four high-priority design directions from user research.',
      counterintuitive: 'Users had motivation. What they lacked was structure — a clear "what next" after the goal.',
      metrics: [{ value: '15', label: 'Participants (ES/FR/UK)' }, { value: '4', label: 'Design directions validated' }],
      slug: 'momentum-app',
      gradient: 'from-teal-50 to-cyan-50',
      accent: 'bg-teal-500',
      letter: 'M',
    },
    {
      company: 'SoundJourney',
      role: 'Product Designer & PM',
      period: '2025',
      tagline: 'Designed a Spotify-connected travel discovery product from first principles — algorithm, PRD, and 8-week MVP roadmap.',
      counterintuitive: 'The constraint wasn\'t music matching. It was that showing a confidence score creates anxiety.',
      metrics: [{ value: 'Full PRD', label: 'Strategy + algorithm + roadmap' }, { value: '4-level', label: 'Matching hierarchy' }],
      slug: 'soundjourney-product',
      gradient: 'from-indigo-50 to-purple-50',
      accent: 'bg-indigo-500',
      letter: 'S',
    },
  ];

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

  // Always use static projects as the base; add any Supabase projects that have valid slugs on top
  const supabaseExtras = projects
    .filter(p => p.slug && !staticProjects.find(sp => sp.slug === p.slug))
    .map(p => ({
      slug: p.slug ?? '',
      title: p.title,
      category: p.category ?? 'UX Research',
      year: p.created_at ? new Date(p.created_at).getFullYear().toString() : '2024',
      bg: 'bg-surface',
      description: p.description || '',
      discipline: 'UX Research',
      industry: 'Tech',
      company: 'Client',
      market: 'Global',
      methods: [] as string[],
      stack: [] as string[],
      project_type: 'Discovery',
      work_type: 'freelance',
      situation: '',
      approach: '',
      outcomes: [] as { value: string; label: string }[],
      content: (
        <img
          src={p.image_url}
          alt={p.title}
          className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      ),
    }));

  const displayProjects = [...staticProjects, ...supabaseExtras];

  const filteredProjects = displayProjects.filter((project) => {
    if (filters.length === 0) return true;
    return filters.every((filter) => {
      const propName = filter.type.toLowerCase().replace(' ', '_');
      const projectValue = project[propName as keyof typeof project];
      if (projectValue === undefined) return false;
      const filterValues = filter.value;
      switch (filter.operator) {
        case 'is': {
          if (Array.isArray(projectValue)) {
            return filterValues.some(v => (projectValue as string[]).includes(v));
          }
          return filterValues.some(v =>
            (projectValue as string).toLowerCase().includes(v.toLowerCase())
          );
        }
        case 'is not': {
          if (Array.isArray(projectValue)) {
            return !filterValues.some(v => (projectValue as string[]).includes(v));
          }
          return !filterValues.some(v =>
            (projectValue as string).toLowerCase().includes(v.toLowerCase())
          );
        }
        case 'is any of': return Array.isArray(projectValue)
          ? filterValues.some(v => (projectValue as string[]).includes(v))
          : filterValues.some(v => (projectValue as string).toLowerCase().includes(v.toLowerCase()));
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

        {/* Company Stories Carousel */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-primary text-[11px] font-medium uppercase tracking-label mb-2">Company Stories</div>
              <h2 className="text-2xl font-heading font-bold text-text">The full story, by company.</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scrollCarousel('left')}
                className="w-10 h-10 rounded-full border border-cardborder bg-white hover:bg-surface transition-colors flex items-center justify-center text-grey hover:text-text"
                aria-label="Scroll left"
              >
                ←
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                className="w-10 h-10 rounded-full border border-cardborder bg-white hover:bg-surface transition-colors flex items-center justify-center text-grey hover:text-text"
                aria-label="Scroll right"
              >
                →
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto pb-4"
            style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {COMPANY_STORIES.map(story => (
              <Link
                key={story.slug}
                to={`/work/${story.slug}`}
                className="group flex-shrink-0 w-72 rounded-2xl border border-cardborder overflow-hidden hover:shadow-md transition-shadow"
                style={{ scrollSnapAlign: 'start' }}
              >
                {/* Card header */}
                <div className={`bg-gradient-to-br ${story.gradient} p-6 flex items-start justify-between`}>
                  <div>
                    <div className={`w-10 h-10 rounded-full ${story.accent} flex items-center justify-center mb-3`}>
                      <span className={`font-bold text-lg ${story.dark ? 'text-gray-800' : 'text-white'}`}>{story.letter}</span>
                    </div>
                    <div className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${story.dark ? 'text-gray-300' : 'text-grey'}`}>{story.period}</div>
                    <div className={`font-heading font-bold text-lg leading-tight ${story.dark ? 'text-white' : 'text-text'}`}>{story.company}</div>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${story.dark ? 'border-white/20 text-gray-300' : 'border-cardborder text-grey bg-white/60'}`}>
                    {story.role.split(' ')[0] === 'Lead' ? 'Lead' : story.role.split('&')[0].trim().split(' ').slice(-1)[0]}
                  </span>
                </div>

                {/* Card body */}
                <div className="bg-white p-6">
                  <p className="text-sm text-grey leading-relaxed mb-5 line-clamp-3">{story.tagline}</p>

                  {/* Key insight */}
                  <div className="bg-surface rounded-lg px-4 py-3 mb-5">
                    <div className="text-[9px] font-bold uppercase tracking-widest text-primary mb-1">Key insight</div>
                    <p className="text-xs text-grey italic leading-relaxed">{story.counterintuitive}</p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {story.metrics.map((m, i) => (
                      <div key={i} className="text-center bg-gray-50 rounded-lg py-3 px-2">
                        <div className="text-lg font-bold text-teal leading-none mb-1">{m.value}</div>
                        <div className="text-[10px] text-grey font-medium leading-tight">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="text-primary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read the story &rarr;
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Impact numbers — sourced from impact-map.md */}
        <div className="mb-10">
          <div className="text-primary text-[11px] font-medium uppercase tracking-label mb-5">By the numbers</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { value: '+58%',    label: 'Findability',         sub: 'Glovo courier support' },
              { value: '−23%',    label: 'Escalation rate',     sub: 'Glovo post-launch' },
              { value: '8+',      label: 'Research projects',   sub: 'HP eCommerce' },
              { value: '−20%',    label: 'Arousal reduction',   sub: 'PSA physiological' },
              { value: '85%',     label: 'Relaxation success',  sub: 'PSA in-car study' },
              { value: '100%',    label: 'Data consistency',    sub: 'V+D automation' },
              { value: '3h→15m',  label: 'Onboarding time',     sub: 'V+D client intake' },
              { value: '15',      label: 'Participants',         sub: 'Momentum multi-market' },
              { value: '4',       label: 'Design directions',   sub: 'Momentum validated' },
              { value: '3 brands',label: '1 standard',          sub: 'Renault Alliance' },
            ].map(s => (
              <div key={s.value + s.sub} className="bg-gray-100 rounded-xl p-5 text-center">
                <div className="text-xl font-bold text-teal mb-1">{s.value}</div>
                <div className="text-xs font-semibold text-text mb-0.5">{s.label}</div>
                <div className="text-[10px] text-grey">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Domain quick-filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {([
            { label: 'Automotive',  filterType: FilterType.INDUSTRY,   value: ['Automotive'] },
            { label: 'Gig Economy', filterType: FilterType.INDUSTRY,   value: ['On-Demand Delivery'] },
            { label: 'eCommerce',   filterType: FilterType.INDUSTRY,   value: ['eCommerce'] },
            { label: 'AI / ML',     filterType: FilterType.DISCIPLINE, value: ['AI Automation'] },
            { label: 'Automation',  filterType: FilterType.DISCIPLINE, value: ['AI Automation'] },
          ] as const).map(d => {
            const isActive = filters.some(f => f.type === d.filterType && f.value.join() === d.value.join());
            return (
              <button key={d.label}
                onClick={() => setFilters(prev => {
                  if (isActive) {
                    // Toggle off: remove this filter
                    return prev.filter(f => !(f.type === d.filterType && f.value.join() === d.value.join()));
                  }
                  // Toggle on: add (avoid duplicate)
                  const exists = prev.some(f => f.type === d.filterType && f.value.join() === d.value.join());
                  if (exists) return prev;
                  return [...prev, { id: d.label, type: d.filterType, operator: FilterOperator.IS_ANY_OF, value: [...d.value] }];
                })}
                className={`px-6 py-3 rounded-full font-medium transition-colors text-sm border ${
                  isActive
                    ? 'bg-primary text-white border-primary'
                    : 'bg-surface text-grey hover:text-text border-transparent'
                }`}>
                {d.label}
              </button>
            );
          })}
          {filters.length > 0 && (
            <button onClick={() => setFilters([])} className="text-grey hover:text-text px-4 py-3 text-sm font-medium transition-colors underline underline-offset-2">
              Clear all
            </button>
          )}
        </div>

        <WorkFilters filters={filters} setFilters={setFilters} />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {filteredProjects.map((project, idx) => (
            <Link key={idx} to={`/work/${project.slug}`} className="group cursor-pointer flex flex-col">
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
            </Link>
          ))}
        </div>

        {/* Cross-case synthesis accordion */}
        <div className="mt-24">
          <div className="text-primary text-[11px] font-medium uppercase tracking-label mb-4">How I work across projects</div>
          <h2 className="text-3xl font-heading font-bold text-text mb-8">Five recurring patterns.</h2>
          <div className="border-t border-cardborder">
            {[
              {
                title: "The Invisible Architecture Problem",
                body: "Across all projects, the core problem was a mismatch between an existing structure and the mental model or behaviour of the people it's meant to serve.",
              },
              {
                title: "Building Frameworks Where None Existed",
                body: "I don't just run studies — I build the conceptual infrastructure that makes the research generative. The frameworks outlast the studies.",
              },
              {
                title: "The Counterintuitive Finding",
                body: "My value is not in confirming hypotheses. It's in designing research rigorous enough to surface the non-obvious finding — and framing it in a way that makes it actionable.",
              },
              {
                title: "Research That Expands Its Own Scope",
                body: "I frame research in terms of strategic value — not just deliverables. This consistently creates research programmes, not one-off studies.",
              },
              {
                title: "Quantified Validation at Scale",
                body: "I close the loop between insight and evidence. Qualitative work explains what's wrong; quantitative work proves it's fixed.",
              },
            ].map((item, i) => (
              <div key={i} className="border-b border-cardborder">
                <button className="faq-btn w-full flex justify-between items-center py-6 text-left" onClick={toggleFaq}>
                  <span className="font-heading font-semibold text-lg text-text">{item.title}</span>
                  <svg className="faq-icon w-5 h-5 text-grey flex-shrink-0 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="faq-content max-h-0 overflow-hidden transition-all duration-300">
                  <p className="text-grey leading-relaxed pb-6">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
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
