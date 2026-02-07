import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Rocket, Palette, Code2, Zap, Globe, Shield } from 'lucide-react';

const services = [
  {
    icon: Rocket,
    title: 'Mission Strategy',
    description: 'Charting the optimal course for your product\'s journey through the market cosmos.',
    orbitDelay: 0,
  },
  {
    icon: Palette,
    title: 'Stellar Identity',
    description: 'Forging distinctive visual systems that shine brightly in a crowded galaxy.',
    orbitDelay: 0.5,
  },
  {
    icon: Code2,
    title: 'Hyper-Scale Engineering',
    description: 'Building resilient, high-performance engines that power your digital infrastructure.',
    orbitDelay: 1,
  },
  {
    icon: Zap,
    title: 'Kinetic Experience',
    description: 'Infusing static interfaces with fluid, celestial motion physics.',
    orbitDelay: 1.5,
  },
  {
    icon: Globe,
    title: 'Orbital Platforms',
    description: 'Architecting mission-critical applications designed for infinite scalability.',
    orbitDelay: 2,
  },
  {
    icon: Shield,
    title: 'Velocity Marketing',
    description: 'Igniting afterburners to propel your brand to new market heights.',
    orbitDelay: 2.5,
  },
  {
    icon: Zap,
    title: 'Light-Speed MVP',
    description: 'Accelerating from zero to launch velocity in just 4 weeks with our sprint boosters.',
    orbitDelay: 3,
  },
  {
    icon: Globe,
    title: 'Universal Mobility',
    description: 'Deploying seamless experiences across every device in the user\'s universe.',
    orbitDelay: 3.5,
  },
];

const ServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      rotateX: 15,
      scale: 0.9,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section id="services" className="relative py-32">
      {/* Background orbital decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div 
          className="w-[800px] h-[800px] rounded-full border border-primary/5"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/3"
          animate={{ rotate: -360 }}
          transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      
      <div ref={containerRef} className="container mx-auto px-6 relative">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
          className="text-center mb-20"
        >
          <motion.span 
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our Services
          </motion.span>
          <motion.h2 
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Capabilities in <span className="text-gradient-cosmic">Orbit</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            A constellation of expertise designed to transform your digital presence
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ 
                y: -12, 
                transition: { duration: 0.3, ease: 'easeOut' } 
              }}
              className="glass-card group relative rounded-2xl p-8 cursor-pointer overflow-hidden"
            >
              {/* Hover glow background */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, hsla(199, 89%, 48%, 0.08) 0%, transparent 70%)',
                }}
              />
              
              {/* Animated border on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  border: '1px solid hsla(199, 89%, 48%, 0.3)',
                }}
              />

              <motion.div
                className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{
                  background: 'linear-gradient(135deg, hsla(199, 89%, 48%, 0.1), hsla(263, 70%, 50%, 0.05))',
                }}
                whileHover={{ rotate: 5, scale: 1.05 }}
              >
                <service.icon className="w-7 h-7 text-primary" />
                
                {/* Orbiting dot */}
                <motion.div
                  className="absolute w-1.5 h-1.5 rounded-full bg-primary"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: 'linear',
                    delay: service.orbitDelay,
                  }}
                  style={{
                    top: 'calc(50% - 20px)',
                    left: '50%',
                    marginLeft: '-3px',
                    transformOrigin: '50% 20px',
                    boxShadow: '0 0 6px hsla(199, 89%, 48%, 0.6)',
                  }}
                />
              </motion.div>
              
              <h3 className="font-display text-xl font-semibold mb-3 text-foreground relative">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed relative">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
