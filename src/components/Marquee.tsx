const ITEMS = [
  'Web Design', 'Branding', 'Next.js', 'React', 'Framer Motion',
  'SaaS', 'UI/UX', 'Performance', 'SEO', 'Tailwind CSS', 'Motion Design',
];

const Marquee = () => {
  const row = [...ITEMS, ...ITEMS];
  return (
    <section
      aria-hidden
      className="relative py-8 border-y border-white/[0.06] overflow-hidden"
    >
      <div className="flex marquee-track whitespace-nowrap">
        {row.map((label, i) => (
          <span
            key={i}
            className="flex items-center gap-6 px-6 font-display text-sm uppercase tracking-[0.25em] text-muted-foreground/60"
          >
            {label}
            <span className="text-brand-violet/70">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
};

export default Marquee;
