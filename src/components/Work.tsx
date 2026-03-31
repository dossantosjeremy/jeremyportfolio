import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlowCard } from './GlowCard';
import { supabase, Project } from '../lib/supabase';
import { WorkFilters } from './ui/work-filters';
import { Filter, FilterType, FilterOperator } from './ui/filters';
import { portfolioProjects } from '../data/portfolioData';
import { E } from './ui/E';
import { EDIT_PREFIX } from '../context/EditContext';

// Returns the cover image for a project, respecting any admin overrides saved from the case study editor
function getCoverSrc(slug: string, fallback: string | undefined): string | undefined {
  const override = localStorage.getItem(EDIT_PREFIX + `cover:${slug}`);
  return override ?? fallback;
}

const staticProjects = portfolioProjects;

const COMPANY_GRADIENTS: Record<string, string> = {
  'PSA Peugeot Citroën': 'from-slate-700 via-slate-800 to-slate-900',
  'Renault':             'from-amber-400 via-orange-500 to-orange-600',
  'Glovo':               'from-orange-400 via-yellow-400 to-yellow-500',
  'HP':                  'from-blue-500 via-blue-600 to-blue-800',
  'V+D':                 'from-gray-700 via-gray-800 to-black',
  'Momentum':            'from-teal-400 via-teal-500 to-cyan-600',
  'SoundJourney':        'from-indigo-500 via-purple-500 to-purple-700',
  'AAB Media':           'from-purple-500 via-pink-500 to-pink-600',
  'Crown Jewel Marketing': 'from-amber-500 via-yellow-500 to-yellow-600',
  'WEOP':                'from-emerald-500 via-green-500 to-green-700',
};

function getGradient(company: string): string {
  return COMPANY_GRADIENTS[company] ?? 'from-primary via-blue-600 to-blue-800';
}

const COVER_IMAGES: Record<string, string> = {
  'psa-peugeot-neural-up':     '/case-studies/psa-peugeot-neural-up/psa-cover.png',
  'renault-ai-living':         '/case-studies/renault-ai-living/renault-journey-ambient.png',
  'glovo-courier-support':     '/case-studies/glovo-courier-support/glovo-support-tree-test-2.png',
  'glovo-note-taking':         '/case-studies/glovo-note-taking/glovo-note-taking-report-1.png',
  'glovo-canceled-order':      '/case-studies/glovo-canceled-order/glovo-canceled-order-journey-map.png',
  'glovo-unhappy-path':        '/case-studies/glovo-unhappy-path/glovo-unhappy-path-journey-map.png',
  'glovo-customer-absent':     '/case-studies/glovo-customer-absent/glovo-customer-absent-problem-visual.png',
  'hp-ecommerce':              '/case-studies/hp-ecommerce/hp-financing-eval-customer-journey.png',
  'hp-registration':           '/case-studies/hp-registration/hp-registration-report-1.png',
  'hp-bundles':                '/case-studies/hp-bundles/hp-bundles-card-sorting-1.png',
  'hp-cross-sell':             '/case-studies/hp-cross-sell/hp-cross-sell-knowledge-board.png',
  'hp-customization':          '/case-studies/hp-customization/hp-customization-overview.png',
  'hp-financing-evaluation':   '/case-studies/hp-financing-evaluation/hp-financing-eval-customer-journey.png',
  'hp-subscriptions':          '/case-studies/hp-subscriptions/hp-subscriptions-empathy-map.png',
  'hp-ratings-reviews':        '/case-studies/hp-ratings-reviews/hp-ratings-reviews-report.png',
  'hp-returns-uk':             '/case-studies/hp-returns-uk/hp-returns-uk-overview.png',
  'vd-automation-suite':       '/case-studies/vd-automation-suite/automation-n8n-workflow.png',
  'vd-chatbot':                '/case-studies/vd-chatbot/automation-chatbot-case.png',
  'vd-meeting-minutes':        '/case-studies/vd-meeting-minutes/automation-meeting-minutes-case.png',
  'vd-internal-form':          '/case-studies/vd-internal-form/automation-intake-brief-case.png',
  'momentum-app':              '/case-studies/momentum-app/momentum-app-home.png',
  'soundjourney-product':      '/case-studies/soundjourney-product/soundjourney-journey-result.png',
};

