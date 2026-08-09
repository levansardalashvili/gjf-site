/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14171c",
        "ink-2": "#1d2128",
        parchment: "#f2ece0",
        crimson: "#b0242f",
        "crimson-dark": "#7e1721",
        gold: "#c9a227",
        line: "rgba(242,236,224,0.12)",
        offwhite: "#faf7f0",
      },
      fontFamily: {
        serif: ["'Noto Serif Georgian'", "serif"],
        sans: ["'Noto Sans Georgian'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
