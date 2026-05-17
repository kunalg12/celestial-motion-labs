import { motion, MotionValue } from 'framer-motion';
import { useMemo } from 'react';
import { ArrowRight, Sparkles, ArrowDown } from 'lucide-react';
import { World } from '@/components/ui/globe';
import Magnetic from '@/components/Magnetic';

interface HeroSectionProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  onOpenContact: () => void;
}

const stats = [
  { value: '40+',  label: 'Projects' },
  { value: '5.0',  label: 'Avg. Rating' },
  { value: '3 yr', label: 'In Orbit' },
  { value: '100%', label: 'On-Time' },
];

const trustLogos = ['NORTHWIND', 'ACME', 'STELLAR', 'QUANTUM', 'HELIX', 'NOVA'];

const HeroSection = ({ onOpenContact }: HeroSectionProps) => {
  const globeConfig = useMemo(() => ({
    pointSize: 4,
    globeColor: '#0B0B17',
    showAtmosphere: true,
    atmosphereColor: '#7C3AED',
    atmosphereAltitude: 0.14,
    emissive: '#0B0B17',
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: 'rgba(255,255,255,0.55)',
    ambientLight: '#7C3AED',
    directionalLeftLight: '#06B6D4',
    directionalTopLight: '#ffffff',
    pointLight: '#06B6D4',
    arcTime: 1200,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  }), []);

  const colors = ['#06B6D4', '#7C3AED', '#2563EB'];
  const arcs = useMemo(() => ([
    { order: 1, startLat: 22.3193, startLng: 114.1694, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: colors[0] },
    { order: 1, startLat: 40.7128, startLng: -74.006, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.4, color: colors[1] },
    { order: 2, startLat: -33.8688, startLng: 151.2093, endLat: 1.3521, endLng: 103.8198, arcAlt: 0.3, color: colors[2] },
    { order: 2, startLat: 48.8566, startLng: 2.3522, endLat: -22.9068, endLng: -43.1729, arcAlt: 0.5, color: colors[0] },
    { order: 3, startLat: 37.7749, startLng: -122.4194, endLat: 52.52, endLng: 13.405, arcAlt: 0.4, color: colors[1] },
    { order: 3, startLat: 19.4326, startLng: -99.1332, endLat: 28.6139, endLng: 77.209, arcAlt: 0.6, color: colors[2] },
    { order: 4, startLat: 55.7558, startLng: 37.6173, endLat: -34.6037, endLng: -58.3816, arcAlt: 0.7, color: colors[0] },
  ]), []);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.8, delay: 0.1 + i * 0.09, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  // Split-line reveal helper
  const Line = ({ children, i, className = '' }: { children: React.ReactNode; i: number; className?: string }) => (
    <span className="block overflow-hidden">
      <motion.span
        custom={i}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { y: '110%' },
          visible: (k: number) => ({
            y: '0%',
            transition: { duration: 1, delay: 0.2 + k * 0.12, ease: [0.16, 1, 0.3, 1] },
          }),
        }}
        className={`block ${className}`}
      >
        {children}
      </motion.span>
    </span>
  );

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden pt-28 md:pt-32 pb-20">
      {/* Globe — bleeds right */}
      <div className="absolute inset-0 z-0 flex items-center justify-end pointer-events-none overflow-hidden">
        <div className="relative w-[640px] h-[640px] md:w-[820px] md:h-[820px] opacity-90 translate-x-[22%] md:translate-x-[24%] translate-y-8 md:translate-y-0 pointer-events-auto cursor-grab active:cursor-grabbing">
          <World data={arcs} globeConfig={globeConfig} />
        </div>
      </div>

      {/* Legibility veil */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(90deg, rgba(6,6,14,0.96) 0%, rgba(6,6,14,0.7) 40%, rgba(6,6,14,0.1) 75%, transparent 100%)' }}
      />

      <div className="relative z-10 container mx-auto px-6 w-full">
        <div className="max-w-[680px]">
          {/* Top eyebrow row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="btn-gradient-border px-3.5 py-1.5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/90">
              <Sparkles className="w-3 h-3 text-brand-amber" />
              Digital Agency · Est. 2024
            </span>
            <span className="hidden sm:flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgb(52,211,153)]" />
              Available · Q3 2026
            </span>
          </motion.div>

          {/* Headline — split-line reveal, tight clamp */}
          <h1 className="font-display font-extrabold tracking-[-0.035em] leading-[0.95] mb-8 text-[clamp(2.5rem,7.5vw,5.75rem)]">
            <Line i={0}>We Build Digital</Line>
            <Line i={1} className="text-gradient-brand pr-2">Experiences That</Line>
            <Line i={2}>
              Move{' '}
              <span className="relative inline-block italic font-display">
                People
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 right-0 -bottom-1 h-[3px] origin-left gradient-brand rounded-full"
                />
              </span>
            </Line>
          </h1>

          {/* Subhead */}
          <motion.p
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-base md:text-lg text-muted-foreground max-w-[520px] mb-10 leading-relaxed"
          >
            OrbitX Labs is a design + engineering studio crafting premium web, brand,
            and product experiences for ambitious teams.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap items-center gap-4 mb-16"
          >
            <Magnetic strength={0.25}>
              <a
                href="#work"
                onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium text-white gradient-brand shadow-[0_0_30px_rgba(124,58,237,0.45)] hover:shadow-[0_0_50px_rgba(124,58,237,0.75)] transition-shadow"
              >
                See Our Work
                <span className="relative w-4 h-4 overflow-hidden">
                  <ArrowRight className="w-4 h-4 absolute transition-transform duration-300 group-hover:translate-x-5" />
                  <ArrowRight className="w-4 h-4 absolute -translate-x-5 transition-transform duration-300 group-hover:translate-x-0" />
                </span>
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <button
                onClick={onOpenContact}
                className="btn-gradient-border inline-flex items-center gap-2 px-6 py-3.5 font-medium text-foreground hover:text-white transition-colors"
              >
                Let's Talk
              </button>
            </Magnetic>
          </motion.div>

          {/* Stat row */}
          <motion.ul
            custom={5}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap items-center gap-x-10 gap-y-4"
          >
            {stats.map((s, i) => (
              <li
                key={s.label}
                className={`flex flex-col ${i === 0 ? '' : 'pl-10 border-l border-white/10'}`}
              >
                <span className="font-mono text-2xl font-semibold text-foreground tracking-tight">{s.value}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-1">{s.label}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      {/* Bottom: trusted strip + scroll cue */}
      <div className="absolute bottom-6 inset-x-0 z-10">
        <div className="container mx-auto px-6 flex items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="hidden md:flex flex-col gap-2 max-w-md"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Trusted by teams at</span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {trustLogos.map((l) => (
                <span key={l} className="font-display font-bold text-sm tracking-[0.2em] text-muted-foreground/70 hover:text-foreground transition-colors">
                  {l}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.a
            href="#services"
            onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="hidden md:flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Scroll to services"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-8 h-8 rounded-full border border-white/15 grid place-items-center"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </motion.span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
