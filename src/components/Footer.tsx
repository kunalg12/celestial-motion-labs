import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    company: ['About', 'Careers', 'Blog', 'Press'],
    services: ['Strategy', 'Design', 'Development', 'Growth'],
    resources: ['Case Studies', 'Documentation', 'Partners', 'Contact'],
  };

  const socials = [
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Github, href: '#' },
    { icon: Instagram, href: '#' },
  ];

  return (
    <footer className="relative py-20 border-t border-border/50">
      {/* Subtle orbital grid background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0">
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="0.5" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          {/* Brand Column */}
          <div className="col-span-2">
            <motion.div 
              className="flex items-center gap-2 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-primary" />
              </div>
              <span className="font-display font-semibold text-lg text-foreground">Orbitix</span>
            </motion.div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
              Crafting digital universes that inspire, engage, and transform businesses worldwide.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socials.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  whileHover={{ y: -2 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-foreground mb-4 capitalize">
                {title}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="cosmic-divider mb-8" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Orbitix. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
