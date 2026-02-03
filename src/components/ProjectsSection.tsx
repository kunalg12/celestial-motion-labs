import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { fetchProjects, Project } from '@/data/projects';

const ProjectSkeleton = ({ index }: { index: number }) => (
  <div 
    className={`relative rounded-3xl overflow-hidden bg-secondary/20 border border-white/5 ${
      index === 0 ? 'lg:col-span-2 aspect-[2/1]' : 'aspect-[4/3]'
    }`}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skeleton-shimmer" />
    
    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 space-y-4">
      <div className="h-4 w-32 bg-white/10 rounded animate-pulse" />
      <div className="h-8 w-2/3 bg-white/10 rounded animate-pulse" />
      <div className="h-16 w-full bg-white/10 rounded animate-pulse" />
      <div className="h-12 w-40 bg-white/10 rounded-xl animate-pulse mt-4" />
    </div>
  </div>
);

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      // Start fetching when the component mounts
      // We could also check `isInView` to fetch only when scrolled to, 
      // but fetching on mount ensures data is ready sooner.
      const data = await fetchProjects();
      setProjects(data);
      setIsLoading(false);
    };

    loadProjects();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 80,
      scale: 0.95,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
        duration: 1,
      },
    },
  };

  return (
    <section id="work" className="relative py-32">
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .skeleton-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
      <div ref={containerRef} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <motion.span 
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Featured Work
            </motion.span>
            <motion.h2 
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Stellar <span className="text-gradient-cosmic">Projects</span>
            </motion.h2>
          </div>
          <motion.button
            className="mt-6 md:mt-0 text-primary flex items-center gap-2 hover:gap-3 transition-all font-medium group"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ x: 4 }}
          >
            View All Projects 
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Projects Grid */}
        <div className="min-h-[600px]">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loader"
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[1, 2, 3].map((_, index) => (
                  <ProjectSkeleton key={index} index={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="grid"
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    variants={cardVariants}
                    className={`group relative rounded-3xl overflow-hidden ${
                      index === 0 ? 'lg:col-span-2 aspect-[2/1]' : 'aspect-[4/3]'
                    }`}
                    onMouseEnter={() => setHoveredId(project.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Background Decoration */}
                    <div className="absolute inset-0">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                        animate={{ 
                          scale: hoveredId === project.id ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-90 group-hover:opacity-80 transition-opacity duration-500`} />
                      
                      {/* Animated Light Streaks */}
                      <motion.div 
                        className="absolute -inset-[100%] opacity-30 mix-blend-overlay"
                        animate={{ 
                          rotate: [0, 90, 180, 270, 360],
                        }}
                        transition={{ 
                          duration: 20 + project.id * 5, 
                          repeat: Infinity, 
                          ease: 'linear' 
                        }}
                        style={{
                          background: `radial-gradient(circle at center, ${project.glow} 0%, transparent 70%)`,
                        }}
                      />
                    </div>

                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-cosmic-deep via-cosmic-deep/60 to-transparent"
                      animate={{ 
                        opacity: hoveredId === project.id ? 0.95 : 0.85,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Hover glow */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      animate={{
                        boxShadow: hoveredId === project.id 
                          ? 'inset 0 0 60px hsla(199, 89%, 48%, 0.1)' 
                          : 'inset 0 0 0 transparent',
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-end p-8 md:p-10">
                      <motion.div
                        animate={{ 
                          y: hoveredId === project.id ? -15 : 0,
                        }}
                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <motion.span 
                          className="text-sm text-primary font-medium mb-2 block"
                          animate={{
                            opacity: hoveredId === project.id ? 1 : 0.8,
                          }}
                        >
                          {project.category}
                        </motion.span>
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground max-w-md">
                          {project.description}
                        </p>
                      </motion.div>

                      {/* Hover Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ 
                          opacity: hoveredId === project.id ? 1 : 0,
                          y: hoveredId === project.id ? 0 : 30,
                        }}
                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="mt-6"
                      >
                        <motion.a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Visit Website <ArrowUpRight className="w-4 h-4" />
                        </motion.a>
                      </motion.div>
                    </div>

                    {/* Corner Decoration */}
                    <motion.div 
                      className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: 'hsla(224, 0%, 6%, 0.5)',
                        border: '1px solid hsla(217, 0%, 30%, 0.3)',
                      }}
                      animate={{
                        borderColor: hoveredId === project.id 
                          ? 'hsla(199, 89%, 48%, 0.5)' 
                          : 'hsla(217, 33%, 30%, 0.3)',
                        scale: hoveredId === project.id ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowUpRight className="w-5 h-5 text-foreground/60 group-hover:text-primary transition-colors" />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
  
export default ProjectsSection;
