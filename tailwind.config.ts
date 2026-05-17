import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border) / 0.07)",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        brand: {
          violet: "hsl(var(--brand-violet))",
          blue: "hsl(var(--brand-blue))",
          cyan: "hsl(var(--brand-cyan))",
          amber: "hsl(var(--brand-amber))",
        },
        cosmic: {
          deep: "hsl(var(--cosmic-deep))",
          void: "hsl(var(--cosmic-void))",
          navy: "hsl(var(--cosmic-navy))",
        },
        orbital: { blue: "hsl(var(--orbital-blue))" },
        star: { glow: "hsl(var(--star-glow))" },
        nebula: { purple: "hsl(var(--nebula-purple))" },
        aurora: { green: "hsl(var(--aurora-green))" },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border) / 0.1)",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #7C3AED 0%, #2563EB 50%, #06B6D4 100%)',
        'gradient-brand-soft': 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(37,99,235,0.1) 50%, rgba(6,182,212,0.15) 100%)',
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up":   { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "orbit-spin":     { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } },
        "float":          { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-20px)" } },
        "pulse-orb":      { "0%, 100%": { transform: "scale(1)", opacity: "0.3" }, "50%": { transform: "scale(1.08)", opacity: "0.5" } },
        "fade-up":        { from: { opacity: "0", transform: "translateY(30px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "marquee":        { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "orbit-slow":     "orbit-spin 120s linear infinite",
        "orbit-medium":   "orbit-spin 60s linear infinite",
        "orbit-fast":     "orbit-spin 30s linear infinite",
        "float":          "float 6s ease-in-out infinite",
        "pulse-orb":      "pulse-orb 8s ease-in-out infinite alternate",
        "fade-up":        "fade-up 0.8s ease-out forwards",
        "marquee":        "marquee 40s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
