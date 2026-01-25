import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

const CTASection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });
  
  const glowRadius = useSpring(isHovered ? 120 : 60, { stiffness: 200, damping: 30 });
  const glowOpacity = useSpring(isHovered ? 0.5 : 0.3, { stiffness: 200, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x * 0.1);
    mouseY.set(y * 0.1);
  };

  // Ring animation influenced by hover
  const ring1Scale = useSpring(isHovered ? 1.1 : 1, { stiffness: 200, damping: 20 });
  const ring2Scale = useSpring(isHovered ? 1.15 : 1, { stiffness: 150, damping: 20 });
  const ring3Scale = useSpring(isHovered ? 1.2 : 1, { stiffness: 100, damping: 20 });

  return (
    <section 
      id="contact" 
      className="relative py-32 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
    >
      {/* Darker background overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, hsl(228 84% 4%) 0%, hsl(224 71% 3%) 50%, hsl(228 84% 4%) 100%)' }} />
      
      {/* Interactive orbital rings that respond to CTA hover */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          className="absolute rounded-full border border-primary/10"
          style={{
            width: 300,
            height: 300,
            left: -150,
            top: -150,
            scale: ring1Scale,
            x: useTransform(springX, (v) => v * 0.5),
            y: useTransform(springY, (v) => v * 0.5),
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute rounded-full border border-primary/8"
          style={{
            width: 450,
            height: 450,
            left: -225,
            top: -225,
            scale: ring2Scale,
            x: useTransform(springX, (v) => v * 0.3),
            y: useTransform(springY, (v) => v * 0.3),
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute rounded-full border border-primary/5"
          style={{
            width: 600,
            height: 600,
            left: -300,
            top: -300,
            scale: ring3Scale,
            x: useTransform(springX, (v) => v * 0.2),
            y: useTransform(springY, (v) => v * 0.2),
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Dynamic glow that follows mouse and intensifies on hover */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 600,
          x: useTransform(springX, (v) => v * 2),
          y: useTransform(springY, (v) => v * 2),
          background: `radial-gradient(circle, hsla(199, 89%, 48%, ${glowOpacity.get()}) 0%, transparent 60%)`,
        }}
      />

      <div ref={containerRef} className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Energy core icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring', bounce: 0.4 }}
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 relative"
            style={{
              background: 'linear-gradient(135deg, hsla(199, 89%, 48%, 0.1), hsla(263, 70%, 50%, 0.05))',
              border: '1px solid hsla(199, 89%, 48%, 0.2)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center relative"
              animate={{ 
                boxShadow: isHovered 
                  ? ['0 0 60px hsla(199, 89%, 48%, 0.6)', '0 0 100px hsla(199, 89%, 48%, 0.8)', '0 0 60px hsla(199, 89%, 48%, 0.6)']
                  : ['0 0 30px hsla(199, 89%, 48%, 0.3)', '0 0 50px hsla(199, 89%, 48%, 0.5)', '0 0 30px hsla(199, 89%, 48%, 0.3)'],
              }}
              transition={{ duration: isHovered ? 1 : 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </motion.div>
            
            {/* Orbiting particle */}
            <motion.div
              className="absolute w-2 h-2 rounded-full bg-star-glow"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{
                top: '50%',
                left: '50%',
                transformOrigin: '0 -25px',
                boxShadow: '0 0 10px hsla(199, 89%, 65%, 0.6)',
              }}
            />
          </motion.div>

          <motion.h2 
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Ready to Launch Your{' '}
            <span className="text-gradient-cosmic">Next Project?</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Let's create something extraordinary together. Your vision, our expertise—
            the perfect orbit for success.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.button
              className="relative bg-primary text-primary-foreground px-10 py-4 rounded-xl font-semibold text-lg overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              style={{
                boxShadow: '0 0 40px hsla(199, 89%, 48%, 0.4)',
              }}
            >
              <span className="relative z-10">Start a Conversation</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary via-star-glow to-primary"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              {/* Pulse ring on hover */}
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-primary"
                animate={isHovered ? { scale: [1, 1.2, 1.3], opacity: [0.5, 0.2, 0] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.button>
            <motion.button
              className="px-10 py-4 rounded-xl font-semibold text-lg border border-border text-foreground relative overflow-hidden group"
              whileHover={{ scale: 1.02, borderColor: 'hsla(199, 89%, 48%, 0.5)' }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Book a Call</span>
              <motion.div
                className="absolute inset-0 bg-secondary/30"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
