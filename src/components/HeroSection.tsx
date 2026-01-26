import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import OrbitalRings from './OrbitalRings';
import Planet from './Planet';

interface HeroSectionProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

const HeroSection = ({ mouseX, mouseY }: HeroSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth spring animations for scroll - softer physics for less jitter
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.5 });
  


  // Scroll-based parallax and effects



  const textVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.4,
        delay: 0.6 + i * 0.25,
        ease: [0.16, 1, 0.3, 1], // More dramatic easing
      },
    }),
  };



  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center"
    >

      {/* Deep space radial gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 60% 50%, hsla(199, 89%, 48%, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 70% 60%, hsla(263, 70%, 50%, 0.08) 0%, transparent 40%)
          `,
          willChange: 'transform', // Hardware acceleration hint
        }}
      />
      
      {/* Orbital Rings - pass mouse motion values for parallax */}
      <OrbitalRings mouseX={mouseX} mouseY={mouseY} />

      {/* Planet - Celestial Sphere */}
      <Planet 
        scrollProgress={smoothProgress}
        mouseX={mouseX}
        mouseY={mouseY}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32">
        <div className="max-w-3xl">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <motion.span 
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6"
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px hsla(199, 89%, 48%, 0.3)' }}
            >
              Digital Experience Agency
            </motion.span>
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6"
          >
            <motion.span 
              className="block text-foreground"
              custom={1}
              variants={textVariants}
            >
              We Build
            </motion.span>
            <motion.span 
              className="block text-gradient-cosmic"
              custom={2}
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              Digital Universes
            </motion.span>
          </motion.h1>

          <motion.p
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed"
          >
            Crafting immersive digital experiences that transcend expectations. 
            We transform bold visions into orbital realities.
          </motion.p>

          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              className="glow-button bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => {
                // Could trigger nearby animation effects
              }}
            >
              <span className="relative z-10">Start Your Journey</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary via-star-glow to-primary"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
            <motion.button
              className="px-8 py-4 rounded-xl font-semibold text-lg border border-border text-foreground hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
              whileHover={{ scale: 1.02, backgroundColor: 'hsla(217, 33%, 17%, 0.5)' }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Our Work
            </motion.button>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
