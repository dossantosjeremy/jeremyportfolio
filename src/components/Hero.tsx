import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Lightbulb, Briefcase, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { AuroraBackground } from './ui/aurora-background';
import { ProcessFlow } from './ui/process-flow';
import { E } from './ui/E';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !cardRef.current) return;

      const scrollY = window.scrollY;
      const maxScroll = 400;
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      const isMobile = window.innerWidth <= 768;

      const rotateX = 20 - (progress * 20);
      const startScale = isMobile ? 0.9 : 1.05;
      const endScale = 1;
      const scale = startScale + (progress * (endScale - startScale));

      cardRef.current.style.transform = `rotateX(${rotateX}deg) scale(${scale})`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <>
    <AuroraBackground className="relative min-h-[90vh] flex items-center pt-[100px] pb-20 overflow-hidden isolate">
      <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          <div className="lg:col-span-7 flex flex-col items-start text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface text-grey text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse"></span>
            <E k="hero.badge">Available for new projects · Barcelona, Spain</E>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-[64px] font-heading font-bold text-text mb-6 tracking-tight leading-[1.1]">
            I help product teams <br className="hidden lg:block" />
            <span className="inline-flex flex-col h-[1.1em] overflow-hidden align-top text-primary">
              <ul className="block animate-text-slide text-left leading-[1.1] m-0 p-0 list-none">
                <li className="h-[1.1em]">eliminate guesswork.</li>
                <li className="h-[1.1em]">automate the repetitive.</li>
                <li className="h-[1.1em]">make better decisions faster.</li>
                <li className="h-[1.1em]" aria-hidden="true">eliminate guesswork.</li>
              </ul>
            </span>
          </h1>

          <p className="text-xl text-grey leading-relaxed mb-10 max-w-2xl">
            <E k="hero.subtitle">9 years of UX research, product design, and AI automation — across automotive, delivery, and eCommerce. Now available to your team without the overhead.</E>
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full sm:w-auto">
            <a href="mailto:jeremyguillaumedossantos@gmail.com" className="w-full sm:w-auto text-center bg-primary text-white px-8 py-4 rounded-btn font-medium hover:bg-blue-700 transition-colors shadow-sm text-lg">
              <E k="hero.cta1">Book a Discovery Call</E>
            </a>
            <Link to="/work" className="w-full sm:w-auto text-center bg-transparent border border-cardborder text-text px-8 py-4 rounded-btn font-medium hover:bg-surface transition-colors text-lg">
              <E k="hero.cta2">See My Work</E>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 w-full flex flex-col gap-6 relative items-center justify-center">
          <ProcessFlow />
        </div>
      </div>
      </div>
    </AuroraBackground>

    {/* Scrolling Ribbon Moved Below Hero */}
    <div className="w-full overflow-hidden bg-zinc-900 border-y border-zinc-800 py-4">
      <div className="animate-marquee flex gap-4 py-2" style={{ animationDuration: '25s' }}>
        {[1, 2, 3, 4].map((i) => (
          <React.Fragment key={i}>
            <div className="flex items-center gap-3 bg-zinc-800/80 border border-zinc-700/50 rounded-xl p-3 md:p-4 shrink-0">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-white font-semibold text-xs md:text-sm">Upwork Top Rated Plus</div>
                <div className="text-zinc-400 text-[10px] md:text-xs">Top 3% of Freelancers</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-zinc-800/80 border border-zinc-700/50 rounded-xl p-3 md:p-4 shrink-0">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div>
                <div className="text-white font-semibold text-xs md:text-sm">Published Patent</div>
                <div className="text-zinc-400 text-[10px] md:text-xs">Co-Inventor</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-zinc-800/80 border border-zinc-700/50 rounded-xl p-3 md:p-4 shrink-0">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400">
                <span className="text-xs">⭐</span>
              </div>
              <div>
                <div className="text-white font-semibold text-xs md:text-sm">100% Job Success</div>
                <div className="text-zinc-400 text-[10px] md:text-xs">Consistent Delivery</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-zinc-800/80 border border-zinc-700/50 rounded-xl p-3 md:p-4 shrink-0">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <div className="text-white font-semibold text-xs md:text-sm">50+ Projects Delivered</div>
                <div className="text-zinc-400 text-[10px] md:text-xs">Across 5 Industries</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-zinc-800/80 border border-zinc-700/50 rounded-xl p-3 md:p-4 shrink-0">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <div className="text-white font-semibold text-xs md:text-sm">Trusted in 🇫🇷 🇩🇪 🇪🇸 🇬🇧 🇵🇹</div>
                <div className="text-zinc-400 text-[10px] md:text-xs">4 Languages · 9 Years</div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
    </>
  );
};
