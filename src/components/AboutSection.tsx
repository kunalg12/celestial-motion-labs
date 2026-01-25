import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const stats = [
  { value: 150, suffix: '+', label: 'Projects Launched' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 12, suffix: '', label: 'Years of Excellence' },
  { value: 45, suffix: 'M+', label: 'Users Reached' },
];

const Counter = ({ target, suffix, isInView }: { target: number; suffix: string; isInView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2500;
    const steps = 80;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Easing function for smoother animation
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      current = target * eased;
      
      if (step >= steps) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const textVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: 0.2 + i * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Concentric Rings Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i * 200,
              height: i * 200,
              left: -(i * 100),
              top: -(i * 100),
              border: `1px solid hsla(199, 89%, 48%, ${0.08 - i * 0.012})`,
            }}
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            animate={isInView ? { 
              opacity: 1, 
              scale: 1,
              rotate: i % 2 === 0 ? 360 : -360,
            } : {}}
            transition={{ 
              opacity: { duration: 1, delay: i * 0.1 },
              scale: { duration: 1, delay: i * 0.1 },
              rotate: { duration: 150 + i * 30, repeat: Infinity, ease: 'linear' },
            }}
          />
        ))}
      </div>

      <div ref={containerRef} className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <motion.span 
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20 mb-6"
              custom={0}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={textVariants}
            >
              Why Choose Us
            </motion.span>
            <motion.h2 
              className="font-display text-4xl md:text-5xl font-bold mb-6"
              custom={1}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={textVariants}
            >
              Navigating the{' '}
              <span className="text-gradient-cosmic">Digital Frontier</span>
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground mb-6 leading-relaxed"
              custom={2}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={textVariants}
            >
              We are a collective of strategists, designers, and engineers united by 
              a singular mission: to craft digital experiences that transcend the ordinary.
            </motion.p>
            <motion.p 
              className="text-muted-foreground leading-relaxed mb-8"
              custom={3}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={textVariants}
            >
              Our approach combines deep technical expertise with creative vision, 
              ensuring every project we undertake becomes a benchmark in its industry. 
              We don't just build products—we launch movements.
            </motion.p>
            <motion.button
              className="glow-button bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold relative overflow-hidden group"
              custom={4}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={textVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Our Story</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary via-star-glow to-primary"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.4 + index * 0.12,
                  type: 'spring',
                  stiffness: 100,
                }}
                whileHover={{ 
                  y: -8, 
                  transition: { duration: 0.3 } 
                }}
                className="rounded-2xl p-8 text-center group cursor-default relative overflow-hidden"
                style={{
                  background: 'hsla(224, 71%, 6%, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid hsla(217, 33%, 20%, 0.3)',
                }}
              >
                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, hsla(199, 89%, 48%, 0.1) 0%, transparent 70%)',
                  }}
                />
                
                <div className="font-display text-4xl md:text-5xl font-bold text-gradient-cosmic mb-2 relative">
                  <Counter target={stat.value} suffix={stat.suffix} isInView={isInView} />
                </div>
                <div className="text-sm text-muted-foreground relative">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
