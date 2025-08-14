/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    // Dynamic color classes used in services
    "text-cyan-400",
    "text-purple-400",
    "text-emerald-400",
    "text-orange-400",
    "border-cyan-400/20",
    "border-purple-400/20",
    "border-emerald-400/20",
    "border-orange-400/20",
    "hover:bg-cyan-400/10",
    "hover:bg-purple-400/10",
    "hover:bg-emerald-400/10",
    "hover:bg-orange-400/10",
    "hover:text-cyan-300",
    "hover:text-purple-300",
    "hover:text-emerald-300",
    "hover:text-orange-300",
    // Gradient backgrounds
    "from-cyan-500/10",
    "from-purple-500/10",
    "from-emerald-500/10",
    "from-orange-500/10",
    "to-purple-500/10",
    "to-cyan-500/10",
    // Shadow effects
    "shadow-cyan-500/20",
    "shadow-purple-500/20",
    "shadow-emerald-500/20",
    "shadow-orange-500/20",
  ],
  theme: {
    extend: {
      animation: {
        "float-particle": "floatParticle 10s ease-in-out infinite",
        "reverse-float": "floatParticle 10s ease-in-out infinite reverse",
        "orbit-particle": "orbitParticle 14s linear infinite",
      },
      keyframes: {
        floatParticle: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-40px) scale(1.1)" },
        },
        orbitParticle: {
          "0%": { transform: "rotate(0deg) translateY(0) scale(1)" },
          "20%": { transform: "rotate(72deg) translateY(-10px) scale(1.08)" },
          "40%": { transform: "rotate(144deg) translateY(10px) scale(0.96)" },
          "60%": { transform: "rotate(216deg) translateY(-8px) scale(1.12)" },
          "80%": { transform: "rotate(288deg) translateY(8px) scale(0.92)" },
          "100%": { transform: "rotate(360deg) translateY(0) scale(1)" },
        },
      },
      colors: {
        "cb-blue": "#1e3a8a",
        "cb-yellow": "#fbbf24",
        "cb-gray": "#f3f4f6",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        20: "repeat(20, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        10: "repeat(10, minmax(0, 1fr))",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 8s linear infinite",
        glow: "glow 2s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "bounce-slow": "bounce 3s infinite",
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.8s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
          },
          "50%": {
            boxShadow:
              "0 0 30px rgba(6, 182, 212, 0.6), 0 0 40px rgba(147, 51, 234, 0.4)",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": {
            opacity: "0.6",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.05)",
          },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backdropBlur: {
        xs: "2px",
        "4xl": "72px",
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(6, 182, 212, 0.3)",
        "glow-purple": "0 0 20px rgba(147, 51, 234, 0.3)",
        "glow-emerald": "0 0 20px rgba(16, 185, 129, 0.3)",
        "glow-orange": "0 0 20px rgba(249, 115, 22, 0.3)",
      },
    },
  },
  plugins: [],
};
