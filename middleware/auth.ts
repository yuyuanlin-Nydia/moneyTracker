export default defineNuxtRouteMiddleware((to, from) => {
  const isLoggedIn = false
  if (!isLoggedIn)
    return navigateTo({ path: '/login' })
})
