import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

const stats: Stat[] = [
  { value: 150, suffix: '+', label: 'Projects Launched', prefix: '' },
  { value: 98, suffix: '%', label: 'Client Satisfaction', prefix: '' },
  { value: 50, suffix: '+', label: 'Global Clients', prefix: '' },
  { value: 5, suffix: 'x', label: 'Avg. ROI Increase', prefix: '' },
];

const AnimatedCounter = ({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) => {
  const count = useSpring(0, { stiffness: 50, damping: 30 });
  const display = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    if (inView) {
      count.set(value);
    }
  }, [inView, value, count]);

  return (
    <div className="flex items-baseline justify-center">
      <motion.span className="font-display text-5xl md:text-6xl font-bold text-foreground">
        {display}
      </motion.span>
      <span className="font-display text-3xl md:text-4xl font-bold text-primary ml-1">
        {suffix}
      </span>
    </div>
  );
};

const StatsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const statVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.9,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="relative py-20">
      {/* Background orbital decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div 
          className="w-[600px] h-[600px] rounded-full border border-accent/5"
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div ref={containerRef} className="container mx-auto px-6 relative">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={statVariants}
              className="glass-card group relative rounded-2xl p-6 md:p-8 text-center overflow-hidden"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Hover glow */}
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

              {/* Orbiting dot */}
              <motion.div
                className="absolute w-1.5 h-1.5 rounded-full bg-primary top-4 left-1/2"
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: 'linear',
                  delay: index * 0.5,
                }}
                style={{
                  marginLeft: '-3px',
                  transformOrigin: '3px 30px',
                  boxShadow: '0 0 6px hsla(199, 89%, 48%, 0.6)',
                }}
              />

              <div className="relative">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={isInView} />
                <p className="text-muted-foreground mt-3 text-sm md:text-base font-medium">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
