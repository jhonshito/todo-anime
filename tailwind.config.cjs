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
        "nuevo" : "rgba(227, 232, 234, .75)",
        "dark" : "#000000",
        "azul" : "#27ADAC",
        "nav" : "#00051de8",
        "verde": "#01AE43",
        "sus-1" : "#d4edda",
        "sus-2": "#155724",
        "sus-3": "#c3e6cb"
      }
    },
  },
  plugins: [],
}
