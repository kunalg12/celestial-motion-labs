import { useEffect, useRef } from 'react';

/**
 * Fixed full-page background:
 *  - Animated particle starfield (canvas)
 *  - 3 large blurred radial orbs (violet + blue + cyan) that slowly pulse
 *  - SVG noise texture overlay
 */
const CosmicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let particles: { x: number; y: number; r: number; vx: number; vy: number; o: number }[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
      seed();
    };

    const seed = () => {
      const count = 150;
      particles = Array.from({ length: count }).map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.2 + 0.3,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        o: Math.random() * 0.4 + 0.15,
      }));
    };

    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;
        if (p.y < 0) p.y = window.innerHeight;
        if (p.y > window.innerHeight) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.o})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base */}
      <div className="absolute inset-0 bg-background" />

      {/* Blurred orbs */}
      <div
        className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'pulse-orb 8s ease-in-out infinite alternate',
        }}
      />
      <div
        className="absolute top-1/3 -right-40 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.30) 0%, transparent 70%)',
          filter: 'blur(90px)',
          animation: 'pulse-orb 10s ease-in-out 1.5s infinite alternate',
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'pulse-orb 9s ease-in-out 3s infinite alternate',
        }}
      />

      {/* Starfield */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Noise */}
      <div className="absolute inset-0 noise-overlay opacity-[0.25]" />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(6,6,14,0.6) 100%)',
        }}
      />
    </div>
  );
};

export default CosmicBackground;
