import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

const CursorTrail = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const particleIdRef = useRef(0);

  useEffect(() => {
    // Detect touch devices
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    let lastEmitTime = 0;
    const emitInterval = 30; // Emit particle every 30ms

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastEmitTime < emitInterval) return;
      
      lastEmitTime = now;
      const newParticle: Particle = {
        id: particleIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        timestamp: now,
      };

      setParticles((prev) => [...prev, newParticle]);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup old particles
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setParticles((prev) => 
        prev.filter((p) => now - p.timestamp < 1000)
      );
    }, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(cleanupInterval);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ 
              opacity: 0.6, 
              scale: 1,
              x: particle.x,
              y: particle.y,
            }}
            animate={{ 
              opacity: 0, 
              scale: 0.3,
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.8,
              ease: 'easeOut',
            }}
            className="absolute w-2 h-2 rounded-full -translate-x-1 -translate-y-1"
            style={{
              background: 'radial-gradient(circle, hsla(199, 89%, 48%, 0.8) 0%, hsla(199, 89%, 48%, 0.2) 70%, transparent 100%)',
              boxShadow: '0 0 8px hsla(199, 89%, 48%, 0.6)',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CursorTrail;
