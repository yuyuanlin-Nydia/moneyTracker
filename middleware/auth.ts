export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUser()

  if (!user.$state.isLoggedIn || !getToken() ){
    return navigateTo('/')
  }
})
