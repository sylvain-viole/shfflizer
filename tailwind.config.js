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
        primary: "#ffa66b",
        primary_over: "rgb(255, 102, 0)",
      },
      transitionDuration: {
        'slw': '1000ms',
        'norm': '500ms',
        'fst': '250ms'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
