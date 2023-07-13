export default defineNuxtRouteMiddleware(() => {
  const user = useUserStore()
  const { isLoggedIn } = storeToRefs(user)
  const token = useCookie('token')
  if (token.value)
    isLoggedIn.value = true // update the state to authenticated

  if (!user.isLoggedIn)
    return navigateTo('/')
})
