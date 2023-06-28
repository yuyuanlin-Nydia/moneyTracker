export default defineNuxtRouteMiddleware((to, from) => {
  const isLoggedIn = useUser().$state.isLoggedIn
  if (!isLoggedIn){
    return navigateTo('/login')
  }
})
