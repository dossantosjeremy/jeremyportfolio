import React from 'react';
import { GlowCard } from './GlowCard';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Jérémy completely transformed how we handle courier support. The automation system saved us countless hours and the research insights were immediately actionable.",
    author: "Operations Lead",
    role: "Glovo",
  },
  {
    quote: "The research insights were incredibly clear and immediately actionable. He didn't just hand over a report; he gave us a roadmap. Best investment we made this year.",
    author: "Product Manager",
    role: "HP",
  },
  {
    quote: "Jérémy brings a rare combination of deep empathy for the user and a highly structured, analytical mind. He elevated our entire product team's approach to research.",
    author: "Design Lead",
    role: "Glovo",
  }
];

export const Testimonials = () => (
  <section className="py-32 bg-white">
    <div className="max-w-7xl mx-auto px-8">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-text mb-4">
          What Clients Say
        </h2>
        <div className="w-16 h-1 bg-primary"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <GlowCard key={idx} className="flex flex-col h-full">
            <Quote className="w-10 h-10 text-primary/20 mb-6" />
            <p className="text-lg text-text leading-relaxed mb-8 flex-grow italic">
              "{t.quote}"
            </p>
            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-cardborder">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-sm">
                {t.author.charAt(0)}
              </div>
              <div>
                <h4 className="font-heading font-bold text-text">{t.author}</h4>
                <p className="text-xs text-grey uppercase tracking-label font-bold">{t.role}</p>
              </div>
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  </section>
);
