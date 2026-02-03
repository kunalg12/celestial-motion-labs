import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
}

const Navbar = ({ onOpenContact }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 100], [0.7, 0.95]);
  const navBlur = useTransform(scrollY, [0, 100], [12, 20]);
  const navScale = useTransform(scrollY, [0, 100], [1, 0.98]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x * 0.05);
    mouseY.set(y * 0.1);
  };

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
  ];

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
        className="fixed top-4 left-1/2 z-50"
        style={{
          x: '-50%',
          scale: navScale,
        }}
      >
        <motion.div 
          className={`rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-700 ${
            isScrolled ? 'w-[85vw] max-w-3xl' : 'w-[90vw] max-w-4xl'
          }`}
          style={{
            x: springX,
            y: springY,
            backgroundColor: `hsla(224, 0%, 6%, ${isScrolled ? 0.9 : 0.6})`,
            backdropFilter: `blur(${isScrolled ? 24 : 16}px)`,
            WebkitBackdropFilter: `blur(${isScrolled ? 24 : 16}px)`,
            border: '1px solid hsla(217, 0%, 30%, 0.2)',
            boxShadow: `
              0 4px 30px hsla(0, 0%, 0%, 0.3),
              inset 0 1px 0 hsla(217, 33%, 50%, 0.1),
              0 0 40px hsla(199, 89%, 48%, ${isScrolled ? 0.05 : 0.02})
            `,
          }}
        >
          {/* Subtle gradient overlay */}
          <div 
            className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, hsla(199, 89%, 48%, 0.03) 0%, transparent 50%, hsla(263, 70%, 50%, 0.02) 100%)',
            }}
          />

          {/* Logo */}
          <motion.a 
            href="#"
            className="flex items-center gap-2.5 relative z-10"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="w-9 h-9 rounded-full flex items-center justify-center relative"
              style={{
                background: 'linear-gradient(135deg, hsla(199, 89%, 48%, 0.15), hsla(263, 70%, 50%, 0.1))',
                border: '1px solid hsla(199, 89%, 48%, 0.3)',
              }}
              animate={{
                boxShadow: [
                  '0 0 15px hsla(199, 89%, 48%, 0.2)',
                  '0 0 25px hsla(199, 89%, 48%, 0.4)',
                  '0 0 15px hsla(199, 89%, 48%, 0.2)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.div 
                className="w-3 h-3 rounded-full bg-primary"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Orbital ring around logo */}
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                style={{ transform: 'scale(1.3)' }}
              />
            </motion.div>
            <span className="font-display font-semibold text-lg text-foreground hidden sm:block">Celestial Motion Labs</span>
            <span className="font-display font-semibold text-lg text-foreground sm:hidden">CML</span>
          </motion.a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1 relative z-10">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium rounded-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -2 }}
              >
                {link.label}
                <motion.div
                  className="absolute inset-0 rounded-lg bg-secondary/30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={onOpenContact}
            className="hidden md:block relative z-10 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium text-sm overflow-hidden group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              boxShadow: '0 0 20px hsla(199, 89%, 48%, 0.3)',
            }}
          >
            <span className="relative z-10">Launch Project</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground p-2 relative z-10"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-24 left-4 right-4 z-40 rounded-2xl p-6 md:hidden"
            style={{
              backgroundColor: 'hsla(224, 0%, 6%, 0.95)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid hsla(217, 0%, 30%, 0.2)',
              boxShadow: '0 20px 50px hsla(0, 0%, 0%, 0.5)',
            }}
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-foreground hover:text-primary transition-colors text-lg font-medium py-3 px-4 rounded-lg hover:bg-secondary/30"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="glow-button bg-primary text-primary-foreground px-5 py-3 rounded-lg font-medium mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Launch Project
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
