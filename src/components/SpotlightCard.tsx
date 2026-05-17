import { useRef, type ReactNode, type MouseEvent } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Tailwind color for the spotlight, e.g. 'rgba(124,58,237,0.25)' */
  color?: string;
}

/**
 * Card with a cursor-tracked radial spotlight + animated gradient border.
 * Uses CSS custom properties for performance (no React state on mousemove).
 */
const SpotlightCard = ({ children, className = '', color = 'rgba(124,58,237,0.22)' }: SpotlightCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group relative rounded-3xl overflow-hidden border border-white/[0.07] bg-white/[0.02] backdrop-blur-md transition-all duration-500 hover:border-white/15 hover:-translate-y-1 ${className}`}
      style={{ ['--mx' as string]: '50%', ['--my' as string]: '50%' }}
    >
      {/* Cursor spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(360px circle at var(--mx) var(--my), ${color}, transparent 60%)`,
        }}
      />
      {/* Animated gradient border highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(220px circle at var(--mx) var(--my), rgba(255,255,255,0.18), transparent 60%)`,
          WebkitMask: 'linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px',
        } as React.CSSProperties}
      />
      <div className="relative">{children}</div>
    </div>
  );
};

export default SpotlightCard;
