import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import planetImage from '@/assets/planet-hero.jpg';
import OrbitalRings from './OrbitalRings';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const planetY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const planetScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const planetOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-radial-glow opacity-50" />
      
      {/* Orbital Rings */}
      <OrbitalRings centerX="65%" centerY="55%" scale={1.2} />

      {/* Planet */}
      <motion.div
        className="absolute right-[-10%] top-1/2 w-[70vw] max-w-[900px] aspect-square pointer-events-none"
        style={{ 
          y: planetY, 
          scale: planetScale,
          opacity: planetOpacity,
          translateY: '-40%',
        }}
      >
        <motion.img
          src={planetImage}
          alt="Planet"
          className="w-full h-full object-contain planet-glow"
          animate={{ rotate: 360 }}
          transition={{ duration: 200, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 py-32"
        style={{ y: textY }}
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
              Digital Experience Agency
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-6"
          >
            <span className="text-foreground">We Build</span>
            <br />
            <span className="text-gradient-cosmic">Digital Universes</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed"
          >
            Crafting immersive digital experiences that transcend expectations. 
            We transform bold visions into orbital realities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              className="glow-button bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Your Journey
            </motion.button>
            <motion.button
              className="px-8 py-4 rounded-xl font-semibold text-lg border border-border text-foreground hover:bg-secondary/50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Our Work
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
