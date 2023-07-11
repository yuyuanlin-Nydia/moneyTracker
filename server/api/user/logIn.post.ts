import { User } from '.';

export default defineEventHandler(async (event) =>{
    try {
        const body = await readBody(event)
        const userData = await User.findByCredentials(body.account, body.password)
        const user = await User.findOneAndUpdate(
          { account: userData.account }
        )
        const token = await user!.generateAuthToken()
        // 回傳該用戶資訊及 JWT
        setCookie(event, 'token', token )
        return {
          success: true,
          message: {
            user,
            token
          }
        }
      } catch (err: any ) {
        console.log(err.message)
        return {
          success: false,
          error: {
            code: 1001,
            message: err.message
          }
        }
      }
})