module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // false or 'media'

  theme: {
    extend: {
      fontFamily: {
        Merriweather: "Merriweather",
        Ubuntu: "Ubuntu Mono",
        Monoton: "Monoton",
      },
      colors: {
        "black-p": "#1E1E28",
        "black-p-l": "#2D2F33",
        "black-s": "#FFC107",
        "white-c": "#F7F8FB",
      },
    },
  },
  plugins: [],
}
