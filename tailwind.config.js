module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Raleway", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      colors: {
        primary: "#cfd3ce",
        primary_over: "#ffa45b",
      },
      transitionDuration: {
        slw: "1000ms",
        norm: "500ms",
        fst: "250ms",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
