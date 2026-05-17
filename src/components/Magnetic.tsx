import { useRef, type ReactNode, type MouseEvent } from 'react';

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/**
 * Magnetic wrapper — children translate toward the cursor on hover.
 * Falls back to no-op on touch devices.
 */
const Magnetic = ({ children, strength = 0.35, className = '' }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate3d(0,0,0)';
  };

  return (
    <div onMouseMove={onMove} onMouseLeave={onLeave} className={`inline-block ${className}`}>
      <div ref={ref} className="transition-transform duration-300 ease-out will-change-transform">
        {children}
      </div>
    </div>
  );
};

export default Magnetic;
