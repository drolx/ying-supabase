export default defineNuxtRouteMiddleware((to, _from) => {
    const session = useSupabaseSession()
    const isAuthRoute = to.fullPath.startsWith('/auth') || to.meta.permission === false;

    if(session.value && isAuthRoute) {
        return navigateTo('/');
    }
})
