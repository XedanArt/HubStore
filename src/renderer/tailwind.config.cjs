const { defineConfig } = require("tailwindcss");

module.exports = defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        panel: "#1e1e2e",
        surface: "#2a2a3c",
        accent: "#7c3aed",
        accentSoft: "#9f67ff",
        "text-primary": "#ffffff",
        "text-secondary": "#a1a1b5",
        border: "#3a3a4d",
        success: "#22c55e",
        warning: "#f59e0b",
        danger: "#ef4444",
      },
      boxShadow: {
        soft: "0 2px 6px rgba(0,0,0,0.25)",
        deep: "0 4px 12px rgba(0,0,0,0.35)",
        accent: "0 0 15px rgba(124, 58, 237, 0.5)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
    },
  },
  plugins: [],
});
