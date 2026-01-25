import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const stats = [
  { value: 150, suffix: '+', label: 'Projects Launched' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 12, suffix: '', label: 'Years of Excellence' },
  { value: 45, suffix: 'M+', label: 'Users Reached' },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Concentric Rings Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-primary/5"
            style={{
              width: i * 200,
              height: i * 200,
              left: -(i * 100),
              top: -(i * 100),
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: i * 0.1 }}
          />
        ))}
      </div>

      <div ref={containerRef} className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20 mb-6">
              Why Choose Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Navigating the{' '}
              <span className="text-gradient-cosmic">Digital Frontier</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We are a collective of strategists, designers, and engineers united by 
              a singular mission: to craft digital experiences that transcend the ordinary.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our approach combines deep technical expertise with creative vision, 
              ensuring every project we undertake becomes a benchmark in its industry. 
              We don't just build products—we launch movements.
            </p>
            <motion.button
              className="glow-button bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Our Story
            </motion.button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="glass-card rounded-2xl p-8 text-center group hover:border-primary/30 transition-colors"
              >
                <div className="font-display text-4xl md:text-5xl font-bold text-gradient-cosmic mb-2">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
