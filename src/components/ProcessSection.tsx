import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, Compass, Palette, Code, Rocket } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Discovery',
    description: 'We dive deep into your brand, goals, and audience to uncover the insights that will drive your success.',
    color: 'from-blue-500/20 to-cyan-500/20',
    glow: 'hsla(199, 89%, 48%, 0.5)',
    border: 'hsla(199, 89%, 48%, 0.3)'
  },
  {
    icon: Compass,
    title: 'Strategy',
    description: 'Charting a precise course through the digital cosmos, aligned with your business objectives.',
    color: 'from-indigo-500/20 to-purple-500/20',
    glow: 'hsla(263, 70%, 50%, 0.5)',
    border: 'hsla(263, 70%, 50%, 0.3)'
  },
  {
    icon: Palette,
    title: 'Design',
    description: 'Crafting visual systems that are as beautiful as they are functional, with pixel-perfect attention to detail.',
    color: 'from-fuchsia-500/20 to-pink-500/20',
    glow: 'hsla(300, 76%, 72%, 0.5)',
    border: 'hsla(300, 76%, 72%, 0.3)'
  },
  {
    icon: Code,
    title: 'Development',
    description: 'Building robust, scalable engines using cutting-edge technologies for peak performance.',
    color: 'from-emerald-500/20 to-teal-500/20',
    glow: 'hsla(160, 84%, 39%, 0.5)',
    border: 'hsla(160, 84%, 39%, 0.3)'
  },
  {
    icon: Rocket,
    title: 'Launch',
    description: 'Igniting the boosters and releasing your product into the universe, ready for impact.',
    color: 'from-orange-500/20 to-red-500/20',
    glow: 'hsla(12, 76%, 61%, 0.5)',
    border: 'hsla(12, 76%, 61%, 0.3)'
  }
];

const ProcessSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  
  return (
    <section className="relative py-32 overflow-hidden">
      <div ref={containerRef} className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span 
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our Process
          </motion.span>
          <motion.h2 
            className="font-display text-4xl md:text-5xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            The <span className="text-gradient-cosmic">Launch Trajectory</span>
          </motion.h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting Line */}
          <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden md:block" />
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="relative flex flex-col md:flex-row gap-8 items-start group"
              >
                {/* Step Number/Icon */}
                <div className="relative z-10 shrink-0">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center glass-card relative overflow-hidden group-hover:scale-110 transition-transform duration-500"
                    style={{
                        borderColor: step.border,
                        boxShadow: `0 0 20px -5px ${step.glow}`
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-20`} />
                    <step.icon className="w-7 h-7 text-white relative z-10" />
                    
                    {/* Inner glow */}
                    <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            background: `radial-gradient(circle at center, ${step.glow} 0%, transparent 70%)`
                        }}
                    />
                  </div>
                  
                  {/* Connector Dot on Line */}
                  <div className="absolute top-8 left-16 w-8 h-px bg-primary/30 hidden md:block" />
                </div>

                {/* Content Card */}
                <div 
                    className="flex-1 glass-card p-8 rounded-3xl relative overflow-hidden group-hover:-translate-y-1 transition-transform duration-300"
                    style={{
                         borderColor: 'rgba(255,255,255,0.05)'
                    }}
                >
                    {/* Hover Gradient */}
                    <div 
                        className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} 
                    />
                    
                    <h3 className="font-display text-2xl font-bold mb-3 flex items-center gap-3">
                        <span className="text-muted-foreground/50 text-lg">0{index + 1}.</span>
                        {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                    </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
