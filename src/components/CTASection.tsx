import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CTASectionProps {
  onOpenContact: () => void;
}

const CTASection = ({ onOpenContact }: CTASectionProps) => {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 gradient-brand">
          {/* Vignette + noise */}
          <div className="absolute inset-0 noise-overlay opacity-30" />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(6,6,14,0.55) 100%)' }}
          />

          {/* Floating availability badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            animate={{ y: [0, -6, 0] }}
            transition={{ y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
            className="absolute top-6 right-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-mono uppercase tracking-[0.18em]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-amber shadow-[0_0_10px_hsl(var(--brand-amber))]" />
            Currently accepting clients ✦
          </motion.div>

          <div className="relative px-8 py-16 md:px-16 md:py-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-[0.3em] text-white/80">
                <Sparkles className="w-3.5 h-3.5" /> Let's collaborate
              </div>
              <h2 className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-[-0.02em] mb-6 max-w-3xl mx-auto">
                Ready to Build Something Great?
              </h2>
              <p className="text-white/85 text-lg md:text-xl max-w-xl mx-auto mb-10">
                Tell us about your project and we'll get back within 24 hours with a clear plan.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={onOpenContact}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-medium bg-white text-[#0D0D1A] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-shadow"
                >
                  Start a Project <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.a
                  href="#work"
                  onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-medium border border-white/40 text-white hover:bg-white/10 transition-colors"
                >
                  View Our Work
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
