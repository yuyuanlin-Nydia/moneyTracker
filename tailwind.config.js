/** @type {import('tailwindcss').Config} */
const formkitTailwind = require('@formkit/themes/tailwindcss')

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './formkit.config.ts',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#c9b8e3',
          200: '#796597',
          300: '#413254',
          400: '#4F475B',
          500: '#3E374F',
          600: '#3C3147',
          700: '#514464',
        },
        secondary: {
          100: '#F59B33',
          200: '#f3912f',
        },
        pink: {
          100: '#FE3191',
        },
        info: {
          500: '#524a5f',
        },
        blackOpacity: {
          100: 'rgba(0, 0, 0, .7)',
        },
      },
    },
  },
  plugins: [formkitTailwind],
  darkMode: 'class',
}
