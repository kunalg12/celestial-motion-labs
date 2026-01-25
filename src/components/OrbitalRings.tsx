import { motion } from 'framer-motion';

interface OrbitalRingsProps {
  centerX?: string;
  centerY?: string;
  scale?: number;
}

const OrbitalRings = ({ centerX = '60%', centerY = '50%', scale = 1 }: OrbitalRingsProps) => {
  const rings = [
    { size: 400, duration: 60, opacity: 0.15, delay: 0 },
    { size: 550, duration: 80, opacity: 0.12, delay: 5 },
    { size: 700, duration: 100, opacity: 0.1, delay: 10 },
    { size: 900, duration: 120, opacity: 0.08, delay: 15 },
  ];

  return (
    <div 
      className="absolute pointer-events-none"
      style={{
        left: centerX,
        top: centerY,
        transform: `translate(-50%, -50%) scale(${scale})`,
      }}
    >
      {rings.map((ring, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full border border-primary/20"
          style={{
            width: ring.size,
            height: ring.size,
            left: -ring.size / 2,
            top: -ring.size / 2,
            opacity: ring.opacity,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: ring.duration,
            repeat: Infinity,
            ease: "linear",
            delay: ring.delay,
          }}
        >
          {/* Satellite nodes on each ring */}
          <motion.div
            className="absolute w-2 h-2 bg-primary rounded-full"
            style={{
              top: '50%',
              left: 0,
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 10px hsla(199, 89%, 48%, 0.6)',
            }}
          />
          {index % 2 === 0 && (
            <motion.div
              className="absolute w-1.5 h-1.5 bg-star-glow rounded-full"
              style={{
                top: 0,
                left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 8px hsla(199, 89%, 65%, 0.5)',
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default OrbitalRings;
