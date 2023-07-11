const { Schema, model } = require('mongoose')
// const { ObjectId } = require('mongodb')

const walletSchema = new Schema({
  type: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  item: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  recordAt: {
    type: Date,
    default: Date.now,
  },
  // postBy: {
  //   type: ObjectId,
  //   require: true
  // }
})
const Wallet = model('wallet', walletSchema)

module.exports = Wallet
