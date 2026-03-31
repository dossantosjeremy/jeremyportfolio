import React from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  text: string;
  name?: string;
  role: string;
}

const testimonials: Testimonial[] = [
  // ── Freelance (client names kept) ─────────────────────────────────────────
  {
    text: "Working with Jeremy has been nothing short of transformative. His exceptional ability to identify systemic inefficiencies and implement strategic automation solutions has revolutionised our entire client management process. Rather than simply applying techniques, he approaches each challenge as a systems thinker — seeing the interconnected nature of our workflows and designing holistic solutions that address root causes rather than symptoms.",
    name: 'David C.',
    role: 'Director · Architect Business Ops',
  },
  {
    text: "Very professional: not only attentive throughout the duration of the contract, but also quick to resolve any issues that arise. Excellent skills and high-quality work. Highly recommended.",
    role: 'Upwork Client',
  },

  // ── HP ─────────────────────────────────────────────────────────────────────
  {
    text: "Although Jeremy has only been with the company for seven months, he has been well integrated within the team and become a key member to lead and gather qualitative data to provide data-driving UX decision support. Jeremy was able to successfully lead and execute multiple research studies simultaneously, using a successful 'team pairing' approach to mitigate bias.",
    role: 'Manager, Customer Shopping Insights · HP',
  },
  {
    text: "Jeremy is proactive and willing to help foster a growing culture of teamwork. His knowledge in the statistical field and his 'intrepreneurial' mindset will be one of the keys to taking the Customer Shopping Insights team to the next level.",
    role: 'Manager, Customer Shopping Insights · HP',
  },
  {
    text: "Feedback from colleagues has noted that Jeremy consistently displays a collaborative spirit by offering assistance and seeking clarification when necessary. Furthermore, his presentations are remarkably clear and understandable.",
    role: 'Manager, Customer Shopping Insights · HP',
  },

  // ── Oracle — Manager ───────────────────────────────────────────────────────
  {
    text: "Jeremy went above and beyond to mentor 3 researchers. His mentoring has been appreciated by both the mentee and other XD leaders. Good work!",
    role: 'Manager, UX Research · Oracle NetSuite',
  },
  {
    text: "Jeremy is well liked and regularly received value awards from peers and others. He is respected by peers across research and design for his approach to collaboration, quality, and problem-solving skills.",
    role: 'Manager, UX Research · Oracle NetSuite',
  },
  {
    text: "Jeremy had a productive year not only in terms of the number of projects but by increasing impact — contributing to multiple areas, driving research strategy and planning, and coaching junior researchers. Overall, Jeremy exceeded expectations and went over and above the goals set for the year.",
    role: 'Manager, UX Research · Oracle NetSuite',
  },
  {
    text: "Jeremy contributed to the Empathy at Scale initiative by co-leading the Virtual Visit pillar. His contributions — strategy, resources, process — enabled the org to launch virtual visits within 2 months of inception. Jeremy brought excellent ideas along with strong execution.",
    role: 'Manager, UX Research · Oracle NetSuite',
  },
  {
    text: "Jeremy established himself as a leader in the UXR community with his contributions to the practice this year. Many XRs see him as a thought leader and mentor. He is seen as a partner and leader by design and PM leaders — skilled at bringing people together and facilitating conversations.",
    role: 'Manager, UX Research · Oracle NetSuite',
  },
  {
    text: "Jeremy consistently performs above the target proficiency level. He demonstrates attention to detail; his work is always high quality as demonstrated by requests to share his work with others. When Jeremy is given an assignment, you can be assured it will make progress and get done even if there are obstacles.",
    role: 'Manager, UX Research · Oracle NetSuite',
  },

  // ── Oracle — Colleagues ────────────────────────────────────────────────────
  {
    text: "Jeremy's skills in precision and attention to detail are notable, particularly in creating well-structured presentation slides for various projects. His problem-solving abilities and proactive nature were key in creating training materials for virtual customer interactions.",
    role: 'Colleague · Oracle NetSuite',
  },
  {
    text: "Jeremy's creativity and enthusiasm were showcased in his AI Feedback Tool proposal. His vision inspired a diverse team to create a successful demo.",
    role: 'Colleague · Oracle NetSuite',
  },
  {
    text: "Jeremy excels in cross-collaborative efforts, motivating colleagues across different time zones and ensuring an inclusive environment where every team member's input is valued.",
    role: 'Colleague · Oracle NetSuite',
  },
  {
    text: "Jeremy has a set of both soft and hard skills that make him excel at his job: very well organised, very proactive and vocal when advocating for user research, great communication skills, excellent at conducting interviews, and diligent in collating and sharing results.",
    role: 'Colleague · Oracle NetSuite',
  },
  {
    text: "While being serious about the work he also manages to keep a light and fun tone in our collaborations. As a result we are able to have very open conversations and produce better results for the team. It's always a pleasure working with him.",
    role: 'Colleague · Oracle NetSuite',
  },
  {
    text: "I think Jeremy's been instrumental in bringing more research to our group and doing it earlier in the process. This is the first time I witnessed user testing on a design that wasn't already in code. This will make the team better aligned with the rest of the company and improve the quality of the solutions we deliver.",
    role: 'Colleague · Oracle NetSuite',
  },
  {
    text: "Jeremy is a highly talented and proactive principal researcher who consistently pushes the research agenda forward. He's decisive, thoughtful, and brings clarity and energy to every research project I've seen him lead.",
    role: 'Colleague · Oracle NetSuite',
  },
  {
    text: "Jeremy is a natural leader. He has the rare ability to guide and influence without you even knowing that you are led — his humanistic, empathetic style creates a space where people feel heard and motivated. He inspires excellence through trust and example, never judging, always encouraging you.",
    role: 'Colleague · Oracle NetSuite',
  },
  {
    text: "Working with Jeremy is always inspiring — he has a way of elevating those around him, and I've grown as a researcher through our interactions.",
    role: 'Colleague · Oracle NetSuite',
  },
  {
    text: "Jeremy excels at bringing together stakeholders to strive for clarity and inclusivity when defining research goals.",
    role: 'Colleague · Oracle NetSuite',
  },
  {
    text: "Jeremy has demonstrated resilience in steering UX research through challenging and rapidly evolving circumstances. His ability to navigate shifting priorities and many different points of view with patience has been very instrumental in maintaining momentum with our research goals.",
    role: 'Colleague · Oracle NetSuite',
  },
  {
    text: "Jeremy takes initiative to bring people together when alignment isn't where it should be and isn't afraid to press issues until he feels the goals of our research initiatives are in alignment with prioritised business goals.",
    role: 'Colleague · Oracle NetSuite',
  },
  {
    text: "Jeremy joined last year and ramped up very quickly to serve as a research lead. He created a clear roadmap of activities to be completed and continuously kept in touch with other leadership to determine priorities.",
    role: 'Colleague · Oracle NetSuite',
  },
  {
    text: "Jeremy is just a great person and easy to collaborate with. He is always listening and open to new suggestions and ideas. He definitely brings positive energy and fun into our team and uplifts others.",
    role: 'Colleague · Oracle NetSuite',
  },
  {
    text: "Jeremy was invaluable throughout the Hackathon process. His ability to unite the team with positivity and a drive to accomplish something we can all be proud of in such a short time.",
    role: 'Colleague · Oracle NetSuite',
  },
  {
    text: "Working with Jeremy on Empathy at Scale for Virtual Customer Visits has been such a positive experience. He brings his ability to improve the process into each meeting while building this new form of research — always finding a balance between external customers and internal employees.",
    role: 'Colleague · Oracle NetSuite',
  },
  {
    text: "Jeremy brings strong research execution skills to the table. He has a solid understanding of how to structure and carry out effective research studies. His contributions have been instrumental in shaping the direction and quality of our research efforts.",
    role: 'Colleague · Oracle NetSuite',
  },
  {
    text: "Jeremy is a very empathetic and approachable individual. He demonstrates strong listening skills and consistently maintains a professional and respectful approach to his work. These qualities naturally foster a positive feeling and inspire people working with him.",
    role: 'Colleague · Oracle NetSuite',
  },
  {
    text: "Jeremy leads by example through his thoughtful approach to research. His calm, confident presence in user sessions creates a safe space for open dialogue, which inspires trust from both users and team members.",
    role: 'Colleague · Oracle NetSuite',
  },
  {
    text: "His guidance to junior researchers throughout the process has been incredibly valuable — not just for their growth, but for the team's overall efficiency and alignment. Jeremy's thoughtful mentorship and collaborative approach make him an integral part of our success.",
    role: 'Colleague · Oracle NetSuite',
  },
  {
    text: "I see Jeremy as a very dedicated team member who is always available when you need him, willing to give you his thoughts on whatever you ask. He is candid but warm and has no ego when it comes to working as a team.",
    role: 'Colleague · Oracle NetSuite',
  },
  {
    text: "Jeremy is very curious and not scared of asking what we usually think are 'dumb questions'. He just steps in and asks. I truly believe his presence was helpful and enriching for UX to have a bigger voice with PMs.",
    role: 'Colleague · Oracle NetSuite',
  },
  {
    text: "During this year working with him, I can say I trust him and I know things will get done when he's around. He has become a key player in the initiatives he works on and a reliable figure within the team.",
    role: 'Colleague · Oracle NetSuite',
  },
  {
    text: "He can get an awful lot of work done well, in a really big hurry without compromising the quality of that work.",
    role: 'Colleague · Oracle NetSuite',
  },
  {
    text: "Jeremy really inspired me working through these projects. Instead of dwelling on the organisational churn occurring within the organisation at that time, he jumped in with both feet. I've learned so much from him and got a lovely reminder that I'm not the only one passionate about end users and research that matters.",
    role: 'Colleague · Oracle NetSuite',
  },
  {
    text: "I feel I won an unexpected bonus this year working with Jeremy. His energy and thoughtful approach to his work and other people was uplifting. The heavy work load felt lighter for it. He is exceptionally considerate to boot.",
    role: 'Colleague · Oracle NetSuite',
  },

  // ── Glovo ──────────────────────────────────────────────────────────────────
  {
    text: "Continue performing this top quality, while having fun and making everyone's job better. A real pleasure working with Jérémy.",
    role: 'A colleague at Glovo',
  },
  {
    text: "Jeremy always goes for the extra mile in collaboration. Easily reachable and really good at collecting information related to even complicated projects. Opened to any kind of feedback and tries to improve immediately. Eager to learn.",
    role: 'A colleague at Glovo',
  },
  {
    text: "Jeremy was an example for me regarding synthesis and analysis. I was impressed by how thorough and efficient he was in the process, by uncovering insights and asking relevant questions. He also exposed me to interesting ways of developing artefacts like user personas that contributed to a high standard in the project.",
    role: 'A colleague at Glovo',
  },
  {
    text: "He's always prepared and delivers on the timelines, sometimes more than expected.",
    role: 'A colleague at Glovo',
  },
  {
    text: "Jeremy is very friendly and in both of the projects we worked on together, super collaborative. I have seen him stay very patient and understanding when stakeholders put him under pressure. This is something I admire and value in a colleague.",
    role: 'A colleague at Glovo',
  },
  {
    text: "Jéremy is constantly improving the way we work — coming very well prepared to meetings with documents where he compiled all points of view of stakeholders. He really cares about the quality of UXR and is ultra-fast to deliver value on time.",
    role: 'A colleague at Glovo',
  },
  {
    text: "Jeremy is always considering his colleagues and inviting them to share their POV. His participation is always well considered in all team meetings, where his colleagues value his good vibes and the way he makes them feel.",
    role: 'A colleague at Glovo',
  },
];

