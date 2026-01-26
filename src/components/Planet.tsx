import { motion, MotionValue, useTransform } from 'framer-motion';
import earthImage from '@/assets/planet-hero.png';

interface PlanetProps {
  scrollProgress: MotionValue<number>;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

const Planet = ({ scrollProgress, mouseX, mouseY }: PlanetProps) => {
  // Scroll-based transformations - softened for a more premium feel
  const planetY = useTransform(scrollProgress, [0, 1], [0, 100]); // Reduced vertical movement
  const planetScale = useTransform(scrollProgress, [0, 1], [1, 0.95]); // More subtle scaling
  const planetOpacity = useTransform(scrollProgress, [0, 0.8, 1], [1, 1, 0.6]);

  // Subtle parallax using useTransform for smoother motion
  const parallaxX = useTransform(mouseX, (v) => v * 15);
  const parallaxY = useTransform(mouseY, (v) => v * 10);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        right: '-30%',
        top: '50%',
        width: 'clamp(1800px, 80vw, 1800px)',
        height: 'clamp(1800px, 80vw, 1800px)',
        translateY: '-50%',
        y: planetY,
        scale: planetScale,
        opacity: planetOpacity,
        x: parallaxX,
        willChange: 'transform',
      }}
    >
      {/* Back Glow - Silhouettes the dark side */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 70% 50%, hsla(220, 0%, 50%, 0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
          transform: 'scale(1.5)',
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Atmospheric Rim Light - Softens the edge transition */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle at 65% 45%, hsla(220, 0%, 60%, 0.15) 0%, transparent 65%)',
          filter: 'blur(30px)',
          transform: 'scale(1.05)',
        }}
      />

      {/* Planet Container - Circular */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          y: parallaxY,
        }}
      >
        {/* Base Planet Image */}
        <div className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center">
          <img
            src={earthImage}
            alt="Earth"
            className="w-full h-full object-contain"
            style={{
              transform: 'scaleX(-1)',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Planet;
