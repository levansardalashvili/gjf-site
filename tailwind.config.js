/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
      ink: "#ffffff",
      "ink-2": "#f9f7f5",
      parchment: "#f2ece0",
      crimson: "#5c1a28",
      "crimson-dark": "#42121c",
      gold: "#7a2436",
      line: "rgba(0,0,0,0.08)",
      offwhite: "#201d1a",
    },
      fontFamily: {
        serif: ["'Noto Serif Georgian'", "serif"],
        sans: ["'Noto Sans Georgian'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
