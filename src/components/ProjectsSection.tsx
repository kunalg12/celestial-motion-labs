import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Stellar Finance',
    category: 'Fintech Platform',
    description: 'A revolutionary banking experience for the modern era',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format',
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    id: 2,
    title: 'NeoVerse',
    category: 'Metaverse Experience',
    description: 'Immersive virtual worlds for enterprise collaboration',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format',
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    id: 3,
    title: 'Quantum Labs',
    category: 'AI Research',
    description: 'Next-generation AI tools for scientific discovery',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format',
    color: 'from-emerald-500/20 to-teal-500/20',
  },
];

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="work" className="relative py-32 overflow-hidden">
      <div ref={containerRef} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
              Featured Work
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
              Stellar <span className="text-gradient-cosmic">Projects</span>
            </h2>
          </div>
          <motion.button
            className="mt-6 md:mt-0 text-primary flex items-center gap-2 hover:gap-3 transition-all font-medium"
            whileHover={{ x: 4 }}
          >
            View All Projects <ArrowUpRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className={`group relative rounded-3xl overflow-hidden ${
                index === 0 ? 'lg:col-span-2 aspect-[2/1]' : 'aspect-[4/3]'
              }`}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-60`} />
                <div className="absolute inset-0 bg-gradient-to-t from-cosmic-deep via-cosmic-deep/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-8 md:p-10">
                <motion.div
                  initial={false}
                  animate={{ y: hoveredId === project.id ? -10 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-sm text-primary font-medium mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    {project.description}
                  </p>
                </motion.div>

                {/* Hover Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: hoveredId === project.id ? 1 : 0,
                    y: hoveredId === project.id ? 0 : 20,
                  }}
                  transition={{ duration: 0.3 }}
                  className="mt-6"
                >
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium">
                    View Case Study <ArrowUpRight className="w-4 h-4" />
                  </button>
                </motion.div>
              </div>

              {/* Corner Decoration */}
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                <ArrowUpRight className="w-5 h-5 text-foreground/60 group-hover:text-primary transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
