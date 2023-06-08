/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#796597',
          200: '#7E00FC',
          300: '#413254',
          400: '#4F475B',
          500: '#3E374F',
          600: '#3C3147',
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
  plugins: [
  ],
}
