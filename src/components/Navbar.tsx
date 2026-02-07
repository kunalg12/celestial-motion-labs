import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
}

const Navbar = ({ onOpenContact }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef<HTMLElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const { scrollY } = useScroll();
  const navScale = useTransform(scrollY, [0, 100], [1, 0.98]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Active section detection
      const sections = ['services', 'work', 'about'];
      let current = '';
      
      // Check if near top
      if (window.scrollY < 100) {
        current = 'home';
      } else {
        // Check other sections
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
             // If section is in view (offset by nav height approx)
            if (rect.top <= 150 && rect.bottom >= 150) {
              current = section;
              break;
            }
          }
        }
      }
      
      if (current) setActiveSection(current);
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

  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    
    if (targetId === 'home' || href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 100; // Navbar height + buffer
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Work', href: '#work', id: 'work' },
    { label: 'About', href: '#about', id: 'about' },
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
        className="fixed top-4 left-1/2 z-50 origin-top"
        style={{
          x: '-50%',
          scale: navScale,
        }}
      >
        <motion.div 
          className={`rounded-full px-2 py-2 flex items-center justify-between transition-all duration-700 ${
            isScrolled ? 'w-[85vw] max-w-3xl' : 'w-[90vw] max-w-4xl'
          }`}
          style={{
            x: springX,
            y: springY,
            backgroundColor: `hsla(224, 0%, 6%, ${isScrolled ? 0.85 : 0.6})`,
            backdropFilter: `blur(${isScrolled ? 20 : 12}px)`,
            WebkitBackdropFilter: `blur(${isScrolled ? 20 : 12}px)`,
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
            className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, hsla(199, 89%, 48%, 0.03) 0%, transparent 50%, hsla(263, 70%, 50%, 0.02) 100%)',
            }}
          />

          {/* Logo */}
          <motion.a 
            href="#"
            onClick={(e) => scrollToSection(e, '#')}
            className="flex items-center gap-2.5 relative z-10 pl-4"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="w-10 h-10 rounded-full flex items-center justify-center relative"
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
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-md animate-pulse" />
              <motion.div 
                className="w-3.5 h-3.5 rounded-full bg-primary relative z-10"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Orbital ring around logo */}
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                style={{ transform: 'scale(1.4)' }}
              />
            </motion.div>
            <span className="font-display font-semibold text-xl tracking-tight text-foreground hidden sm:block">
              Orbitix
            </span>
            <span className="font-display font-semibold text-xl tracking-tight text-foreground sm:hidden">
              Orbitix
            </span>
          </motion.a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-1 relative z-10 bg-black/20 p-1.5 rounded-full border border-white/5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative px-5 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-muted-foreground hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 bg-secondary rounded-full"
                      style={{
                        boxShadow: '0 0 20px hsla(199, 89%, 48%, 0.15)',
                        border: '1px solid hsla(199, 89%, 48%, 0.2)',
                      }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                  
                  {/* Subtle active glow dot */}
                  {isActive && (
                     <motion.div 
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_currentColor]"
                     />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4 pr-1">
            <motion.button
              onClick={onOpenContact}
              className="hidden md:block relative z-10 bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium text-sm overflow-hidden group shadow-lg shadow-primary/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Launch Project
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-foreground p-3 rounded-full hover:bg-white/5 transition-colors relative z-10"
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
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, type: 'spring', bounce: 0.3 }}
            className="fixed top-28 left-4 right-4 z-40 rounded-3xl p-6 md:hidden overflow-hidden"
            style={{
              backgroundColor: 'hsla(224, 0%, 6%, 0.8)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid hsla(217, 0%, 30%, 0.2)',
              boxShadow: '0 20px 50px -10px hsla(0, 0%, 0%, 0.7)',
            }}
          >
             {/* Background Gradient */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full filter blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full filter blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="flex flex-col gap-3 relative z-10">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                  className={`text-lg font-medium py-4 px-6 rounded-2xl transition-all ${
                    activeSection === link.id 
                    ? 'bg-secondary/50 text-white border border-white/10' 
                    : 'text-muted-foreground hover:bg-secondary/30 hover:text-white'
                  }`}
                >
                  <span className="flex items-center justify-between w-full">
                     {link.label}
                     {activeSection === link.id && (
                        <motion.span layoutId="mobile-active-dot" className="w-2 h-2 rounded-full bg-primary" />
                     )}
                  </span>
                </motion.a>
              ))}
              <motion.button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="bg-primary text-primary-foreground px-5 py-4 rounded-2xl font-medium mt-4 shadow-xl shadow-primary/20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
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
