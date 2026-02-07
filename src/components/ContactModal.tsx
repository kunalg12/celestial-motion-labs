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

  const inputClasses = "w-full bg-secondary/10 border border-white/5 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:bg-secondary/20 focus:ring-1 focus:ring-primary/60 transition-all duration-300";
  const labelClasses = "block text-sm font-medium text-muted-foreground mb-1.5 ml-1";

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
            className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-xl glass-panel rounded-3xl overflow-hidden pointer-events-auto relative"
            >
              {/* Decorative Glows */}
              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-white/5 z-20"
              >
                <X size={20} />
              </button>

              <div className="p-8 md:p-10 relative z-10">
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
                        <div className="group">
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
                        <div className="group">
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

                      <div className="group">
                        <label className={labelClasses}>Mission Objective</label>
                        <select
                          value={formState.projectType}
                          onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                          className={inputClasses}
                        >
                          <option value="" className="bg-[#0f172a]">Select a service...</option>
                          <option value="strategy" className="bg-[#0f172a]">Mission Strategy</option>
                          <option value="identity" className="bg-[#0f172a]">Stellar Identity</option>
                          <option value="engineering" className="bg-[#0f172a]">Hyper-Scale Engineering</option>
                          <option value="marketing" className="bg-[#0f172a]">Velocity Marketing</option>
                          <option value="other" className="bg-[#0f172a]">Other Inquiry</option>
                        </select>
                      </div>

                      <div className="group">
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
                        className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-xl relative overflow-hidden group disabled:opacity-70 shadow-lg shadow-primary/20"
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
                        <div className="absolute inset-0 bg-gradient-to-r from-primary via-white/20 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.button>
                    </form>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                      <motion.div
                         className="absolute inset-0 rounded-full border border-primary/40"
                         animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                         transition={{ duration: 2, repeat: Infinity }}
                      />
                      <Sparkles className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-3xl font-display font-bold mb-3 text-gradient-cosmic">Signal Received</h3>
                    <p className="text-muted-foreground text-lg mb-8">
                      Our team will decode your transmission and respond shortly.
                    </p>
                    <motion.button
                      onClick={onClose}
                      className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Close Communication
                    </motion.button>
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
