import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        shell: {
          primary: "#9b87f5",
          secondary: "#7a66d9",
        },
        ocean: {
          light: "#0EA5E9",
          dark: "#0284C7",
        },
        coral: "#F2FCE2",
      },
      fontFamily: {
        fredoka: ["Fredoka", "sans-serif"],
      },
      keyframes: {
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "bubble-float": {
          "0%": { transform: "translateY(100vh) scale(0)" },
          "100%": { transform: "translateY(-100px) scale(1)" },
        },
        "pull-string": {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(20px)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "bubble-float": "bubble-float 15s linear infinite",
        "pull-string": "pull-string 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;