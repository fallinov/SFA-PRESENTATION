export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2025-03-15',

  modules: [
    '@nuxt/ui',
    'nuxt-auth-utils',
  ],

  css: ['~/assets/css/main.css'],

  // Polices locales (pas de CDN)
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: '/static/fonts.css' },
      ],
    },
  },

  runtimeConfig: {
    // Clé API Anthropic (NUXT_ANTHROPIC_API_KEY)
    anthropicApiKey: '',
    // Secret session (NUXT_SESSION_PASSWORD)
    session: {
      password: '',
    },
  },

  devtools: { enabled: true },
})
