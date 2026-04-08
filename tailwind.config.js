/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        paper: "#f8fafc",
        mist: "#e2e8f0",
        brand: "#0ea5e9",
        brandDark: "#0369a1",
        accent: "#f97316",
      },
      boxShadow: {
        glow: "0 20px 80px rgba(14, 165, 233, 0.18)",
      },
      fontFamily: {
        sans: ["Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
