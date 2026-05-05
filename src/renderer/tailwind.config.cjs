module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          tertiary: "var(--bg-tertiary)",
        },
        surface: {
          base: "var(--surface-base)",
          hover: "var(--surface-hover)",
          active: "var(--surface-active)",
          light: "var(--surface-light)",
        },
        border: {
          base: "var(--border-base)",
          light: "var(--border-light)",
          accent: "var(--accent-primary)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
        },
        accent: {
          primary: "var(--accent-primary)",
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

      boxShadow: {
        glow: "0 0 20px rgba(139, 92, 246, 0.3)",
        "glow-lg": "0 0 40px rgba(139, 92, 246, 0.4)",
        "inner-glow": "inset 0 0 20px rgba(139, 92, 246, 0.1)",
      },
    },
  },
  plugins: [],
};