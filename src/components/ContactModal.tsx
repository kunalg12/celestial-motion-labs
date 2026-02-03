import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormState({ name: '', email: '', projectType: '', message: '' });
      }, 2000);
    }, 1500);
  };

  const inputClasses = "w-full bg-secondary/30 border border-primary/20 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/60 transition-all duration-300";
  const labelClasses = "block text-sm font-medium text-muted-foreground mb-1.5";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-xl bg-[#030712] border border-primary/20 rounded-3xl shadow-[0_0_50px_-12px_rgba(6,182,212,0.25)] overflow-hidden pointer-events-auto relative"
            >
              {/* Decorative Glows */}
              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary/50"
              >
                <X size={20} />
              </button>

              <div className="p-8 md:p-10">
                {!isSuccess ? (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
                        Initialize <span className="text-gradient-cosmic">Contact</span>
                      </h2>
                      <p className="text-muted-foreground">
                        Ready to launch your project? Fill in the parameters below.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label className={labelClasses}>Name</label>
                          <input
                            type="text"
                            required
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            className={inputClasses}
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className={labelClasses}>Email</label>
                          <input
                            type="email"
                            required
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            className={inputClasses}
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className={labelClasses}>Mission Objective</label>
                        <select
                          value={formState.projectType}
                          onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                          className={inputClasses}
                        >
                          <option value="">Select a service...</option>
                          <option value="strategy">Mission Strategy</option>
                          <option value="identity">Stellar Identity</option>
                          <option value="engineering">Hyper-Scale Engineering</option>
                          <option value="marketing">Velocity Marketing</option>
                          <option value="other">Other Inquiry</option>
                        </select>
                      </div>

                      <div>
                        <label className={labelClasses}>Message</label>
                        <textarea
                          required
                          rows={4}
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          className={inputClasses}
                          placeholder="Tell us about your digital universe..."
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-xl relative overflow-hidden group disabled:opacity-70"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                            />
                          ) : (
                            <>
                              Transmit Signal <Send size={18} />
                            </>
                          )}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.button>
                    </form>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Signal Received</h3>
                    <p className="text-muted-foreground">
                      Our team will decode your transmission and respond shortly.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
