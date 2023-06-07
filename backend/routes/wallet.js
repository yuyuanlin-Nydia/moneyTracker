const auth = require('../jwt-auth-middleware.js')
const express = require('express')
const Wallet = require('../models/wallet.js')
const walletRouter = express.Router()

walletRouter.post('/getAll', async (req, res) => {
  try {
    const {type, category, date } = req.body
    const result = await Wallet.aggregate([
      { $match: { 
          type,
          category: {$in: category},
          date: { $gte: new Date(date[0]), $lte: new Date(date[1]) }
        } 
      },
      { $group: { _id: "$category", total: { $sum: "$amount" }, list: { $push: "$$ROOT" }} },
      { $sort : { total: -1 } }
    ])
    res.status(200).send(result)
  } catch (err) {
    console.log(err)
  }
})

walletRouter.post('/addOne', async (req, res) => {
  try {
    await Wallet.create(req.body)
    res.status(200).send()
  } catch (err) {
    console.log(err)
  }
})


walletRouter.post('/edit', async (req, res) => {
  try {
    const result = await Wallet.findByIdAndUpdate(req.body._id, req.body)
    console.log(result)
    res.status(200).send()  
  } catch (err) {
    console.log(err)
  }
})

walletRouter.post('/deleteOne', async (req, res) => {
  try {
    console.log(req.body.id)
    await Wallet.findByIdAndDelete(req.body.id)
    res.status(200).send()  
  } catch (err) {
    console.log(err)
  }
})


module.exports = { walletRouter }