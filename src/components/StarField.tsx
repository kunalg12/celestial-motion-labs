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
  color: string;
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

    const createStar = (layer: number, config: typeof starLayers.far): Star => {
      const colorType = Math.random();
      let hue = 199; // Default Cyan
      if (colorType > 0.9) hue = 263; // Purple
      else if (colorType > 0.95) hue = 30; // Orange-ish
      
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: config.sizeRange[0] + Math.random() * (config.sizeRange[1] - config.sizeRange[0]),
        opacity: 0.3 + Math.random() * 0.7,
        speed: config.speedMultiplier + Math.random() * config.speedMultiplier,
        layer,
        twinkleSpeed: 0.5 + Math.random() * 2,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: `${hue}, 89%`,
      };
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Nebula Effect
      const time = currentTime * 0.0002;
      const nebulaGradient = ctx.createRadialGradient(
        canvas.width * 0.5 + Math.sin(time) * 300,
        canvas.height * 0.5 + Math.cos(time * 0.8) * 200,
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.8
      );
      nebulaGradient.addColorStop(0, 'hsla(263, 70%, 50%, 0.03)'); // Purple core
      nebulaGradient.addColorStop(0.4, 'hsla(199, 89%, 48%, 0.02)'); // Blue mid
      nebulaGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = nebulaGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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
        
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        // Use stored color
        const lightness = 60 + star.layer * 10;
        ctx.fillStyle = `hsla(${star.color}, ${lightness}%, ${currentOpacity})`;
        ctx.fill();

        // Add glow for larger/closer stars
        if (star.size > 1 && star.layer >= 1) {
          const gradient = ctx.createRadialGradient(
            drawX, drawY, 0,
            drawX, drawY, star.size * 3
          );
          gradient.addColorStop(0, `hsla(${star.color}, 70%, ${currentOpacity * 0.3})`);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(drawX, drawY, star.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Slow drift
        const driftSpeed = star.speed * deltaTime * 30;
        star.y += driftSpeed;
        star.x += star.speed * deltaTime * 2;

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
      if (Math.random() < 0.002) {
        drawShootingStar(ctx, canvas.width, canvas.height);
      }

      animationId = requestAnimationFrame(animate);
    };

    const drawShootingStar = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const startX = Math.random() * width;
      const startY = Math.random() * height * 0.5;
      const length = 150 + Math.random() * 300;
      const angle = Math.PI / 4 + (Math.random() * 0.2 - 0.1);
      const speed = 2 + Math.random() * 3;

      // Create a temporary shooting star object to animate (optional, efficiently just draw one frame for now)
      // For simple effect without managing state, we just draw a static streak that fades? 
      // No, strictly drawing once per frame implies it will flicker.
      // To properly animate shooting stars, we need state. 
      // For now, let's keep the simple "streak" effect but make it nicer.
      
      const gradient = ctx.createLinearGradient(
        startX, startY,
        startX + Math.cos(angle) * length,
        startY + Math.sin(angle) * length
      );
      gradient.addColorStop(0, 'hsla(199, 89%, 90%, 0.8)');
      gradient.addColorStop(0.1, 'hsla(199, 89%, 70%, 0.5)');
      gradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX + Math.cos(angle) * length, startY + Math.sin(angle) * length);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.stroke();
      
      // Head glow
      ctx.beginPath();
      ctx.arc(startX, startY, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.shadowColor = 'cyan';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
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
