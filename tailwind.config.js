const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}', './src/components/**/*.{js,jsx,ts,tsx,vue}', './src/layouts/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      '2xl': '1535px',

      '1xl': '1355px',

      xl: '1279px',

      lg: '1023px',

      md: '767px',

      sm: '639px',

      pn: '425px',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
