// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    ['@pinia/nuxt', {
      autoImports: ['defineStore', 'acceptHMRUpdate'],
    }],
    'nuxt-icon',
  ],
  imports: { // 自動import 不用import {useUser} from '~/stores/User'
    dirs: ['stores', 'const', 'helper'],
  },
  css: [
    '@/assets/css/main.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
})
