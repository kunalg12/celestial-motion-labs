import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
}

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = ({ onOpenContact }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 90, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 inset-x-0 z-50"
        style={{
          backgroundColor: scrolled ? 'rgba(6,6,14,0.75)' : 'rgba(6,6,14,0.5)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="container mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" onClick={(e) => goTo(e, '#')} className="flex items-center gap-2.5 group">
            <span className="relative w-7 h-7 grid place-items-center">
              <span className="absolute inset-0 rounded-full bg-brand-violet/30 blur-md group-hover:bg-brand-violet/50 transition-colors" />
              <span className="relative w-2.5 h-2.5 rounded-full bg-brand-violet shadow-[0_0_12px_hsl(var(--brand-violet))]" />
              <span className="absolute inset-0 rounded-full border border-brand-violet/40 animate-[orbit-spin_8s_linear_infinite]" style={{ borderTopColor: 'transparent', borderLeftColor: 'transparent' }} />
            </span>
            <span className="font-display font-bold text-lg tracking-tight">
              OrbitX <span className="text-muted-foreground font-medium">Labs</span>
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => goTo(e, l.href)}
                className="relative text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300 gradient-brand" />
              </a>
            ))}
          </nav>

          {/* CTA + mobile */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={onOpenContact}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white gradient-brand transition-all duration-300 hover:shadow-[0_0_24px_rgba(124,58,237,0.55)]"
            >
              Start a Project <ArrowRight className="w-4 h-4" />
            </motion.button>

            <button
              className="md:hidden w-10 h-10 grid place-items-center rounded-full border border-white/10 text-foreground hover:bg-white/5"
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 inset-x-0 z-40 md:hidden border-b border-white/[0.06]"
            style={{
              backgroundColor: 'rgba(6,6,14,0.92)',
              backdropFilter: 'blur(24px) saturate(180%)',
            }}
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => goTo(e, l.href)}
                  className="px-3 py-3 rounded-xl text-base font-medium text-foreground hover:bg-white/5"
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => { setOpen(false); onOpenContact(); }}
                className="mt-3 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-medium text-white gradient-brand"
              >
                Start a Project <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
