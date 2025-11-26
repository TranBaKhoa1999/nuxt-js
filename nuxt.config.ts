// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    css: ['~/assets/styles/style.css', 'flowbite/dist/flowbite.min.css'],
    modules: ['@nuxtjs/tailwindcss'],

    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'localhost',
            apiPrefix: process.env.NUXT_PUBLIC_API_PREFIX || 'prefix',
        }
    }
})