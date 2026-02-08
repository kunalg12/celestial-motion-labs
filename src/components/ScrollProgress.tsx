import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setIsVisible(latest > 0.1);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed bottom-8 right-8 z-40"
    >
      <motion.button
        onClick={scrollToTop}
        className="relative w-14 h-14 rounded-full flex items-center justify-center group cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: 'hsla(224, 0%, 6%, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid hsla(217, 0%, 30%, 0.2)',
        }}
      >
        {/* Progress ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsla(217, 33%, 30%, 0.3)"
            strokeWidth="3"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(199, 89%, 48%)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{
              pathLength: scaleProgress,
              filter: 'drop-shadow(0 0 4px hsla(199, 89%, 48%, 0.6))',
            }}
            strokeDasharray="0 1"
          />
        </svg>

        {/* Arrow icon */}
        <ArrowUp className="w-5 h-5 text-primary relative z-10 group-hover:text-white transition-colors" />

        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: 'radial-gradient(circle, hsla(199, 89%, 48%, 0.2) 0%, transparent 70%)',
          }}
        />
      </motion.button>
    </motion.div>
  );
};

export default ScrollProgress;
