import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: 'OrbitX Labs transformed our digital presence entirely. Their attention to detail and innovative approach exceeded every expectation.',
    author: 'Sarah Chen',
    role: 'CEO, TechNova',
  },
  {
    id: 2,
    content: 'Working with this team felt like having an extension of our own company. They understood our vision and brought it to life.',
    author: 'Marcus Thompson',
    role: 'Founder, Quantumleap',
  },
  {
    id: 3,
    content: 'The results speak for themselves — a 300% increase in user engagement and a brand identity that sets us apart in our industry.',
    author: 'Elena Rodriguez',
    role: 'CMO, Stellar Health',
  },
];

const TestimonialsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-28 md:py-36">
      <div ref={ref} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-violet">— Testimonials</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4">
            Trusted by <span className="text-gradient-brand">Industry Leaders</span>
          </h2>
        </motion.div>

        <motion.div
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.article
              key={t.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
              whileHover={{ y: -8 }}
              className="glass-card p-8 flex flex-col transition-shadow hover:shadow-[0_0_30px_rgba(124,58,237,0.2)]"
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-amber text-brand-amber" />
                ))}
              </div>
              <p className="text-foreground/90 italic leading-relaxed mb-8 flex-1">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full p-[2px] gradient-brand">
                  <div className="w-full h-full rounded-full bg-card grid place-items-center font-display font-bold text-foreground">
                    {t.author.charAt(0)}
                  </div>
                </div>
                <div>
                  <div className="font-display font-bold text-foreground">{t.author}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
