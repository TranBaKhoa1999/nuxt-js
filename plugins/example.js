export default defineNuxtPlugin((nuxtApp) => {
    addRouteMiddleware('example', (to, from) => {
        console.log('Route middleware from plugin is running 2')
    }, { global: true })
})