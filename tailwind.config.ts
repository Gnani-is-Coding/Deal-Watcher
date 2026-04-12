/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Legacy (kept for any remaining references)
        primary: {
          DEFAULT: "#F87171",
          orange: "#D48D3B",
          green:  "#34D399",
        },
        secondary: "#282828",

        // Glass design tokens
        glass: {
          white:  "rgba(255,255,255,0.07)",
          border: "rgba(255,255,255,0.16)",
          hover:  "rgba(255,255,255,0.13)",
          heavy:  "rgba(0,0,0,0.45)",
        },
        accent: {
          purple: "#8B5CF6",
          blue:   "#3B82F6",
          teal:   "#14B8A6",
          red:    "#F87171",
        },
        surface: {
          bg:   "#08080F",
          mid:  "#10101A",
          card: "#18182A",
        },

        // Text palette
        "text-primary":   "#F8FAFC",
        "text-secondary": "#94A3B8",
        "text-muted":     "#64748B",

        // Keep these for backward compat
        "gray-200": "#EAECF0",
        "gray-300": "#D0D5DD",
        "gray-500": "#667085",
        "gray-600": "#475467",
        "gray-700": "#344054",
        "gray-900": "#101828",
        "white-100": "#F4F4F4",
        "white-200": "#EDF0F8",
        "black-100": "#3D4258",
        "neutral-black": "#23263B",
      },
      backdropBlur: {
        glass:  "24px",
        heavy:  "40px",
        subtle: "12px",
      },
      boxShadow: {
        xs:    "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        glass: "0 4px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.10)",
        glow:  "0 0 40px rgba(139,92,246,0.25)",
        card:  "0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
        "card-hover": "0 16px 48px rgba(0,0,0,0.7), 0 0 30px rgba(139,92,246,0.2), inset 0 1px 0 rgba(255,255,255,0.12)",
        nav:   "0 8px 32px rgba(0,0,0,0.4)",
      },
      maxWidth: {
        "10xl": "1440px",
      },
      fontFamily: {
        inter:       ["Inter", "sans-serif"],
        spaceGrotesk: ["Space Grotesk", "sans-serif"],
      },
      borderRadius: {
        10: "10px",
      },
      backgroundImage: {
        "mesh-gradient":
          "radial-gradient(ellipse at 0% 0%, rgba(99,51,255,0.25) 0%, transparent 55%), radial-gradient(ellipse at 100% 100%, rgba(139,92,246,0.2) 0%, transparent 55%), radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 60%)",
        "glass-shine":
          "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 60%)",
        "accent-gradient":
          "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)",
      },
    },
  },
  plugins: [],
};
