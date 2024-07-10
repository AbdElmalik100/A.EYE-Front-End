export default defineNuxtRouteMiddleware((to, from) => {
    if (!process.server) {
        const app = useNuxtApp()
        const store = useStore(app.$pinia)
        const router = useRouter()
        
        if ((to.name === 'signup' || to.name === 'login') && store.isAuthenticated()) {
            router.push({
                name: "index"
            })
        }
        if ((to.name === 'account-username' || to.name === 'history-username') && !store.isAuthenticated()) {
            showError({
                statusCode: 404,
                fatal: true
            })
        }
    }
})