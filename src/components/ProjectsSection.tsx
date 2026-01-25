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
    <section id="work" className="relative py-32 overflow-hidden">
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
        <motion.div 
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
              {/* Background Image */}
              <div className="absolute inset-0">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  animate={{ 
                    scale: hoveredId === project.id ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-60`} />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-cosmic-deep via-cosmic-deep/70 to-transparent"
                  animate={{ 
                    opacity: hoveredId === project.id ? 0.9 : 0.8,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>

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
                  <motion.button 
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Case Study <ArrowUpRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              </div>

              {/* Corner Decoration */}
              <motion.div 
                className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: 'hsla(224, 71%, 6%, 0.5)',
                  border: '1px solid hsla(217, 33%, 30%, 0.3)',
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
      </div>
    </section>
  );
};

export default ProjectsSection;
