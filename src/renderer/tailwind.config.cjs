/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0f0f1e",
          secondary: "#1a1a2e",
          tertiary: "#16213e",
        },
        surface: {
          base: "#252541",
          hover: "#2d2d4a",
          active: "#353560",
          light: "#3a3a5c",
        },
        border: {
          base: "#3a3a5c",
          light: "#4a4a6a",
          accent: "#6366f1",
        },
        text: {
          primary: "#f5f5f7",
          secondary: "#a8a8b8",
          tertiary: "#888899",
        },
        accent: {
          primary: "#8b5cf6",
          secondary: "#6366f1",
          success: "#10b981",
          warning: "#f59e0b",
          danger: "#ef4444",
        },
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        glow: "0 0 20px rgba(139, 92, 246, 0.3)",
        "glow-lg": "0 0 40px rgba(139, 92, 246, 0.4)",
        "inner-glow": "inset 0 0 20px rgba(139, 92, 246, 0.1)",
      },
    },
  },
  plugins: [],
};
