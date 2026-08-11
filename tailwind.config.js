/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#fbfaf7",
        "ink-2": "#5c1a28",
        "ink-2-light": "rgba(251,250,247,0.12)",
        parchment: "#f2ece0",
        crimson: "#5c1a28",
        "crimson-dark": "#42121c",
        gold: "#a9791f",
        line: "rgba(20,23,28,0.1)",
        offwhite: "#1c1f24",
      },
      fontFamily: {
        serif: ["'Noto Serif Georgian'", "serif"],
        sans: ["'Noto Sans Georgian'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
