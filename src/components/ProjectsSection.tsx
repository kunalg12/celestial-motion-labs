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

const matchFilter = (p: Project, f: Filter) => f === 'All' || (TAG_MAP[p.id] || []).includes(f);

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
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-violet">— Selected Work</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground/60">/ 02</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em]">
              Recent <span className="italic text-gradient-brand">projects.</span>
            </h2>
          </div>

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

        <div className="space-y-24 md:space-y-32">
          {visible.map((p, i) => {
            const flip = i % 2 === 1;
            const tags = TAG_MAP[p.id] || [];
            const index = String(i + 1).padStart(2, '0');
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}
              >
                {/* Image */}
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block rounded-[28px] overflow-hidden border border-white/[0.08] aspect-[16/10] bg-card"
                >
                  <motion.img
                    src={p.image}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />

                  {/* Corner index */}
                  <span className="absolute top-5 left-5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/80 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                    {index} / Project
                  </span>

                  {/* Visit pill */}
                  <span className="absolute bottom-5 right-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#0D0D1A] text-sm font-medium translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    Visit live <ArrowUpRight className="w-4 h-4" />
                  </span>

                  {/* Subtle inner glow on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: 'inset 0 0 100px rgba(124,58,237,0.35)' }}
                  />
                </a>

                {/* Text */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-violet">{p.category}</span>
                    <span className="h-px flex-1 bg-white/10" />
                  </div>

                  <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-5 tracking-[-0.025em]">
                    {p.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-7 max-w-lg">{p.description}</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {tags.map((t) => (
                      <span key={t} className="font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-foreground font-medium group/link"
                  >
                    <span className="relative pb-1">
                      View project
                      <span className="absolute -bottom-px left-0 h-px w-full bg-foreground/20" />
                      <span className="absolute -bottom-px left-0 h-px w-0 group-hover/link:w-full transition-all duration-500 gradient-brand" />
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
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
