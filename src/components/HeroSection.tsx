import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import planetImage from '@/assets/planet-hero.jpg';
import OrbitalRings from './OrbitalRings';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth spring animations for scroll
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const planetY = useTransform(smoothProgress, [0, 1], [0, 300]);
  const planetScale = useTransform(smoothProgress, [0, 1], [1, 0.7]);
  const planetOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0.2]);
  const planetRotation = useMotionValue(0);

  // Mouse parallax
  const mouseX = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Continuous planet rotation
  useEffect(() => {
    let startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      // Very slow rotation: 360 degrees per 5 minutes
      planetRotation.set((elapsed / 1000) * 1.2);
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [planetRotation]);

  const textVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.3 + i * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const planetParallaxX = useTransform(mouseX, [-1, 1], [-30, 30]);
  const planetParallaxY = useTransform(mouseY, [-1, 1], [-20, 20]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Deep space radial gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 60% 50%, hsla(199, 89%, 48%, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 70% 60%, hsla(263, 70%, 50%, 0.05) 0%, transparent 40%)
          `,
        }}
      />
      
      {/* Orbital Rings - pass mouse position for parallax */}
      <OrbitalRings mouseX={mousePosition.x} mouseY={mousePosition.y} />

      {/* Planet - positioned to bleed outside viewport */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ 
          right: '-15%',
          top: '50%',
          width: 'clamp(500px, 70vw, 1000px)',
          aspectRatio: '1',
          translateY: '-45%',
          y: planetY,
          scale: planetScale,
          opacity: planetOpacity,
          x: planetParallaxX,
        }}
      >
        <motion.div
          className="relative w-full h-full"
          style={{
            rotate: planetRotation,
            y: planetParallaxY,
          }}
        >
          {/* Atmospheric glow layers */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, hsla(199, 89%, 60%, 0.2) 0%, transparent 50%)',
              filter: 'blur(40px)',
              transform: 'scale(1.3)',
            }}
          />
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 70% 70%, hsla(199, 89%, 48%, 0.15) 0%, transparent 60%)',
              filter: 'blur(60px)',
              transform: 'scale(1.4)',
            }}
          />
          
          {/* Planet image */}
          <img
            src={planetImage}
            alt=""
            className="w-full h-full object-contain"
            style={{
              filter: 'drop-shadow(0 0 80px hsla(199, 89%, 48%, 0.3))',
              maskImage: 'radial-gradient(circle, black 40%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 70%)',
            }}
          />
          
          {/* Rim light effect */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 120deg, transparent 0deg, hsla(199, 89%, 70%, 0.3) 60deg, transparent 120deg)',
              filter: 'blur(20px)',
            }}
          />
        </motion.div>
      </motion.div>

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

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.span 
          className="text-xs text-muted-foreground uppercase tracking-[0.2em]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to Explore
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border border-primary/30 flex items-start justify-center p-2"
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-primary"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
