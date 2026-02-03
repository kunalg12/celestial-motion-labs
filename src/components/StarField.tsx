import { useRef, useEffect, useMemo } from 'react';
import { MotionValue } from 'framer-motion';

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

  const starLayers = useMemo(() => ({
    far: { count: 180, speedMultiplier: 0.05, sizeRange: [0.5, 1.0], parallaxFactor: 0.02 },
    mid: { count: 120, speedMultiplier: 0.1, sizeRange: [0.8, 1.5], parallaxFactor: 0.05 },
    near: { count: 60, speedMultiplier: 0.2, sizeRange: [1.5, 3], parallaxFactor: 0.1 },
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

      ctx.clearRect(0, 0, canvas.width, canvas.height);

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

        // Twinkle effect
        const twinkle = Math.sin(currentTime * 0.001 * star.twinkleSpeed + star.twinkleOffset);
        const currentOpacity = star.opacity * (0.5 + twinkle * 0.5);

        // Draw position with parallax
        const drawX = star.x + offsetX;
        const drawY = star.y + offsetY;

        // Draw star core
        const hue = 199 + star.layer * 5; // Blue-cyan range
        const lightness = 60 + star.layer * 10;
        
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

        // Slow drift
        const driftSpeed = star.speed * deltaTime * 30;
        star.y += driftSpeed;
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
      if (Math.random() < 0.001) {
        drawShootingStar(ctx, canvas.width, canvas.height);
      }

      animationId = requestAnimationFrame(animate);
    };

    const drawShootingStar = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const startX = Math.random() * width;
      const startY = Math.random() * height * 0.5;
      const length = 100 + Math.random() * 200;
      const angle = Math.PI / 4 + Math.random() * 0.2;

      const gradient = ctx.createLinearGradient(
        startX, startY,
        startX + Math.cos(angle) * length,
        startY + Math.sin(angle) * length
      );
      gradient.addColorStop(0, 'hsla(199, 89%, 85%, 0.9)');
      gradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX + Math.cos(angle) * length, startY + Math.sin(angle) * length);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
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
