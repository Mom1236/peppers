import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        axiom: {
          light: "#31a0d3",
          deep: "#134586",
          white: "#FFFFFF",
          gray: "#E5E7EB",
          ink: "#0B1220",
        },
      },
      boxShadow: {
        glow: "0 0 30px rgba(49,160,211,0.35)",
        soft: "0 10px 30px rgba(2,6,23,0.10)",
      },
      backgroundImage: {
        "dna-grid":
          "radial-gradient(circle at 20% 20%, rgba(49,160,211,0.22), transparent 40%), radial-gradient(circle at 80% 30%, rgba(19,69,134,0.22), transparent 40%), radial-gradient(circle at 40% 80%, rgba(49,160,211,0.16), transparent 45%)",
        "molecule":
          "radial-gradient(circle at 10% 20%, rgba(49,160,211,0.18), transparent 25%), radial-gradient(circle at 70% 30%, rgba(19,69,134,0.18), transparent 25%), radial-gradient(circle at 40% 70%, rgba(49,160,211,0.14), transparent 28%)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "0.95" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
