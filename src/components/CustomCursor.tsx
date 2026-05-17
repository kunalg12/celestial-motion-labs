import { useEffect, useRef, useState } from 'react';

/**
 * Subtle custom cursor: a soft glowing dot that lags behind the pointer
 * via spring physics. Hides on touch devices and on small viewports.
 */
const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch || window.innerWidth < 768) return;
    setEnabled(true);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let dx = mx, dy = my;
    let rx = mx, ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
    };
    const onDown = () => ringRef.current?.classList.add('scale-75');
    const onUp = () => ringRef.current?.classList.remove('scale-75');
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const interactive = t?.closest('a, button, [role="button"], input, textarea, select, [data-cursor="hover"]');
      ringRef.current?.classList.toggle('cursor-hover', !!interactive);
    };

    const tick = () => {
      dx += (mx - dx) * 0.55;
      dy += (my - dy) * 0.55;
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${dx - 3}px, ${dy - 3}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mouseover', onOver);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-1.5 h-1.5 rounded-full bg-white mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-8 h-8 rounded-full border border-white/60 transition-[transform,width,height,opacity,border-color,background-color] duration-200 ease-out mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      <style>{`
        @media (pointer: fine) and (min-width: 768px) {
          html, body, a, button { cursor: none !important; }
        }
        .cursor-hover {
          width: 56px !important;
          height: 56px !important;
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.9) !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
