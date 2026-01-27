import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star } from 'lucide-react';
import { Meteors } from './ui/meteors';

const testimonials = [
  {
    id: 1,
    content: "Orbitix transformed our digital presence entirely. Their attention to detail and innovative approach exceeded every expectation we had.",
    author: "Sarah Chen",
    role: "CEO, TechNova",
  },
  {
    id: 2,
    content: "Working with this team felt like having an extension of our own company. They truly understood our vision and brought it to life.",
    author: "Marcus Thompson",
    role: "Founder, Quantumleap",
  },
  {
    id: 3,
    content: "The results speak for themselves—a 300% increase in user engagement and a brand identity that sets us apart in our industry.",
    author: "Elena Rodriguez",
    role: "CMO, Stellar Health",
  },
];

const TestimonialsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateY: -10,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateY: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <Meteors number={20} />
      </div>
      <div ref={containerRef} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span 
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Testimonials
          </motion.span>
          <motion.h2 
            className="font-display text-4xl md:text-5xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Trusted by <span className="text-gradient-cosmic">Industry Leaders</span>
          </motion.h2>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              className="rounded-2xl p-8 relative group"
              style={{
                background: 'hsla(224, 0%, 6%, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid hsla(217, 0%, 20%, 0.3)',
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 },
              }}
            >
              {/* Floating animation */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ 
                  y: [0, -8, 0],
                }}
                transition={{ 
                  duration: 4 + index, 
                  repeat: Infinity, 
                  ease: 'easeInOut',
                  delay: index * 0.5,
                }}
              />

              {/* Stars */}
              <motion.div 
                className="flex gap-1 mb-6"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 + i * 0.05, type: 'spring' }}
                  >
                    <Star className="w-4 h-4 fill-primary text-primary" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Content */}
              <p className="text-foreground leading-relaxed mb-8 relative">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 relative">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-primary font-bold text-lg"
                  style={{
                    background: 'hsla(199, 89%, 48%, 0.1)',
                    border: '2px solid hsla(199, 89%, 48%, 0.3)',
                  }}
                >
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>

              {/* Hover border glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  border: '1px solid hsla(199, 89%, 48%, 0.3)',
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
