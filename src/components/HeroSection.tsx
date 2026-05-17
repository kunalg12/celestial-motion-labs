import { motion, MotionValue } from 'framer-motion';
import { useMemo } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { World } from '@/components/ui/globe';

interface HeroSectionProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  onOpenContact: () => void;
}

const stats = [
  { value: '40+', label: 'Projects' },
  { value: '5★',  label: 'Rating' },
  { value: '3y',  label: 'Experience' },
  { value: '100%', label: 'On-Time' },
];

const HeroSection = ({ onOpenContact }: HeroSectionProps) => {
  const globeConfig = useMemo(() => ({
    pointSize: 4,
    globeColor: '#0D0D1A',
    showAtmosphere: true,
    atmosphereColor: '#7C3AED',
    atmosphereAltitude: 0.12,
    emissive: '#0D0D1A',
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: 'rgba(255,255,255,0.6)',
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
  const sampleArcs = useMemo(() => ([
    { order: 1, startLat: 22.3193, startLng: 114.1694, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: colors[0] },
    { order: 1, startLat: 40.7128, startLng: -74.006, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.4, color: colors[1] },
    { order: 2, startLat: -33.8688, startLng: 151.2093, endLat: 1.3521, endLng: 103.8198, arcAlt: 0.3, color: colors[2] },
    { order: 2, startLat: 48.8566, startLng: 2.3522, endLat: -22.9068, endLng: -43.1729, arcAlt: 0.5, color: colors[0] },
    { order: 3, startLat: 37.7749, startLng: -122.4194, endLat: 52.52, endLng: 13.405, arcAlt: 0.4, color: colors[1] },
    { order: 3, startLat: 19.4326, startLng: -99.1332, endLat: 28.6139, endLng: 77.209, arcAlt: 0.6, color: colors[2] },
    { order: 4, startLat: 55.7558, startLng: 37.6173, endLat: -34.6037, endLng: -58.3816, arcAlt: 0.7, color: colors[0] },
  ]), []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.8, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Globe visual — bleeds outside on the right */}
      <div className="absolute inset-0 z-0 flex items-center justify-end pointer-events-none overflow-hidden">
        <div className="relative w-[700px] h-[700px] md:w-[850px] md:h-[850px] opacity-90 translate-x-[20%] md:translate-x-[25%] translate-y-12 pointer-events-auto cursor-grab active:cursor-grabbing">
          <World data={sampleArcs} globeConfig={globeConfig} />
        </div>
      </div>

      {/* Soft left gradient veil for legibility */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(90deg, rgba(6,6,14,0.95) 0%, rgba(6,6,14,0.6) 45%, transparent 75%)' }}
      />

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
          {/* Pill badge */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-2 mb-8"
          >
            <span className="btn-gradient-border px-4 py-1.5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground/90">
              <Sparkles className="w-3.5 h-3.5 text-brand-amber" />
              Digital Agency · Est. 2024
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-display font-extrabold tracking-[-0.03em] text-[clamp(2.5rem,7vw,5rem)] leading-[1.05] mb-6"
          >
            <span className="block">We Build Digital</span>
            <span className="block text-gradient-brand">Experiences That</span>
            <span className="block">Move People</span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-lg md:text-xl text-muted-foreground max-w-xl md:max-w-[560px] mx-auto md:mx-0 mb-10"
          >
            OrbitX Labs is a design + engineering studio crafting premium web, brand,
            and product experiences for ambitious teams.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap gap-4 justify-center md:justify-start mb-14"
          >
            <motion.a
              href="#work"
              onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-white gradient-brand shadow-[0_0_30px_rgba(124,58,237,0.45)] hover:shadow-[0_0_45px_rgba(124,58,237,0.7)] transition-shadow"
            >
              See Our Work <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.button
              onClick={onOpenContact}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-gradient-border inline-flex items-center gap-2 px-7 py-3.5 font-medium text-foreground hover:text-white transition-colors"
            >
              Let's Talk
            </motion.button>
          </motion.div>

          {/* Stat row */}
          <motion.ul
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-4 divide-x divide-white/10"
          >
            {stats.map((s, i) => (
              <li key={s.label} className={`pl-8 ${i === 0 ? 'pl-0 border-l-0' : ''} flex flex-col`}>
                <span className="font-mono text-2xl md:text-3xl font-semibold text-foreground tracking-tight">{s.value}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground mt-1">{s.label}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
