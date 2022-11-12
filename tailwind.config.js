const plugin = require('tailwindcss/plugin');
const colorize = require('./dist/tailwind-colorize.umd');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        'water': 'blue'
      }
    },
  },
  plugins: [
    typeof colorize === 'function' && colorize()
  ],
}
