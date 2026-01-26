import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { MotionValue } from 'framer-motion';

interface OrbitalRingsProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

interface RingData {
  size: number;
  duration: number;
  opacity: number;
  delay: number;
  strokeWidth: number;
  dashArray: string;
  satellites: { angle: number; size: number }[];
  parallaxFactor: number;
  reverse?: boolean;
  glow: boolean;
}

const Ring = ({ ring, index, mouseX, mouseY }: { ring: RingData; index: number; mouseX: MotionValue<number>; mouseY: MotionValue<number> }) => {
  const parallaxX = useTransform(mouseX, (v) => v * 20 * ring.parallaxFactor);
  const parallaxY = useTransform(mouseY, (v) => v * 20 * ring.parallaxFactor);

  return (
    <motion.div
      key={index}
      className="absolute"
      style={{
        width: ring.size,
        height: ring.size,
        left: -ring.size / 2,
        top: -ring.size / 2,
        x: parallaxX,
        y: parallaxY,
      }}
    >
      {/* SVG Ring with gradient stroke */}
      <motion.svg
        width={ring.size}
        height={ring.size}
        className="absolute inset-0"
        animate={{ rotate: ring.reverse ? -360 : 360 }}
        transition={{
          duration: ring.duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <defs>
          <linearGradient id={`ring-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(199, 89%, 48%)" stopOpacity={ring.opacity * 2} />
            <stop offset="50%" stopColor="hsl(263, 70%, 50%)" stopOpacity={ring.opacity} />
            <stop offset="100%" stopColor="hsl(199, 89%, 48%)" stopOpacity={ring.opacity * 2} />
          </linearGradient>
        </defs>
        <circle
          cx={ring.size / 2}
          cy={ring.size / 2}
          r={(ring.size - ring.strokeWidth) / 2}
          fill="none"
          stroke={`url(#ring-gradient-${index})`}
          strokeWidth={ring.strokeWidth}
          strokeDasharray={ring.dashArray}
          style={{
            filter: ring.glow ? 'drop-shadow(0 0 4px hsla(199, 89%, 60%, 0.6))' : 'none',
          }}
        />
        
        {/* Satellites */}
        {ring.satellites.map((sat, satIndex) => {
          const satX = ring.size / 2 + Math.cos((sat.angle * Math.PI) / 180) * (ring.size / 2 - 10);
          const satY = ring.size / 2 + Math.sin((sat.angle * Math.PI) / 180) * (ring.size / 2 - 10);
          
          return (
            <g key={satIndex}>
              {/* Satellite glow */}
              <circle
                cx={satX}
                cy={satY}
                r={sat.size * 3}
                fill="url(#satellite-glow)"
              />
              {/* Satellite core */}
              <circle
                cx={satX}
                cy={satY}
                r={sat.size}
                fill="hsl(199, 89%, 65%)"
              />
            </g>
          );
        })}
        
        <defs>
          <radialGradient id="satellite-glow">
            <stop offset="0%" stopColor="hsl(199, 89%, 48%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(199, 89%, 48%)" stopOpacity="0" />
          </radialGradient>
        </defs>
      </motion.svg>
    </motion.div>
  );
};

const OrbitalRings = ({ mouseX, mouseY }: OrbitalRingsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Pre-calculate inner glow transforms at top level
  const innerGlowX = useTransform(mouseX, (v) => v * 20 * 0.2);
  const innerGlowY = useTransform(mouseY, (v) => v * 20 * 0.2);

  const rings: RingData[] = [
    { 
      size: 500, 
      duration: 100, 
      opacity: 0.12, 
      delay: 0,
      strokeWidth: 1.5,
      dashArray: '4 8',
      satellites: [{ angle: 0, size: 4 }, { angle: 180, size: 3 }],
      parallaxFactor: 0.3,
      glow: true,
    },
    { 
      size: 700, 
      duration: 160, 
      opacity: 0.10, 
      delay: 0,
      strokeWidth: 1.5,
      dashArray: '2 12',
      satellites: [{ angle: 90, size: 5 }, { angle: 270, size: 3 }],
      parallaxFactor: 0.5,
      reverse: true,
      glow: true,
    },
    { 
      size: 950, 
      duration: 220, 
      opacity: 0.08, 
      delay: 0,
      strokeWidth: 1.2,
      dashArray: '1 20',
      satellites: [{ angle: 45, size: 6 }],
      parallaxFactor: 0.7,
      glow: false,
    },
    { 
      size: 1200, 
      duration: 280, 
      opacity: 0.06, 
      delay: 0,
      strokeWidth: 1,
      dashArray: '1 30',
      satellites: [],
      parallaxFactor: 0.9,
      reverse: true,
      glow: false,
    },
    { 
      size: 1500, 
      duration: 360, 
      opacity: 0.05, 
      delay: 0,
      strokeWidth: 0.8,
      dashArray: '1 40',
      satellites: [{ angle: 120, size: 4 }],
      parallaxFactor: 1.1,
      glow: false,
    },
  ];

  return (
    <motion.div 
      ref={containerRef}
      className="absolute pointer-events-none"
      style={{
        left: '55%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        rotateX: [0, 2, 0, -2, 0],
        rotateY: [0, -1, 0, 1, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {rings.map((ring, index) => (
        <Ring key={index} ring={ring} index={index} mouseX={mouseX} mouseY={mouseY} />
      ))}

      {/* Inner glow core */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 300,
          height: 300,
          left: -150,
          top: -150,
          background: 'radial-gradient(circle, hsla(199, 89%, 48%, 0.08) 0%, transparent 70%)',
          x: innerGlowX,
          y: innerGlowY,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default OrbitalRings;