// Distribute evenly across three columns
const col1 = testimonials.filter((_, i) => i % 3 === 0);
const col2 = testimonials.filter((_, i) => i % 3 === 1);
const col3 = testimonials.filter((_, i) => i % 3 === 2);

const TestimonialsColumn = ({
  testimonials,
  duration = 55,
  className,
}: {
  testimonials: Testimonial[];
  duration?: number;
  className?: string;
}) => (
  <div className={className}>
    <motion.ul
      animate={{ translateY: '-50%' }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
        repeatType: 'loop',
      }}
      className="flex flex-col gap-5 pb-5 list-none m-0 p-0"
    >
      {[0, 1].map(idx => (
        <React.Fragment key={idx}>
          {testimonials.map(({ text, name, role }, i) => (
            <li
              key={`${idx}-${i}`}
              aria-hidden={idx === 1 ? 'true' : 'false'}
              className="p-7 rounded-2xl border border-cardborder shadow-sm bg-white max-w-xs w-full"
            >
              <blockquote className="m-0 p-0">
                <p className="text-grey leading-relaxed text-sm m-0">"{text}"</p>
                <footer className="mt-5">
                  {name && (
                    <cite className="font-semibold not-italic text-text text-sm block leading-snug">
                      {name}
                    </cite>
                  )}
                  <span className="text-xs text-grey/70 tracking-wide mt-0.5 block">
                    {role}
                  </span>
                </footer>
              </blockquote>
            </li>
          ))}
        </React.Fragment>
      ))}
    </motion.ul>
  </div>
);

export const TestimonialsColumns = () => (
  <section className="py-24 bg-surface overflow-hidden">
    <div className="max-w-7xl mx-auto px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14"
      >
        <div className="text-primary text-[11px] font-medium uppercase tracking-label mb-3">
          What people say
        </div>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-text">
          Trusted by teams.<br />Valued by colleagues.
        </h2>
      </motion.div>

      <div
        className="flex justify-start gap-5 [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)] max-h-[700px] overflow-hidden"
        aria-label="Scrolling testimonials"
        role="region"
      >
        <TestimonialsColumn testimonials={col1} duration={120} />
        <TestimonialsColumn testimonials={col2} duration={150} className="hidden md:block" />
        <TestimonialsColumn testimonials={col3} duration={135} className="hidden lg:block" />
      </div>
    </div>
  </section>
);
