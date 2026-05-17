import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { fetchProjects, Project } from '@/data/projects';

const FILTERS = ['All', 'Web', 'Branding', 'SaaS'] as const;
type Filter = typeof FILTERS[number];

const TAG_MAP: Record<number, string[]> = {
  1: ['Next.js', 'Tailwind', 'Web'],
  2: ['React', 'Figma', 'Branding'],
  3: ['Next.js', 'Supabase', 'SaaS'],
};

const matchFilter = (p: Project, f: Filter) => {
  if (f === 'All') return true;
  return (TAG_MAP[p.id] || []).includes(f);
};

const ProjectsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<Filter>('All');

  useEffect(() => { fetchProjects().then(setProjects); }, []);

  const visible = useMemo(() => projects.filter((p) => matchFilter(p, filter)), [projects, filter]);

  return (
    <section id="work" className="relative py-28 md:py-36">
      <div ref={ref} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12"
        >
          <div className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-violet">— Selected Work</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
              Recent <span className="text-gradient-brand">Projects</span>
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
            {FILTERS.map((f) => {
              const active = f === filter;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="relative px-4 py-2 text-sm rounded-full font-medium transition-colors"
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full gradient-brand"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className={`relative z-10 ${active ? 'text-white' : 'text-muted-foreground hover:text-foreground'}`}>
                    {f}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="space-y-20 md:space-y-28">
          {visible.map((p, i) => {
            const flip = i % 2 === 1;
            const tags = TAG_MAP[p.id] || [];
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}
              >
                {/* Image */}
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative rounded-3xl overflow-hidden border border-white/[0.08] aspect-[16/10] bg-card"
                >
                  <motion.img
                    src={p.image}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-background/70 via-transparent to-transparent" />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: 'inset 0 0 80px rgba(124,58,237,0.35)' }}
                  />
                </a>

                {/* Text */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {tags.map((t) => (
                      <span key={t} className="font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">{p.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6 max-w-lg">{p.description}</p>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-brand-violet font-medium group/link"
                  >
                    <span className="relative">
                      View Project
                      <span className="absolute -bottom-1 left-0 h-px w-0 group-hover/link:w-full transition-all duration-300 gradient-brand" />
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
