import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface OrbitalRingsProps {
  mouseX?: number;
  mouseY?: number;
}

const OrbitalRings = ({ mouseX = 0, mouseY = 0 }: OrbitalRingsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Create spring-animated values for smoother parallax
  const springConfig = { stiffness: 50, damping: 30 };
  const x = useSpring(useMotionValue(0), springConfig);
  const y = useSpring(useMotionValue(0), springConfig);

  useEffect(() => {
    x.set(mouseX * 20);
    y.set(mouseY * 20);
  }, [mouseX, mouseY, x, y]);

  const rings = [
    { 
      size: 500, 
      duration: 120, 
      opacity: 0.08, 
      delay: 0,
      strokeWidth: 1,
      dashArray: '4 8',
      satellites: [{ angle: 0, size: 4 }, { angle: 180, size: 3 }],
      parallaxFactor: 0.3,
    },
    { 
      size: 700, 
      duration: 180, 
      opacity: 0.06, 
      delay: 0,
      strokeWidth: 1,
      dashArray: '2 12',
      satellites: [{ angle: 90, size: 5 }, { angle: 270, size: 3 }],
      parallaxFactor: 0.5,
      reverse: true,
    },
    { 
      size: 950, 
      duration: 240, 
      opacity: 0.05, 
      delay: 0,
      strokeWidth: 1,
      dashArray: '1 20',
      satellites: [{ angle: 45, size: 6 }],
      parallaxFactor: 0.7,
    },
    { 
      size: 1200, 
      duration: 300, 
      opacity: 0.04, 
      delay: 0,
      strokeWidth: 0.5,
      dashArray: '1 30',
      satellites: [],
      parallaxFactor: 0.9,
      reverse: true,
    },
    { 
      size: 1500, 
      duration: 400, 
      opacity: 0.03, 
      delay: 0,
      strokeWidth: 0.5,
      dashArray: '1 40',
      satellites: [{ angle: 120, size: 4 }],
      parallaxFactor: 1.1,
    },
  ];

  return (
    <div 
      ref={containerRef}
      className="absolute pointer-events-none"
      style={{
        left: '55%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {rings.map((ring, index) => {
        const parallaxX = useTransform(x, (v) => v * ring.parallaxFactor);
        const parallaxY = useTransform(y, (v) => v * ring.parallaxFactor);

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
      })}

      {/* Inner glow core */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 300,
          height: 300,
          left: -150,
          top: -150,
          background: 'radial-gradient(circle, hsla(199, 89%, 48%, 0.08) 0%, transparent 70%)',
          x: useTransform(x, (v) => v * 0.2),
          y: useTransform(y, (v) => v * 0.2),
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
    </div>
  );
};

export default OrbitalRings;
