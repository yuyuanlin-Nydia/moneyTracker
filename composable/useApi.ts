const useApi = function (url: string, body: Record<string, any> = {}): Promise<any> {
  const { $toast } = useNuxtApp()
  const origin = useRequestURL().origin
  return useFetch(url, {
    baseURL: `${origin}/api`,
    method: 'POST',
    body,
    credentials: 'include',
    watch: false,
    onResponseError({ response }) {
      // 處理請求回應發生的錯誤
      console.error(response)
    },
  })
    .then((res) => {
      const data: any = res.data.value
      const error = res.error.value
      if (data) {
        if (data.error)
          $toast.error(data.error.message)

        return data
      }

      if (error)
        console.error(error)
    })
}

// Log In & Sign Up & Log out
export async function logIn(query: logInReq) {
  return await useApi('/user/logIn', query)
}

export async function signUp(query: signUpReq) {
  return await useApi('/user/signUp', query)
}

export async function getUser(): Promise<getUserRes> {
  return await useApi('/user/getUser')
}

export async function logOutUser(query: logoutReq) {
  return await useApi('/user/logOut', query)
}

// Overview page
export async function getLatestWallet(): Promise<getLatestWalletRes> {
  return await useApi('/wallet/getLatestWallet')
}

export async function getWalletTotalAmount(): Promise<getWalletTotalAmountResObj[]> {
  return await useApi('/wallet/getWalletTotalAmount')
}

export async function getWalletAnalysis(type: string): Promise<getWalletAnalysisRes> {
  return await useApi('/wallet/getWalletAnalysis', { type })
}

// Wallet page
export async function getWallet(query: IWalletQuery): Promise<getWalletRes[]> {
  return await useApi('/wallet/getAll', query)
}

export function addSingleWallet(query: IWalletItem) {
  return useApi('/wallet/addOne', query)
}

export function editSingleWallet(query: IWalletItem) {
  return useApi('/wallet/editOne', query)
}

export function editSingleWalletCategory(query: Pick<IWalletItem, '_id' | 'category'>[]) {
  return useApi('/wallet/editCategory', query)
}

export function deleteSingleWallet(id: string) {
  return useApi('/wallet/deleteOne', { id })
}

// Analysis Page
export function getAnalysisData(query: Pick<IWalletQuery, 'date' | 'type'>): Promise<getAnalysisDataRes> {
  return useApi('/analysis/getData', query)
}

export function getWalletRateAndTotal(): Promise<getWalletRateAndTotalRes[]> {
  return useApi('/analysis/getWalletRateAndTotal')
}