export const Work = ({ homepage }: { homepage?: boolean } = {}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const sectionScrollRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const carouselRef = useRef<HTMLDivElement>(null);
  const freelanceCarouselRef = useRef<HTMLDivElement>(null);
  const personalCarouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, dir: 'left' | 'right') => {
    ref.current?.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
  };

  const COMPANY_STORIES = [
    {
      company: 'PSA Peugeot Citroën',
      role: 'Human Factors Researcher',
      period: '2016',
      tagline: 'Physiological research that shaped in-car audio before it shipped.',
      accomplishments: [
        'Reduced driver arousal by 20% by validating an engineered sound condition through EDA physiological measurement',
        'Prevented a harmful variant from shipping by testing variable-speed audio through controlled in-car study',
        'Achieved an 85% relaxation success rate by identifying the optimal sound profile through biometric testing',
      ],
      slug: 'psa-peugeot-neural-up',
      gradient: 'from-slate-100 to-slate-200',
      accent: 'bg-slate-800',
      letter: 'P',
      badge: 'Cognitive Scientist',
    },
    {
      company: 'Renault',
      role: 'Lead UX Researcher',
      period: '2018–2021',
      tagline: 'AI attachment framework adopted across three Alliance brands.',
      accomplishments: [
        'Established 5 design principles across Renault, Nissan, and Mitsubishi by building an AI attachment framework through mixed-methods research',
        'Quantified utility as the key driver (β=0.49) by running structural equation modelling through a 200+ participant study',
        'Shifted team strategy away from emotional warmth by surfacing a counterintuitive finding through longitudinal user research',
      ],
      slug: 'renault-ai-living',
      gradient: 'from-yellow-50 to-amber-50',
      accent: 'bg-amber-500',
      letter: 'R',
      badge: 'Lead UX Researcher',
    },
    {
      company: 'Glovo',
      role: 'UX Researcher',
      period: '2021–2023',
      tagline: 'Redesigned support for 40,000+ couriers across 25 countries.',
      accomplishments: [
        'Improved findability by 58% by restructuring the courier support IA through tree testing with 300+ participants',
        'Reduced escalation rate by 23% by redesigning the support flow through mental model and behavioural research',
        'Reframed the core problem from confusion to deliberate bypass by uncovering courier workarounds through contextual inquiry',
      ],
      slug: 'glovo-courier-support',
      gradient: 'from-orange-50 to-yellow-50',
      accent: 'bg-orange-400',
      letter: 'G',
      badge: 'UX Researcher',
    },
    {
      company: 'HP',
      role: 'Lead UX Researcher',
      period: '2022–2024',
      tagline: '8+ projects that reframed how HP thinks about eCommerce buying.',
      accomplishments: [
        'Reframed financing as a delight trigger (not a decision driver) by conducting 8+ studies through moderated usability and survey research',
        'Delivered an end-to-end journey architecture by synthesising multi-market findings through continuous discovery',
        'Changed product prioritisation by surfacing that customers discover financing after deciding through diary studies',
      ],
      slug: 'hp-ecommerce',
      gradient: 'from-blue-50 to-sky-50',
      accent: 'bg-blue-600',
      letter: 'H',
      badge: 'Lead UX Researcher',
    },
    {
      company: 'Oracle',
      role: 'Principal UX Researcher',
      period: '2024–Current',
      tagline: 'Scaling research practice, AI frameworks, and product insight across Oracle NetSuite HCM.',
      accomplishments: [
        'Secured leadership buy-in for a Virtual Customer Visits program by building the business case and co-leading strategy through cross-regional training and full rollout',
        'Established an AI UX research framework adopted org-wide by synthesising literature and leading a Trust in AI Craft of Research session',
        'Designed end-to-end experience measurement for the Narrative Insights Limited Release by leading moderated sessions, diary studies, and a post-release measurement plan',
        'Improved cross-team research visibility by owning the research pipeline, Kanban board, and prioritisation dashboard aligned to PM and leadership',
        'Led a 10-person team from ideation to demo in a GenAI Hackathon by uniting cross-timezone contributors around an AI Feedback Tool prototype',
      ],
      slug: 'oracle-netsuite',
      gradient: 'from-red-50 to-orange-50',
      accent: 'bg-red-600',
      letter: 'O',
      badge: 'Principal UX Researcher',
    },
  ];

  const FREELANCE_STORIES = [
    {
      company: 'V+D',
      role: 'AI Automation Consultant',
      period: '2025',
      tagline: 'Five automation systems for a Barcelona design consultancy.',
      accomplishments: [
        'Reduced client onboarding from 3h to 15min by automating intake through Make, Typeform, and AI',
        'Cut documentation time by 85% by automating meeting transcription through Whisper + GPT-4',
        'Improved lead conversion by deploying a qualification chatbot through a custom AI agent pipeline',
      ],
      slug: 'vd-automation-suite',
      gradient: 'from-gray-800 to-gray-900',
      accent: 'bg-white',
      letter: 'V',
      dark: true,
      badge: 'AI Automation',
    },
    {
      company: 'AAB Media',
      role: 'AI Automation Consultant',
      period: '2025',
      tagline: 'AI-powered video content pipelines for a music media company.',
      accomplishments: [
        'Scaled video output by automating avatar generation from text prompts through HeyGen + GPT',
        'Enabled an AI narration format by building a text-to-video pipeline through ElevenLabs + Make',
      ],
      slug: 'andrew-avatar-video',
      gradient: 'from-purple-50 to-pink-50',
      accent: 'bg-purple-500',
      letter: 'A',
      badge: 'AI Automation',
    },
    {
      company: 'Crown Jewel',
      role: 'AI Automation Consultant',
      period: '2025',
      tagline: 'File intelligence automation for a US marketing agency.',
      accomplishments: [
        'Eliminated manual metadata tagging by building an AI file ingestion bot through GPT-4, Box, and n8n',
      ],
      slug: 'justin-file-ingestion',
      gradient: 'from-amber-50 to-yellow-50',
      accent: 'bg-amber-500',
      letter: 'C',
      badge: 'AI Automation',
    },
    {
      company: 'WEOP',
      role: 'AI Automation Consultant',
      period: '2025',
      tagline: 'B2B growth automation for a European outreach platform.',
      accomplishments: [
        'Improved prospecting accuracy by building a scalable AI lead scoring system through n8n + Google Sheets',
        'Eliminated manual task creation by automating Google Sheets ↔ ClickUp sync through Make',
      ],
      slug: 'lead-scoring',
      gradient: 'from-green-50 to-emerald-50',
      accent: 'bg-emerald-500',
      letter: 'W',
      badge: 'AI Automation',
    },
  ];

  const PERSONAL_STORIES = [
    {
      company: 'Momentum',
      role: 'UX Researcher & Product Designer',
      period: '2024',
      tagline: 'Validated an AI coaching concept across three markets.',
      accomplishments: [
        'Identified core user need by running research across ES/FR/UK through 15 contextual interviews',
        'Defined 4 high-priority design directions by synthesising findings through JTBD + affinity mapping',
      ],
      slug: 'momentum-app',
      gradient: 'from-teal-50 to-cyan-50',
      accent: 'bg-teal-500',
      letter: 'M',
      badge: 'UX Researcher & UX Designer',
    },
    {
      company: 'SoundJourney',
      role: 'Product Designer & PM',
      period: '2025',
      tagline: 'Designed a Spotify-connected travel discovery product from scratch.',
      accomplishments: [
        'Delivered a launch-ready PRD by designing a full product strategy through constraint-first design',
        'Reduced algorithm anxiety by hiding confidence scores by default through iterative concept testing',
      ],
      slug: 'soundjourney-product',
      gradient: 'from-indigo-50 to-purple-50',
      accent: 'bg-indigo-500',
      letter: 'S',
      badge: 'UX Designer & AI Automation',
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

  // Robust filter: OR within same type, AND across different types
  const filteredProjects = displayProjects.filter((project) => {
    if (filters.length === 0) return true;
    // Every filter entry must match (AND). OR is handled inside matchesFilter for multi-value filters.
    return filters.every((filter) => matchesFilter(project, filter));
  });

  function matchesFilter(project: typeof displayProjects[0], filter: Filter): boolean {
    const propName = filter.type.toLowerCase().replace(/ /g, '_');
    const raw = project[propName as keyof typeof project];
    if (raw === undefined || raw === null) return false;

    const projectVal = raw as string | string[];
    const filterVals = filter.value;

    // Helper: does a single project string value match any filter value?
    const strMatch = (pv: string) =>
      filterVals.some(fv => pv.toLowerCase().includes(fv.toLowerCase()));

    // Helper: does any element in a project array match any filter value?
    const arrMatch = (pa: string[]) =>
      filterVals.some(fv => pa.some(pv => pv.toLowerCase().includes(fv.toLowerCase())));

    const valueMatch = Array.isArray(projectVal) ? arrMatch(projectVal) : strMatch(projectVal);

    switch (filter.operator) {
      case 'is':
      case 'is any of':
      case 'include':
      case 'include any of':
        return valueMatch;
      case 'is not':
      case 'do not include':
      case 'exclude if any of':
        return !valueMatch;
      case 'include all of':
        return Array.isArray(projectVal)
          ? filterVals.every(fv => (projectVal as string[]).some(pv => pv.toLowerCase().includes(fv.toLowerCase())))
          : valueMatch;
      case 'exclude all of':
        return Array.isArray(projectVal)
          ? !filterVals.every(fv => (projectVal as string[]).some(pv => pv.toLowerCase().includes(fv.toLowerCase())))
          : !valueMatch;
      case 'before':
        return parseInt(projectVal as string) < parseInt(filterVals[0]);
      case 'after':
        return parseInt(projectVal as string) > parseInt(filterVals[0]);
      default:
        return true;
    }
  }

  return (
    <section className="py-32 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-16">
        <div className="text-primary text-[11px] font-medium uppercase tracking-label mb-4">Selected Work</div>
        <h2 className="text-5xl md:text-6xl font-heading font-bold text-text tracking-tight mb-6"><E k="work.title">A few things I've worked on.</E></h2>
        <p className="text-xl text-grey max-w-2xl mb-12"><E k="work.subtitle">Nine years across automotive, delivery, and eCommerce. A curated set of projects that show how I approach problems — and what happens after the research is done.</E></p>

        {/* Company Stories Carousel */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-primary text-[11px] font-medium uppercase tracking-label mb-2">Company Stories</div>
              <h2 className="text-2xl font-heading font-bold text-text">In-house roles, by company.</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scrollCarousel(carouselRef, 'left')}
                className="w-10 h-10 rounded-full border border-cardborder bg-white hover:bg-surface transition-colors flex items-center justify-center text-grey hover:text-text"
                aria-label="Scroll left"
              >
                ←
              </button>
              <button
                onClick={() => scrollCarousel(carouselRef, 'right')}
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
                className="group flex-shrink-0 w-72 rounded-2xl border-2 border-cardborder overflow-hidden hover:border-primary/20 hover:shadow-md transition-all flex flex-col"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className={`bg-gradient-to-br ${story.gradient} p-6 flex items-start justify-between`}>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider mb-0.5 text-grey">{story.period}</div>
                    <div className="font-heading font-bold text-lg leading-tight text-text">{story.company}</div>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full border border-cardborder text-grey bg-white/60">
                    {story.badge}
                  </span>
                </div>
                <div className="bg-white p-6 flex-1">
                  <p className="text-sm text-grey leading-relaxed mb-4"><E k={`work.cs.${story.slug}.tagline`}>{story.tagline}</E></p>
                  <ul className="space-y-2 mb-5">
                    {story.accomplishments.map((a, i) => (
                      <li key={i} className="flex gap-2 text-xs text-grey leading-relaxed">
                        <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                        <span><E k={`work.cs.${story.slug}.acc${i}`}>{a}</E></span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-primary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read the story &rarr;
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {!homepage && (<>

        {/* Freelance & Personal Projects Carousel */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-primary text-[11px] font-medium uppercase tracking-label mb-2">Freelance &amp; Personal</div>
              <h2 className="text-2xl font-heading font-bold text-text">Independent work &amp; side projects.</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scrollCarousel(freelanceCarouselRef, 'left')}
                className="w-10 h-10 rounded-full border border-cardborder bg-white hover:bg-surface transition-colors flex items-center justify-center text-grey hover:text-text"
                aria-label="Scroll left"
              >
                ←
              </button>
              <button
                onClick={() => scrollCarousel(freelanceCarouselRef, 'right')}
                className="w-10 h-10 rounded-full border border-cardborder bg-white hover:bg-surface transition-colors flex items-center justify-center text-grey hover:text-text"
                aria-label="Scroll right"
              >
                →
              </button>
            </div>
          </div>

          <div
            ref={freelanceCarouselRef}
            className="flex gap-5 overflow-x-auto pb-4"
            style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {FREELANCE_STORIES.map(story => (
              <Link
                key={story.slug}
                to={`/work/${story.slug}`}
                className="group flex-shrink-0 w-72 rounded-2xl border-2 border-cardborder overflow-hidden hover:border-primary/20 hover:shadow-md transition-all flex flex-col"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className={`bg-gradient-to-br ${story.gradient} p-6 flex items-start justify-between`}>
                  <div>
                    <div className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${story.dark ? 'text-gray-300' : 'text-grey'}`}>{story.period}</div>
                    <div className={`font-heading font-bold text-lg leading-tight ${story.dark ? 'text-white' : 'text-text'}`}>{story.company}</div>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${story.dark ? 'border-white/20 text-gray-300' : 'border-cardborder text-grey bg-white/60'}`}>
                    {story.badge}
                  </span>
                </div>
                <div className="bg-white p-6 flex-1">
                  <p className="text-sm text-grey leading-relaxed mb-4"><E k={`work.freelance.${story.slug}.tagline`}>{story.tagline}</E></p>
                  <ul className="space-y-2 mb-5">
                    {story.accomplishments.map((a, i) => (
                      <li key={i} className="flex gap-2 text-xs text-grey leading-relaxed">
                        <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                        <span><E k={`work.freelance.${story.slug}.acc${i}`}>{a}</E></span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-primary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read the story &rarr;
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Own / Personal Projects Carousel */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-primary text-[11px] font-medium uppercase tracking-label mb-2">Own Projects</div>
              <h2 className="text-2xl font-heading font-bold text-text">Personal projects &amp; side bets.</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scrollCarousel(personalCarouselRef, 'left')}
                className="w-10 h-10 rounded-full border border-cardborder bg-white hover:bg-surface transition-colors flex items-center justify-center text-grey hover:text-text"
                aria-label="Scroll left"
              >
                ←
              </button>
              <button
                onClick={() => scrollCarousel(personalCarouselRef, 'right')}
                className="w-10 h-10 rounded-full border border-cardborder bg-white hover:bg-surface transition-colors flex items-center justify-center text-grey hover:text-text"
                aria-label="Scroll right"
              >
                →
              </button>
            </div>
          </div>

          <div
            ref={personalCarouselRef}
            className="flex gap-5 overflow-x-auto pb-4"
            style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {PERSONAL_STORIES.map(story => (
              <Link
                key={story.slug}
                to={`/work/${story.slug}`}
                className="group flex-shrink-0 w-72 rounded-2xl border-2 border-cardborder overflow-hidden hover:border-primary/20 hover:shadow-md transition-all flex flex-col"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className={`bg-gradient-to-br ${story.gradient} p-6 flex items-start justify-between`}>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider mb-0.5 text-grey">{story.period}</div>
                    <div className="font-heading font-bold text-lg leading-tight text-text">{story.company}</div>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full border border-cardborder text-grey bg-white/60">
                    {story.badge}
                  </span>
                </div>
                <div className="bg-white p-6 flex-1">
                  <p className="text-sm text-grey leading-relaxed mb-4"><E k={`work.personal.${story.slug}.tagline`}>{story.tagline}</E></p>
                  <ul className="space-y-2 mb-5">
                    {story.accomplishments.map((a, i) => (
                      <li key={i} className="flex gap-2 text-xs text-grey leading-relaxed">
                        <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                        <span><E k={`work.personal.${story.slug}.acc${i}`}>{a}</E></span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-primary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read the story &rarr;
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Impact by discipline */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* UX Research column */}
          <div className="rounded-card border border-cardborder bg-surface overflow-hidden">
            <div className="px-7 pt-6 pb-4 border-b border-cardborder flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-label text-primary">UX Research</span>
            </div>
            <div className="divide-y divide-cardborder">
              {[
                { value: '+58%',    label: 'Findability uplift',       sub: 'Glovo · 300+ couriers, tree testing' },
                { value: '−23%',    label: 'Support escalations cut',   sub: 'Glovo · measured post-launch' },
                { value: '−20%',    label: 'Arousal reduction',         sub: 'PSA · physiological EDA measurement' },
                { value: '30+',     label: 'Studies shipped',           sub: 'Across automotive, delivery, eCommerce' },
                { value: '3 brands',label: '1 design standard',         sub: 'Renault · Nissan · Mitsubishi Alliance' },
              ].map(s => (
                <div key={s.label} className="flex items-baseline gap-4 px-7 py-4">
                  <div className="text-2xl font-bold text-primary font-heading w-24 shrink-0">{s.value}</div>
                  <div>
                    <div className="text-sm font-semibold text-text leading-tight">{s.label}</div>
                    <div className="text-[11px] text-grey mt-0.5">{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Automation column */}
          <div className="rounded-card border border-cardborder bg-surface overflow-hidden">
            <div className="px-7 pt-6 pb-4 border-b border-cardborder flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-teal" />
              <span className="text-[11px] font-semibold uppercase tracking-label text-teal">AI Automation</span>
            </div>
            <div className="divide-y divide-cardborder">
              {[
                { value: '5×',             label: 'Operational scale-up',         sub: 'V+D · same team, 5× client capacity' },
                { value: '2–3h → <3min',   label: 'Brief generation time',        sub: 'V+D · manual drafting → automated output' },
                { value: '85%',            label: 'Documentation time cut',        sub: 'V+D · meeting minutes automation' },
                { value: '100%',           label: 'Data consistency',              sub: 'V+D · zero manual entry errors post-deploy' },
                { value: '4 clients',      label: 'Automation engagements',        sub: 'V+D · AAB · Crown Jewel · WEOP' },
              ].map(s => (
                <div key={s.label} className="flex items-baseline gap-4 px-7 py-4">
                  <div className="text-2xl font-bold text-teal font-heading w-28 shrink-0">{s.value}</div>
                  <div>
                    <div className="text-sm font-semibold text-text leading-tight">{s.label}</div>
                    <div className="text-[11px] text-grey mt-0.5">{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filter bar: quick-filters + add filter, all in one row */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {/* Quick filter groups */}
          {([
            { group: 'Discipline', filters: [
              { label: 'UX Research',   filterType: FilterType.DISCIPLINE, value: ['UX Research'] },
              { label: 'Product Design',filterType: FilterType.DISCIPLINE, value: ['Product Design'] },
              { label: 'AI Automation', filterType: FilterType.DISCIPLINE, value: ['AI Automation'] },
            ]},
            { group: 'Industry', filters: [
              { label: 'Automotive',    filterType: FilterType.INDUSTRY,   value: ['Automotive'] },
              { label: 'Delivery App',  filterType: FilterType.INDUSTRY,   value: ['On-Demand Delivery'] },
              { label: 'eCommerce',     filterType: FilterType.INDUSTRY,   value: ['eCommerce'] },
            ]},
            { group: 'Type', filters: [
              { label: 'In-house',      filterType: FilterType.WORK_TYPE,  value: ['in-house'] },
              { label: 'Freelance',     filterType: FilterType.WORK_TYPE,  value: ['freelance'] },
              { label: 'Side project',  filterType: FilterType.WORK_TYPE,  value: ['side-project'] },
            ]},
          ]).map(({ group, filters: groupFilters }, gi) => (
            <React.Fragment key={group}>
              {gi > 0 && <div className="w-px h-4 bg-cardborder mx-0.5 shrink-0" />}
              <span className="text-[10px] font-semibold uppercase tracking-widest text-grey shrink-0">{group}</span>
              {groupFilters.map(d => {
                const isActive = filters.some(f => f.type === d.filterType && f.value.join() === d.value.join());
                return (
                  <button key={d.label}
                    onClick={() => setFilters(prev => {
                      if (isActive) return prev.filter(f => !(f.type === d.filterType && f.value.join() === d.value.join()));
                      const exists = prev.some(f => f.type === d.filterType && f.value.join() === d.value.join());
                      if (exists) return prev;
                      return [...prev, { id: d.label, type: d.filterType, operator: FilterOperator.IS, value: [...d.value] }];
                    })}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border ${
                      isActive
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-white text-grey border-cardborder hover:border-primary/50 hover:text-primary'
                    }`}>
                    {isActive && <span className="text-[10px] leading-none">✕</span>}
                    {d.label}
                  </button>
                );
              })}
            </React.Fragment>
          ))}

          {/* Divider */}
          <div className="w-px h-5 bg-cardborder mx-1 shrink-0" />

          <WorkFilters filters={filters} setFilters={setFilters} />

          {filters.length > 0 && (
            <button onClick={() => setFilters([])} className="text-grey hover:text-text px-2 py-1.5 text-xs font-medium transition-colors ml-1">
              Clear all
            </button>
          )}

          {/* Spacer + sort */}
          <div className="ml-auto flex items-center gap-1 shrink-0">
            <span className="text-[11px] text-grey font-medium mr-1">Sort:</span>
            {(['newest', 'oldest'] as const).map(opt => (
              <button key={opt} onClick={() => setSortOrder(opt)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  sortOrder === opt
                    ? 'bg-text text-white border-text'
                    : 'bg-white text-grey border-cardborder hover:border-text'
                }`}>
                {opt === 'newest' ? 'Newest' : 'Oldest'}
              </button>
            ))}
          </div>
        </div>
        </>)}
      </div>

      {!homepage && (<>
      {/* Grouped sections */}
      {(() => {
        const SECTIONS = [
          { id: 'psa',       label: 'PSA Peugeot Citroën', sub: 'In-house · 2016',      sortYear: 2016, match: (p: typeof filteredProjects[0]) => p.company === 'PSA Peugeot Citroën' },
          { id: 'renault',   label: 'Renault',             sub: 'In-house · 2018–2021', sortYear: 2018, match: (p: typeof filteredProjects[0]) => p.company === 'Renault' },
          { id: 'glovo',     label: 'Glovo',               sub: 'In-house · 2021–2023', sortYear: 2021, match: (p: typeof filteredProjects[0]) => p.company === 'Glovo' },
          { id: 'hp',        label: 'HP',                  sub: 'In-house · 2022–2024', sortYear: 2022, match: (p: typeof filteredProjects[0]) => p.company === 'HP' },
          { id: 'freelance', label: 'Freelance',           sub: 'Independent work',     sortYear: 2025, match: (p: typeof filteredProjects[0]) => p.work_type === 'freelance' },
          { id: 'personal',  label: 'Own Projects',        sub: 'Side projects',        sortYear: 2024, match: (p: typeof filteredProjects[0]) => p.work_type === 'side-project' },
        ];
        const sorted = [...SECTIONS].sort((a, b) =>
          sortOrder === 'newest' ? b.sortYear - a.sortYear : a.sortYear - b.sortYear
        );
        const visible = sorted.filter(s => filteredProjects.some(s.match));
        return visible.map(section => {
          const cards = filteredProjects.filter(section.match);
          return (
            <div key={section.id} className="mb-10">
              {/* Section header */}
              <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-heading font-bold text-lg text-text">{section.label}</h3>
                  <div className="text-xs text-grey mt-0.5">{section.sub} · {cards.length} {cards.length === 1 ? 'project' : 'projects'}</div>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => sectionScrollRefs.current[section.id]?.scrollBy({ left: -360, behavior: 'smooth' })}
                    className="w-8 h-8 rounded-full border border-cardborder bg-white hover:bg-surface flex items-center justify-center text-grey hover:text-text transition">
                    ←
                  </button>
                  <button onClick={() => sectionScrollRefs.current[section.id]?.scrollBy({ left: 360, behavior: 'smooth' })}
                    className="w-8 h-8 rounded-full border border-cardborder bg-white hover:bg-surface flex items-center justify-center text-grey hover:text-text transition">
                    →
                  </button>
                </div>
              </div>
              {/* Horizontal scroll */}
              <div
                ref={el => { sectionScrollRefs.current[section.id] = el; }}
                className="flex gap-5 overflow-x-auto px-6 sm:px-8 pb-2"
                style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {cards.map(project => (
                  <Link key={project.slug} to={`/work/${project.slug}`}
                    className="group flex-shrink-0 w-72 flex flex-col rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all bg-white"
                    style={{ scrollSnapAlign: 'start' }}>
                    <div className={`h-36 relative bg-gradient-to-br ${getGradient(project.company)} overflow-hidden`}>
                      {getCoverSrc(project.slug, COVER_IMAGES[project.slug]) && (
                        <img
                          src={getCoverSrc(project.slug, COVER_IMAGES[project.slug])}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <span className="text-[11px] font-semibold text-white bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                          {project.company}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col flex-grow p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-[10px] font-bold uppercase tracking-label text-primary">{project.category}</div>
                        <span className="text-xs text-grey bg-surface px-2 py-0.5 rounded-full border border-cardborder">{project.year}</span>
                      </div>
                      <h3 className="font-heading font-semibold text-sm text-text group-hover:text-primary transition-colors leading-snug mb-2 line-clamp-3">{project.title}</h3>
                      <div className="mt-auto pt-3 border-t border-cardborder">
                        <span className="text-primary text-xs font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          View &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        });
      })()}

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
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
      </>)}
    </section>
  );
};
