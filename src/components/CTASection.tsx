import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles } from 'lucide-react';

const CTASection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Darker background overlay */}
      <div className="absolute inset-0 bg-cosmic-deep/80" />
      
      {/* Radial glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsla(199, 89%, 48%, 0.15) 0%, transparent 70%)',
        }}
      />

      <div ref={containerRef} className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
            className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-8"
          >
            <motion.div
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center"
              animate={{ 
                boxShadow: [
                  '0 0 40px hsla(199, 89%, 48%, 0.4)',
                  '0 0 80px hsla(199, 89%, 48%, 0.6)',
                  '0 0 40px hsla(199, 89%, 48%, 0.4)',
                ] 
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </motion.div>
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Ready to Launch Your{' '}
            <span className="text-gradient-cosmic">Next Project?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Let's create something extraordinary together. Your vision, our expertise—
            the perfect orbit for success.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="glow-button bg-primary text-primary-foreground px-10 py-4 rounded-xl font-semibold text-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start a Conversation
            </motion.button>
            <motion.button
              className="px-10 py-4 rounded-xl font-semibold text-lg border border-border text-foreground hover:bg-secondary/50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a Call
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
