# OrbitX Labs — Premium Redesign Plan

A full pass across the site to apply the new design system, rebuild every section to Awwwards standard, and polish motion + responsiveness.

## 1. Design System & Tokens

**`src/index.css`** — replace token values:
- `--background` → `#06060E`, `--card`/surface → `#0D0D1A`
- `--primary` → violet `#7C3AED`, `--secondary` (new role) → cyan `#06B6D4`, `--accent` → amber `#F59E0B`
- `--foreground` → `#F8FAFC`, `--muted-foreground` → `#94A3B8`
- `--border` → `rgba(255,255,255,0.07)`
- Add `--gradient-brand: linear-gradient(135deg,#7C3AED 0%,#2563EB 50%,#06B6D4 100%)`
- Custom thin violet scrollbar (4px, rounded)
- Page fade-in on mount, smooth scroll

**Typography** — load Syne, Inter, JetBrains Mono from Google Fonts:
- `font-display` → Syne (700/800, wide tracking)
- `font-sans` → Inter (16px, 1.75)
- `font-mono` → JetBrains Mono (counters, tags, badges)
- Update `tailwind.config.ts` fontFamily + add `secondary`, `accent` color mappings, `bg-gradient-brand` utility

## 2. Global Background Layer

New `src/components/CosmicBackground.tsx` mounted once in `Index.tsx` (fixed, `pointer-events-none`, `z-[-1]`):
- Canvas particle starfield (~150 white dots, slow drift, opacity 0.4)
- 2–3 large blurred radial orbs (violet + cyan) with pulse keyframe (scale 1→1.08, opacity 0.3→0.5, 8s alternate)
- SVG noise texture overlay (subtle, mix-blend-overlay)

Retire/merge old `StarField` + `FloatingElements` into this single layer to avoid duplicate motion systems.

## 3. Navbar (`Navbar.tsx`)

- Sticky, full-width, `bg-[rgba(6,6,14,0.7)]` + `backdrop-blur-2xl saturate-180`
- 1px bottom border `rgba(255,255,255,0.06)`
- Logo "OrbitX Labs" in Syne bold + glowing violet orbit dot
- Links: Inter 14px muted → white on hover with gradient underline animation
- CTA pill "Start a Project →" with gradient bg, `rounded-full`, hover shadow `0 0 20px rgba(124,58,237,0.5)`
- Mobile hamburger with slide-down drawer (Framer Motion)

## 4. Hero (`HeroSection.tsx`)

Rebuild around new layout (keep 3D planet but rebalance):
- Pill badge "✦ Digital Agency · Est. 2024" with gradient border + glow
- H1 72–80px (40px mobile), Syne 800, gradient text clip: "We Build Digital Experiences That Move People"
- Subheading Inter 20px muted, max-w 560px
- Primary CTA "See Our Work" gradient + glow; Secondary "Let's Talk" gradient-border ghost that fills on hover
- Stat row: 4 counters in JetBrains Mono ("40+ Projects", "5★ Rating", "3 Years", "100% On-Time") with subtle dividers
- Visual: animated floating orbital card behind/beside text (CSS transforms); keep `Planet3D` as the orbital centerpiece, allowed to bleed
- Staggered fade-up entry (100ms between elements)

## 5. Services (`ServicesSection.tsx`)

- Tag "— What We Do" in violet, heading "Services Built for Impact"
- 3-col responsive glass grid (1/2/3 cols by breakpoint)
- Card: `bg-white/3`, border `white/7`, radius 20px, `backdrop-blur-md`, p-9
- Lucide gradient icon, bold Syne title, 2-line desc, "Learn More →" in violet
- Hover: `-translate-y-2`, glow `0 0 30px rgba(124,58,237,0.25)`
- Replace service list with the 6 requested items (Web Dev, UI/UX, Brand, SaaS Eng, SEO, Motion)

## 6. Projects (`ProjectsSection.tsx`)

- Full-width alternating image/text rows (flip every other)
- Filter tabs "All · Web · Branding · SaaS" with gradient underline on active
- Rounded screenshot mockup with hover `scale-[1.02]` + glow
- Syne project name, pill tags, one-line desc, animated underline "View Project →"
- Mobile: stacked, image on top

## 7. Marquee Strip

New `src/components/Marquee.tsx` placed between Services and Projects (and optionally before Testimonials):
- Infinite horizontal scroll, Syne 14px all-caps, low opacity
- Content list with `·` separators, duplicated for seamless loop

## 8. Testimonials (`TestimonialsSection.tsx`)

- 3-col glass card grid
- 5 amber stars, italic quote, Syne bold name, muted role/company
- Avatar circle with gradient ring

## 9. CTA / Contact (`CTASection.tsx`)

- Full-width band with diagonal violet→cyan gradient
- Noise overlay + vignette
- Large Syne headline "Ready to Build Something Great?"
- Buttons: "Start a Project" (white fill) + "View Our Work" (ghost white)
- Floating animated badge "Currently accepting clients ✦"

## 10. Footer (`Footer.tsx`)

- Matches bg, top edge 1px violet→cyan gradient line
- 4 cols: Logo + tagline / Services / Company / Social (Lucide icons)
- Centered bottom bar `© 2025 OrbitX Labs. All rights reserved.`

## 11. Animations & Polish

- Framer Motion section entrances: fade + y(30→0), stagger 80ms
- Page mount fade-in (400ms) in `Index.tsx` or `App.tsx`
- All interactive elements: pointer cursor, 200–300ms transitions
- Respect `prefers-reduced-motion`
- Reserve space to prevent CLS

## 12. Responsive

- Verify breakpoints sm/md/lg/xl
- Hero H1 clamps to 40px on mobile
- Service grid 1/2/3, projects stack, navbar collapses

## Technical Notes

- Files edited: `src/index.css`, `tailwind.config.ts`, `index.html` (font preconnect + title), `src/pages/Index.tsx`, `src/App.tsx`, `Navbar.tsx`, `HeroSection.tsx`, `ServicesSection.tsx`, `ProjectsSection.tsx`, `TestimonialsSection.tsx`, `CTASection.tsx`, `Footer.tsx`
- Files created: `CosmicBackground.tsx`, `Marquee.tsx`, possibly `StatCounter.tsx`, `GradientButton.tsx`
- Files deprecated/merged: `StarField.tsx`, `FloatingElements.tsx` (folded into `CosmicBackground`)
- Keep existing `Planet3D`, `ContactModal`, `ScrollToTop`, `ScrollProgress`, `LoadingScreen`, `CursorTrail`, `ProcessSection`, `StatsSection`, `AboutSection` — restyled with new tokens, no structural changes unless they conflict with the new hero/stat layout (`StatsSection` may become redundant with hero counters; will keep but visually differentiate)
- All colors via semantic tokens (HSL) — no raw hex in components
- No backend changes
