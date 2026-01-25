import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Rocket, Palette, Code2, Zap, Globe, Shield } from 'lucide-react';

const services = [
  {
    icon: Rocket,
    title: 'Product Strategy',
    description: 'Launch your vision with data-driven strategies that propel growth.',
  },
  {
    icon: Palette,
    title: 'Brand Design',
    description: 'Craft distinctive identities that resonate across the digital cosmos.',
  },
  {
    icon: Code2,
    title: 'Development',
    description: 'Engineer robust solutions with cutting-edge technology stacks.',
  },
  {
    icon: Zap,
    title: 'Motion Design',
    description: 'Breathe life into interfaces with captivating animations.',
  },
  {
    icon: Globe,
    title: 'Web Applications',
    description: 'Build scalable platforms that serve millions worldwide.',
  },
  {
    icon: Shield,
    title: 'Growth Marketing',
    description: 'Accelerate reach with performance-driven campaigns.',
  },
];

const ServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="services" className="relative py-32 overflow-hidden">
      {/* Background orbital decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-primary/5 animate-orbit-slow pointer-events-none" />
      
      <div ref={containerRef} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20 mb-6">
            Our Services
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Capabilities in <span className="text-gradient-cosmic">Orbit</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A constellation of expertise designed to transform your digital presence
          </p>
        </motion.div>

        {/* Orbital Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40, rotate: -2 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group glass-card rounded-2xl p-8 hover:border-primary/30 transition-all duration-500 cursor-pointer"
            >
              <motion.div
                className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors"
                whileHover={{ rotate: 10, scale: 1.05 }}
              >
                <service.icon className="w-7 h-7 text-primary" />
              </motion.div>
              <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, hsla(199, 89%, 48%, 0.05) 0%, transparent 70%)',
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
