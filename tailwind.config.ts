import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        surface: "#141414",
        border: "#1F1F1F",
        "border-light": "#2A2A2A",
        primary: {
          DEFAULT: "#00FF87",
          hover: "#00E876",
          muted: "rgba(0,255,135,0.1)",
          border: "rgba(0,255,135,0.2)",
        },
        accent: {
          DEFAULT: "#FF5A00",
          hover: "#E65000",
          muted: "rgba(255,90,0,0.1)",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#A0A0A0",
          muted: "#606060",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-green": "linear-gradient(135deg, #00FF87 0%, #00C96A 100%)",
        "gradient-dark": "linear-gradient(180deg, #141414 0%, #0A0A0A 100%)",
        "glow-green": "radial-gradient(circle at center, rgba(0,255,135,0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        "glow-green": "0 0 30px rgba(0,255,135,0.3)",
        "glow-green-sm": "0 0 15px rgba(0,255,135,0.2)",
        "card": "0 1px 3px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
      },
      animation: {
        "pulse-green": "pulse-green 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        "pulse-green": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
