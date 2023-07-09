export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUser()
  const { isLoggedIn } = storeToRefs(user);
  const token = useCookie('token');
  if (token.value) {
    isLoggedIn.value = true; // update the state to authenticated
  }
  
  if (!user.isLoggedIn ){
    return navigateTo('/')
  }
})
