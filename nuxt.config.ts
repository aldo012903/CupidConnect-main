// https://nuxt.com/docs/api/configuration/nuxt-config
import modules from './modules'


export default ({
  ...modules,
  serverMiddleware: [
    '~/middleware/cors'
  ],
  swiper: {
    // Swiper options
    //----------------------
    // prefix: 'Swiper',
    // styleLang: 'css',
    // modules: ['navigation', 'pagination'], // all modules are imported by default
  },
  css: [
    '@fortawesome/fontawesome-free/css/all.css',
  ],
  buildModules: [
    '@nuxtjs/google-fonts',
  ],
  googleFonts: {
    families: {
      'Lovers Quarrel': true,
    },
    display: 'swap', 
  },
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Inter:400,700',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Lovers+Quarrel&display=swap',
      },
    ],
  },
})

