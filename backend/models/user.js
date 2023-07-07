const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
  account: {
    type: String,
    required: [true, 'Account is required.']
  },
  password: {
    type: String,
    required: [true, 'Password is required.']
  },
  userName: {
    type: String,
    required: [true, 'Username is required.']
  },
  registerDate: {
    type: Date,
    default: Date.now
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ],
  wallet: {
    type: Array,
    default: []
  }
})
// 在 userSchema 上建立 Pre middleware 將密碼在儲存(save)前處理
userSchema.pre('save', async function (next) {
  // this 指向目前正被儲存的使用者 document
  const user = this

  // 確認使用者的 password 欄位是有被變更：初次建立＆修改密碼都算
  if (user.isModified('password')) {
    // 透過 bcrypt 處理密碼，獲得 hashed password
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})
// 建立 userSchema 實例(Document)能使用的方法：產生 JWT
userSchema.methods.generateAuthToken = async function () {
  // this 指向當前的使用者實例
  const user = this
  // 產生一組 JWT
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_TOKEN)
  // 將該 token 存入資料庫中：讓使用者能跨裝置登入及登出
  user.tokens = user.tokens.concat({ token })
  await user.save()
  // 回傳 JWT
  return token
}
userSchema.statics.findByCredentials = async (account, password) => {
  // 根據 account 至資料庫找尋該用戶資料
  const user = await User.findOne({ account })
  // 沒找到該用戶時，丟出錯誤訊息
  if (!user) { throw new Error('Account not found!') }
  // 透過 bcrypt 驗證密碼
  const isMatch = await bcrypt.compare(password, user.password)
  // 驗證失敗時，丟出錯誤訊息
  if (!isMatch) { throw new Error('Password is incorrect!') }
  // 驗證成功時，回傳該用戶完整資料
  return user
}
const User = model('users', userSchema)

module.exports = User
