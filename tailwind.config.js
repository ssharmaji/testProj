const colors = require('tailwindcss/colors');

module.exports = {
  mode:'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
    },
    extend: {
      backgroundImage: (theme) => ({
        'bopp-weave': "url('/Anduro_BOPP_weave21500SM.jpg')",
      }),
      colors: {
        'anduro-blue': '#003a64',
        steel: {
          50: '#f4f8f9',
          100: '#ddf1fa',
          200: '#b5e1f4',
          300: '#81c3e3',
          400: '#4a9ecd',
          500: '#367db5',
          600: '#2d629c',
          700: '#254a79',
          800: '#003a64',
          900: '#101e38',
        },
        rose: colors.rose,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
