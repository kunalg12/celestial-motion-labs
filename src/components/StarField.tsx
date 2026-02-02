import { useRef, useEffect, useMemo } from 'react';
import { motion, MotionValue, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';

interface StarFieldProps {
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
}

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  layer: number; // 0 = far, 1 = mid, 2 = near
  twinkleSpeed: number;
  twinkleOffset: number;
}

const StarField = ({ mouseX, mouseY }: StarFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);

  // Hyperspace velocity tracking
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Transform velocity into a warp factor (0 to 1)
  const warpFactorRaw = useTransform(scrollVelocity, [-2000, -500, 0, 500, 2000], [1, 0.2, 0, 0.2, 1]);
  const warpFactor = useSpring(warpFactorRaw, { stiffness: 100, damping: 30 });

  const starLayers = useMemo(() => ({
    far: { count: 150, speedMultiplier: 0.02, sizeRange: [0.3, 0.8], parallaxFactor: 0.01 },
    mid: { count: 100, speedMultiplier: 0.05, sizeRange: [0.5, 1.2], parallaxFactor: 0.03 },
    near: { count: 50, speedMultiplier: 0.1, sizeRange: [1, 2.5], parallaxFactor: 0.06 },
  }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      starsRef.current = [];
      
      // Far layer (slowest, smallest)
      for (let i = 0; i < starLayers.far.count; i++) {
        starsRef.current.push(createStar(0, starLayers.far));
      }
      // Mid layer
      for (let i = 0; i < starLayers.mid.count; i++) {
        starsRef.current.push(createStar(1, starLayers.mid));
      }
      // Near layer (fastest, largest)
      for (let i = 0; i < starLayers.near.count; i++) {
        starsRef.current.push(createStar(2, starLayers.near));
      }
    };

    const createStar = (layer: number, config: typeof starLayers.far): Star => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: config.sizeRange[0] + Math.random() * (config.sizeRange[1] - config.sizeRange[0]),
      opacity: 0.3 + Math.random() * 0.7,
      speed: config.speedMultiplier + Math.random() * config.speedMultiplier,
      layer,
      twinkleSpeed: 0.5 + Math.random() * 2,
      twinkleOffset: Math.random() * Math.PI * 2,
    });

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const currentWarp = warpFactor.get();
      
      // Clear canvas: Keep it dark even during warp
      if (currentWarp > 0.1) {
        ctx.fillStyle = `rgba(0, 0, 0, ${0.1 + (1 - currentWarp) * 0.4})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      const parallaxFactors = [
        starLayers.far.parallaxFactor,
        starLayers.mid.parallaxFactor,
        starLayers.near.parallaxFactor,
      ];

      starsRef.current.forEach((star) => {
        // Parallax offset based on mouse position
        const parallax = parallaxFactors[star.layer];
        const offsetX = (mouseX?.get() ?? 0) * parallax * 100;
        const offsetY = (mouseY?.get() ?? 0) * parallax * 100;

        // Twinkle effect (reduced during warp)
        const twinkle = Math.sin(currentTime * 0.001 * star.twinkleSpeed + star.twinkleOffset);
        const currentOpacity = star.opacity * (0.5 + twinkle * 0.5) * (1 - currentWarp * 0.2);

        // Draw position with parallax
        const drawX = star.x + offsetX;
        const drawY = star.y + offsetY;

        // Warp effect: stretch stars and add blue glow
        const warpLength = currentWarp * 120 * (star.layer + 1);
        const hue = 199 + star.layer * 5; // Blue-cyan range
        const lightness = 60 + star.layer * 10;
        
        if (currentWarp > 0.05) {
          // Draw blue energy streak
          const gradient = ctx.createLinearGradient(
            drawX, drawY - warpLength,
            drawX, drawY + warpLength
          );
          gradient.addColorStop(0, 'transparent');
          gradient.addColorStop(0.5, `hsla(${hue}, 89%, ${lightness}%, ${currentOpacity * (1 + currentWarp)})`);
          gradient.addColorStop(1, 'transparent');

          ctx.beginPath();
          ctx.moveTo(drawX, drawY - warpLength);
          ctx.lineTo(drawX, drawY + warpLength);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = star.size * (1 + currentWarp * 3);
          ctx.lineCap = 'round';
          ctx.stroke();

          // Add a vibrant blue core to match the screenshot
          if (currentWarp > 0.4) {
            ctx.beginPath();
            ctx.arc(drawX, drawY, star.size * (1 + currentWarp), 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${currentOpacity})`;
            ctx.fill();
            
            // Outer glow
            const glow = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, star.size * 10 * currentWarp);
            glow.addColorStop(0, `hsla(${hue}, 100%, 60%, ${currentOpacity * 0.6})`);
            glow.addColorStop(1, 'transparent');
            ctx.fillStyle = glow;
            ctx.fill();
          }
        } else {
          // Draw star core
          ctx.beginPath();
          ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue}, 89%, ${lightness}%, ${currentOpacity})`;
          ctx.fill();

          // Add glow for larger/closer stars
          if (star.size > 1 && star.layer >= 1) {
            const gradient = ctx.createRadialGradient(
              drawX, drawY, 0,
              drawX, drawY, star.size * 4
            );
            gradient.addColorStop(0, `hsla(${hue}, 89%, 70%, ${currentOpacity * 0.4})`);
            gradient.addColorStop(0.5, `hsla(${hue}, 89%, 60%, ${currentOpacity * 0.1})`);
            gradient.addColorStop(1, 'transparent');
            ctx.beginPath();
            ctx.arc(drawX, drawY, star.size * 4, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
          }
        }

        // Slow drift + Warp speed
        const driftSpeed = star.speed * deltaTime * 30;
        const warpSpeed = currentWarp * 2000 * deltaTime;
        star.y += driftSpeed + warpSpeed;
        star.x += star.speed * deltaTime * 5;

        // Wrap around
        if (star.y > canvas.height + 100) {
          star.y = -100;
          star.x = Math.random() * canvas.width;
        }
        if (star.x > canvas.width + 10) {
          star.x = -10;
        }
      });

      // Add occasional shooting star
      if (Math.random() < 0.001 + currentWarp * 0.05) {
        drawShootingStar(ctx, canvas.width, canvas.height, currentWarp);
      }

      animationId = requestAnimationFrame(animate);
    };

    const drawShootingStar = (ctx: CanvasRenderingContext2D, width: number, height: number, warp: number) => {
      const startX = Math.random() * width;
      const startY = Math.random() * height * 0.5;
      const length = (50 + Math.random() * 100) * (1 + warp * 5);
      const angle = Math.PI / 4 + Math.random() * 0.5;

      const gradient = ctx.createLinearGradient(
        startX, startY,
        startX + Math.cos(angle) * length,
        startY + Math.sin(angle) * length
      );
      gradient.addColorStop(0, `hsla(199, 89%, 80%, ${0.8 + warp * 0.2})`);
      gradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX + Math.cos(angle) * length, startY + Math.sin(angle) * length);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2 + warp * 4;
      ctx.stroke();
    };

    animate(performance.now());

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [starLayers, mouseX, mouseY]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default StarField;
