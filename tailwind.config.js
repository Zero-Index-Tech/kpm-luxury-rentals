/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.5rem', md: '2.5rem' },
      screens: { sm: '100%', md: '100%', lg: '1280px', xl: '1280px', '2xl': '1280px' },
    },
    extend: {
      colors: {
        // ── V2 "Premium Lifestyle" palette (design.md §2) ─────────────
        ivory: {
          DEFAULT: '#F4F4F2', // customer pale gray — base canvas, text on near-black
          deep: '#E9E9E5', // alternating light bands, card fills
          70: 'rgba(244,244,242,0.7)', // body text on dark bands
          45: 'rgba(244,244,242,0.45)', // muted text on dark bands
        },
        taupe: {
          DEFAULT: '#8A8572', // customer olive — secondary text on light, muted accents
          soft: 'rgba(138,133,114,0.28)', // hairlines on ivory
        },
        charcoal: '#1A1A1B', // primary text on light (customer ink)
        umber: '#6E6A59', // hover states, active pills (customer deep olive)
        ink: {
          DEFAULT: '#121110', // deep sections, primary button fill
          deep: '#0B0A09', // footer background
        },
        'hairline-dark': 'rgba(244,242,239,0.14)', // hairlines on dark
        error: '#B0553D', // warm clay inline form errors

        // ── Concept 1 "KPMLXR" palette (client Figma) ────────────────
        lxr: {
          black: '#0B0B0C', // navbar, dark sections
          panel: '#141416', // dark cards
          ink: '#111112', // primary text on light
          gray: '#F4F4F2', // light section background
          olive: '#8A8572', // olive-taupe accent band/cards
          olivedeep: '#6E6A59',
          muted: '#6E6E6A', // secondary text on light
          mist: '#8C8C88', // muted text on dark
          line: 'rgba(17,17,18,0.10)', // hairlines on light
          linedark: 'rgba(255,255,255,0.10)', // hairlines on dark
          ghost: '#E7E7E3', // giant ghost section titles on light
          sand: '#C7BFAE', // sand colourway accent
        },

        // ── V1 legacy tokens — kept so un-restyled V1 pages still render ──
        night: {
          DEFAULT: '#0A0A0B',
          elevated: '#0E0E11',
          deep: '#080809',
        },
        surface: {
          DEFAULT: '#131316',
          hover: '#1A1A1F',
        },
        gold: {
          DEFAULT: '#C7BFAE', // customer sand
          bright: '#DCD6C9', // lighter sand
          dim: '#8A8572', // customer olive
        },
        'ivory-secondary': '#A3A29C',
        'ivory-muted': '#6E6E6A',
        subtle: 'rgba(255,255,255,0.07)',
        hairline: 'rgba(199,191,174,0.22)',
        success: '#7BA05B',

        // shadcn css-var palette (kept for ui primitives)
        border: "hsl(var(--border))",
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
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
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
      },
      fontFamily: {
        // V2 type system (design.md §3)
        display: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        accent: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // legacy alias so V1 pages degrade gracefully until restyled
        serif: ['Georgia', 'serif'],
        // Concept 2 (V1 dark/gold) type system — namespaced for the unified showcase
        c1serif: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        c1sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Concept 1 (KPMLXR) type system — Montserrat Semibold titles, DM Sans body
        lxrtitle: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        lxrbody: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 24px 60px -24px rgba(18,17,16,0.35)',
        'card-lift': '0 28px 60px -28px rgba(18,17,16,0.28)',
        'nav-pill': '0 16px 40px -20px rgba(18,17,16,0.25)',
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'scroll-dot': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '15%': { opacity: '1' },
          '85%': { opacity: '1' },
          '100%': { transform: 'translateY(34px)', opacity: '0' },
        },
        sheen: {
          from: { transform: 'translateX(-150%) skewX(-20deg)' },
          to: { transform: 'translateX(250%) skewX(-20deg)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: 'marquee 44s linear infinite',
        'scroll-dot': 'scroll-dot 2.2s ease-in-out infinite',
        sheen: 'sheen 0.6s ease-out',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
