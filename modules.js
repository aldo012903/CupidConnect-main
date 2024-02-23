export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-swiper',
    '@nuxtjs/google-fonts',
  ],googleFonts: {
    families: {
      'Lovers Quarrel': true,
    },
    display: 'swap', // Specify your desired display option
  },
})