const colorize = require('./index.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        'water': {
          'lighter': 'sky.500.whiten(.1).lighten(.50)',
          'light': 'sky.500.whiten(.1).lighten(.25)',
          DEFAULT: 'sky.500.whiten(.1)',
          'dark': 'sky.500.whiten(.1).darken(.25)',
          'darker': 'sky.500.whiten(.1).darken(.50)',
        }
      }
    },
  },
  plugins: [
    colorize()
  ],
}
