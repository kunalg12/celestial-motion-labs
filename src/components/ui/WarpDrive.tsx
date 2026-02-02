import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

const WarpDrive = () => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Transform velocity into a warp factor (0 to 1) for the UI
  const warpFactorRaw = useTransform(scrollVelocity, [-3000, -500, 0, 500, 3000], [1, 0.2, 0, 0.2, 1]);
  const warpFactor = useSpring(warpFactorRaw, { stiffness: 100, damping: 30 });
  
  const [isWarping, setIsWarping] = useState(false);

  useEffect(() => {
    return warpFactor.on('change', (latest) => {
      if (latest > 0.1 && !isWarping) setIsWarping(true);
      if (latest <= 0.1 && isWarping) setIsWarping(false);
    });
  }, [warpFactor, isWarping]);

  const blurAmount = useTransform(warpFactor, [0, 1], [0, 8]);
  const opacityAmount = useTransform(warpFactor, [0.1, 1], [0, 0.3]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[50]">
      {/* Motion Blur Overlay - Keeping it dark */}
      <motion.div 
        style={{ 
          backdropFilter: useTransform(blurAmount, (v) => `blur(${v}px)`),
          backgroundColor: useTransform(warpFactor, [0, 1], ['rgba(0,0,0,0)', 'rgba(6, 32, 86, 0.2)']),
        }}
        className="absolute inset-0"
      />

      {/* Warp Speed HUD */}
      <motion.div 
        animate={{ 
          opacity: isWarping ? 1 : 0,
          scale: isWarping ? 1 : 0.8,
        }}
        className="absolute bottom-10 left-10 flex flex-col gap-2 font-mono"
      >
        <div className="flex items-center gap-4 text-primary">
          <span className="text-xs uppercase tracking-widest bg-primary/20 px-2 py-1 rounded border border-primary/40 text-background font-bold shadow-lg">
            Warp Drive
          </span>
          <div className="w-48 h-1 bg-primary/30 rounded-full overflow-hidden">
            <motion.div 
              style={{ scaleX: warpFactor, originX: 0 }}
              className="w-full h-full bg-primary shadow-[0_0_15px_var(--primary)]"
            />
          </div>
        </div>
        <div className="text-[10px] text-primary uppercase font-bold tracking-tighter">
          Status: <span className={isWarping ? 'animate-pulse' : ''}>
            {isWarping ? 'Engaged' : 'Idle'}
          </span>
        </div>
      </motion.div>

      {/* Speed Lines / Streaks Layer */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        {[...Array(5)].map((_, i) => (
          <motion.line
            key={i}
            x1={`${20 + i * 15}%`}
            y1="-10%"
            x2={`${20 + i * 15}%`}
            y2="110%"
            stroke="white"
            strokeWidth="1"
            style={{
              opacity: useTransform(warpFactor, [0.5, 1], [0, 0.5]),
              scaleY: useTransform(warpFactor, [0.5, 1], [0, 1]),
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default WarpDrive;
