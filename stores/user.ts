export const useUser = defineStore('user', {
  state: () => {
    return {
      isLoggedIn: false,
      userInfo: {} as Pick<signUpReq, 'account' | 'userName'>
    }
  },
  getters: {},
  actions: {
    async logIn(query: logInReq) {
      const { success, message } = await logIn(query)
      if(success){
        const token = useCookie('token'); 
        token.value = message.token
        setToken(message.token)
        this.isLoggedIn = true;
        useRouter().push('/user/overview')
      }
    },
    async signUp(query: signUpReq) {
      const { success, message } = await signUp(query)
      if(success){
        const token = useCookie('token'); 
        token.value = message.token
        setToken(message.token)
        this.isLoggedIn = true;
        useRouter().push('/user/overview')
      }
    },
    async getUser() {
      const { success, message } = await getUser()
      if(success && message){
        this.userInfo = message.user;
      }
    },
    async logout(){
      const { success } = await logOutUser({ token: getToken()! })
      if(success){
        const token = useCookie('token'); 
        token.value = ''
        clearToken();
        this.isLoggedIn = false;
        useRouter().push('/')
      }
    }
  },
})

if(import.meta.hot){
 import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot));
}