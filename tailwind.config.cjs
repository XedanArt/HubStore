const { defineConfig } = require("tailwindcss");

module.exports = defineConfig({
  content: [
    "./src/renderer/index.html",
    "./src/renderer/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {},
  },

  plugins: [
    function ({ addBase }) {
      addBase({
        ":root": {
          "--color-panel": "#1e1e2e",
          "--color-surface": "#2a2a3c",
          "--color-accent": "#7c3aed",
          "--color-accentSoft": "#9f67ff",
          "--color-text-primary": "#ffffff",
          "--color-text-secondary": "#a1a1b5",
          "--color-border": "#3a3a4d",
          "--color-success": "#22c55e",
          "--color-warning": "#f59e0b",
          "--color-danger": "#ef4444",
        },
      });
    },
  ],
});
