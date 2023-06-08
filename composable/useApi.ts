
const useApi = function(url: string, body: Record<string, any> = {}): Promise<any>{
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseURL } = runtimeConfig.public
  return useFetch(url,{
    baseURL: apiBaseURL,
    method: "POST",
    body,
    watch: false,
    onResponseError({ request, response, options }) {
      // 處理請求回應發生的錯誤
      console.log(response)
    },
  })
  .then(res => {
    const data = res.data.value
    const error = res.error.value
    if (error) {
      console.log(error)
    } else {
      return data
    }
  })
}

export async function getWallet(query: IWalletQuery): Promise<getWalletRes[]>{
  return await useApi('/wallet/getAll', query)
}

export function addSingleWallet(query: IWalletItem){
  return useApi('/wallet/addOne', query)
}

export function editSingleWallet(query: IWalletItem){
  return useApi('/wallet/edit', query)
}

export function deleteSingleWallet(id: string){
  return useApi('/wallet/deleteOne', { id })
}