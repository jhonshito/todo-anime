/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "morado": "#0F172A",
        "moradito": "#1E293B",
        "nuevo" : "rgba(227, 232, 234, .75)"
      }
    },
  },
  plugins: [],
}
