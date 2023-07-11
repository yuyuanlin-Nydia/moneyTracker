export default defineEventHandler(async (event) =>{
  try {
    const user = event.context.user
    // 篩選掉當前的 Token
    user.tokens = user.tokens.filter((token: any) => token.token !== token)
    // 將包含剩餘 Token 的使用者資料存回資料庫
    await user.save()
    deleteCookie(event, 'token')

    return { success: true, message: null }
  } catch (err: any) {
    return {
      success: false,
      error: {
        code: 1003,
        message: err.message
      }
    }
  }
})