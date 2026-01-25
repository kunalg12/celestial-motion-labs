import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "Orbitix transformed our digital presence entirely. Their attention to detail and innovative approach exceeded every expectation we had.",
    author: "Sarah Chen",
    role: "CEO, TechNova",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format",
  },
  {
    id: 2,
    content: "Working with this team felt like having an extension of our own company. They truly understood our vision and brought it to life.",
    author: "Marcus Thompson",
    role: "Founder, Quantumleap",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format",
  },
  {
    id: 3,
    content: "The results speak for themselves—a 300% increase in user engagement and a brand identity that sets us apart in our industry.",
    author: "Elena Rodriguez",
    role: "CMO, Stellar Health",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format",
  },
];

const TestimonialsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section className="relative py-32 overflow-hidden">
      <div ref={containerRef} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Trusted by <span className="text-gradient-cosmic">Industry Leaders</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass-card rounded-2xl p-8 float"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground leading-relaxed mb-8">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
