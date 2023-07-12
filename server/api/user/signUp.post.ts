import { MongoServerError } from 'mongodb'
import { User } from '.'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    // 從 req.body 獲取驗證資訊，並在資料庫存與該用戶
    const user = await User.create(body)
    // 為該成功註冊之用戶產生 JWT
    const token = await user.generateAuthToken()

    // 回傳該用戶資訊及 JWT
    return {
      success: true,
      message: {
        user,
        token,
      },
    }
  }
  catch (err: any) {
    console.error(err)
    if (err instanceof MongoServerError && err.code === 11000)
      err.message = 'Account already exists! Please change.'

    return {
      success: false,
      error: {
        code: 1002,
        message: err.message,
      },
    }
  }
})
