import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  const cols = {
    Services: ['Web Design', 'UI/UX', 'Brand Identity', 'SaaS Engineering', 'SEO', 'Motion Design'],
    Company:  ['About', 'Work', 'Process', 'Careers', 'Contact'],
  };
  const socials = [
    { Icon: Twitter, href: '#', label: 'Twitter' },
    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
    { Icon: Github, href: '#', label: 'GitHub' },
    { Icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="relative pt-16 pb-10 mt-10">
      {/* Top gradient line */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #7C3AED, #06B6D4, transparent)' }} />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <motion.div className="flex items-center gap-2.5 mb-5" whileHover={{ scale: 1.02 }}>
              <span className="relative w-7 h-7 grid place-items-center">
                <span className="absolute inset-0 rounded-full bg-brand-violet/30 blur-md" />
                <span className="relative w-2.5 h-2.5 rounded-full bg-brand-violet shadow-[0_0_12px_hsl(var(--brand-violet))]" />
              </span>
              <span className="font-display font-bold text-lg">OrbitX <span className="text-muted-foreground font-medium">Labs</span></span>
            </motion.div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-6">
              A design and engineering studio crafting premium digital experiences for ambitious teams.
            </p>
            <div className="flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full grid place-items-center border border-white/10 text-muted-foreground hover:text-foreground hover:border-brand-violet/40 hover:bg-white/5 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(cols).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-display font-bold text-foreground mb-4">{title}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/[0.06] text-center text-sm text-muted-foreground">
          © {year} OrbitX Labs. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
