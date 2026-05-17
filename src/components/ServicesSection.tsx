import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Palette, Sparkles, Boxes, Search, Wand2, ArrowUpRight } from 'lucide-react';
import SpotlightCard from '@/components/SpotlightCard';

const services = [
  { icon: Code2,    title: 'Web Design & Development', desc: 'High-performance marketing sites and web apps built with React, Next.js, and Tailwind.', span: 'md:col-span-2', accent: 'rgba(124,58,237,0.28)' },
  { icon: Palette,  title: 'UI / UX Design',           desc: 'Research-driven product design and pixel-perfect prototypes that ship to production.', span: '',               accent: 'rgba(6,182,212,0.25)' },
  { icon: Sparkles, title: 'Brand Identity',           desc: 'Distinct visual systems and brand foundations that resonate and scale across surfaces.', span: '',               accent: 'rgba(245,158,11,0.22)' },
  { icon: Boxes,    title: 'SaaS & Product Engineering', desc: 'Full-stack product builds with clean architecture, auth, payments, and integrations.', span: 'md:col-span-2', accent: 'rgba(37,99,235,0.28)' },
  { icon: Search,   title: 'SEO & Performance',        desc: 'Technical SEO, Core Web Vitals tuning, and content systems that rank and convert.', span: '',               accent: 'rgba(124,58,237,0.22)' },
  { icon: Wand2,    title: 'Motion & Animation',       desc: 'Cinematic motion, micro-interactions, and 3D moments that bring interfaces to life.', span: 'md:col-span-2', accent: 'rgba(6,182,212,0.25)' },
];

const ServicesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="relative py-28 md:py-36">
      <div ref={ref} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-violet">— What We Do</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground/60">/ 01</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em]">
              Services built for <span className="italic text-gradient-brand">impact.</span>
            </h2>
          </div>
          <p className="text-muted-foreground md:max-w-sm md:text-right">
            Senior team. End-to-end execution across design, engineering, and growth.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-fr"
        >
          {services.map((s, idx) => (
            <motion.div
              key={s.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
              className={s.span}
            >
              <SpotlightCard color={s.accent} className="h-full">
                <div className="p-8 md:p-10 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl grid place-items-center gradient-brand shadow-[0_8px_24px_-8px_rgba(124,58,237,0.6)]">
                      <s.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl md:text-[1.6rem] font-bold mb-3 tracking-[-0.02em]">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-8 flex-1">{s.desc}</p>

                  <div className="inline-flex items-center gap-2 text-sm font-medium text-foreground/90">
                    <span className="relative">
                      Learn more
                      <span className="absolute -bottom-1 left-0 h-px w-full bg-foreground/20 group-hover:bg-foreground transition-colors" />
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
