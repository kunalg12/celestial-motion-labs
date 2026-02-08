import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Reduced from 2000ms to 1500ms

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background: 'hsl(228, 0%, 0%)',
          }}
        >
          {/* Star field background */}
          <div className="absolute inset-0 star-field opacity-30" />

          {/* Central logo animation */}
          <div className="relative">
            {/* Orbital rings */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {/* Ring 1 */}
              <motion.div
                className="w-32 h-32 rounded-full border-2 border-primary/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Ring 2 */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-primary/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />

              {/* Ring 3 */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-primary/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>

            {/* Center orb */}
            <motion.div
              className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                background: 'linear-gradient(135deg, hsla(199, 89%, 48%, 0.3), hsla(263, 70%, 50%, 0.2))',
                border: '2px solid hsla(199, 89%, 48%, 0.5)',
              }}
            >
              <motion.div
                className="w-8 h-8 rounded-full bg-primary"
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    '0 0 20px hsla(199, 89%, 48%, 0.4)',
                    '0 0 40px hsla(199, 89%, 48%, 0.8)',
                    '0 0 20px hsla(199, 89%, 48%, 0.4)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 text-center"
            >
              <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">
                Orbitix
              </h1>
              <motion.div
                className="mt-4 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-transparent via-primary to-transparent"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
