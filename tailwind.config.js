module.exports = {
  purge: ['./public/**/*.html', './src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        base_gray: '#424950',
        base_gray_dark: '#343a40',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
