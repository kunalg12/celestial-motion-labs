import { motion } from 'framer-motion';

const FloatingElements = () => {
  const shapes = [
    { 
      type: 'circle', 
      size: 60, 
      left: '10%', 
      top: '20%', 
      duration: 25,
      delay: 0,
    },
    { 
      type: 'square', 
      size: 40, 
      left: '85%', 
      top: '15%', 
      duration: 30,
      delay: 2,
    },
    { 
      type: 'triangle', 
      size: 50, 
      left: '15%', 
      top: '70%', 
      duration: 28,
      delay: 4,
    },
    { 
      type: 'circle', 
      size: 35, 
      left: '75%', 
      top: '60%', 
      duration: 22,
      delay: 1,
    },
    { 
      type: 'square', 
      size: 45, 
      left: '50%', 
      top: '40%', 
      duration: 26,
      delay: 3,
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute opacity-5"
          style={{
            left: shape.left,
            top: shape.top,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: shape.delay,
          }}
        >
          {shape.type === 'circle' && (
            <div 
              className="w-full h-full rounded-full"
              style={{
                background: 'linear-gradient(135deg, hsla(199, 89%, 48%, 0.3), hsla(263, 70%, 50%, 0.2))',
                border: '1px solid hsla(199, 89%, 48%, 0.2)',
              }}
            />
          )}
          {shape.type === 'square' && (
            <div 
              className="w-full h-full"
              style={{
                background: 'linear-gradient(135deg, hsla(263, 70%, 50%, 0.3), hsla(199, 89%, 48%, 0.2))',
                border: '1px solid hsla(263, 70%, 50%, 0.2)',
                transform: 'rotate(45deg)',
              }}
            />
          )}
          {shape.type === 'triangle' && (
            <div 
              className="w-full h-full"
              style={{
                width: 0,
                height: 0,
                borderLeft: `${shape.size / 2}px solid transparent`,
                borderRight: `${shape.size / 2}px solid transparent`,
                borderBottom: `${shape.size}px solid hsla(199, 89%, 48%, 0.15)`,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;
