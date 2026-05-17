import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Palette, Sparkles, Boxes, Search, Wand2, ArrowRight } from 'lucide-react';

const services = [
  { icon: Code2,    title: 'Web Design & Development', desc: 'High-performance marketing sites and web apps built with React, Next.js, and Tailwind.' },
  { icon: Palette,  title: 'UI/UX Design & Prototyping', desc: 'Research-driven product design and pixel-perfect prototypes that ship to production.' },
  { icon: Sparkles, title: 'Brand Identity & Strategy', desc: 'Distinct visual systems and brand foundations that resonate and scale across surfaces.' },
  { icon: Boxes,    title: 'SaaS & Product Engineering', desc: 'Full-stack product builds with clean architecture, auth, payments, and integrations.' },
  { icon: Search,   title: 'SEO & Performance', desc: 'Technical SEO, Core Web Vitals tuning, and content systems that rank and convert.' },
  { icon: Wand2,    title: 'Motion & Animation Design', desc: 'Cinematic motion, micro-interactions, and 3D moments that bring interfaces to life.' },
];

const ServicesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="relative py-28 md:py-36">
      <div ref={ref} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-violet">— What We Do</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-5">
            Services Built for <span className="text-gradient-brand">Impact</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            End-to-end capabilities across design, engineering, and growth — delivered by a senior team that ships.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((s) => (
            <motion.article
              key={s.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group relative glass-card p-9 transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.25)]"
            >
              <div className="w-12 h-12 rounded-xl grid place-items-center mb-6 gradient-brand">
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3 text-foreground">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-5">{s.desc}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-violet group-hover:gap-2.5 transition-all">
                Learn More <ArrowRight className="w-4 h-4" />
              </span>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
