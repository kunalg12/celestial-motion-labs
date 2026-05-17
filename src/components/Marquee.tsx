const ITEMS = [
  'Web Design', 'Branding', 'Next.js', 'React', 'Framer Motion',
  'SaaS', 'UI / UX', 'Performance', 'SEO', 'Tailwind CSS', 'Motion Design',
  'Three.js', 'Design Systems', 'Webflow',
];

const Marquee = () => {
  const row = [...ITEMS, ...ITEMS];
  return (
    <section
      aria-hidden
      className="relative py-12 border-y border-white/[0.06] overflow-hidden"
      style={{
        maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
      }}
    >
      <div className="flex marquee-track whitespace-nowrap">
        {row.map((label, i) => (
          <span
            key={i}
            className="flex items-center gap-8 px-8 font-display font-bold text-3xl md:text-5xl uppercase tracking-[-0.02em] text-foreground/10 hover:text-foreground transition-colors duration-500"
          >
            {label}
            <span className="text-brand-violet/60 text-2xl md:text-3xl">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
};

export default Marquee;
