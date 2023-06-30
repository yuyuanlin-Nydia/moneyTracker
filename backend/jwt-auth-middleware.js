const User = require('./models/user')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  try {
    // 從來自客戶端請求的 header 取得和擷取 JWT
    const token = req.cookies.token;
    if (!token) { throw new Error('Need token to proceed!') } 
    // // 驗證 Token
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    // // 找尋符合用戶 id 和 Tokens 中包含此 Token 的使用者資料
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
    // // 若沒找到此用戶，丟出錯誤【
    if (!user) { throw new Error('User not found!') }
    // // 將 token 存到 req.token 上供後續使用
    req.token = token
    // // 將用戶完整資料存到 req.user 上供後續使用
    req.user = user
    next()
  } catch (err) {
    console.log(err)
    res.status(401).send({ error: err.message })
  }
}
