const auth = require('../jwt-auth-middleware.js')
const express = require('express')
const Wallet = require('../models/wallet.js')
const walletRouter = express.Router()
const { mergeArrays } = require("../helper.js")

// INDEX PAGE
walletRouter.post('/getLatestWallet', async (req, res) => {
  try {
    const income = await Wallet.find({type: "Income"}).sort({date: -1}).limit(3)
    const expense = await Wallet.find({type: "Expense"}).sort({date: -1}).limit(3)
    res.status(200).send({ income, expense })  
  } catch (err) {
    console.log(err)
  }
})

walletRouter.post('/getWalletTotalAmount', async (req, res) => {
  try {
    const type = ["Income", "Expense"]
    const totalByTypeList = await Wallet.aggregate([
      { $group: { _id: "$type", total: { $sum: "$amount" }} },
      { $project: {type: "$_id", total: 1, "_id": 0 }}
    ])

    var mergedList = function(arr1 = [], arr2 = []){
      let res = [];
      res = arr1.map(_id => {
        const index = arr2.findIndex(el => el["type"] == _id);
        const r = index !== -1 ? arr2[index] : { type: _id, total:0 };
        return r;
      });
      return res;
    };

    const result = type.length === totalByTypeList.length
      ? totalByTypeList
      : mergedList(type, totalByTypeList)
    
    res.status(200).send(result)  
  } catch (err) {
    console.log(err)
  }
})

walletRouter.post('/getWalletAnalysis', async (req, res) => {
  try {
    const totalByCategoryList = await Wallet.aggregate([
      { $match: { type: req.body.type} },
      { $group: { _id: "$category", total: { $sum: "$amount" }} },
      { $sort: { _id: 1 } },
      {
        $group: {
          _id: null,
          data: {
            $push: {
              category: "$_id",
              total: "$total"
            }
          }
        }
      },
      { $project: {category: "$data.category",total: "$data.total", _id: 0 }},
    ])
    res.status(200).send(totalByCategoryList[0] || null)  
  } catch (err) {
    console.log(err)
  }
})

// WALLET PAGE
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
    const resultWithAllCategory = mergeArrays(category, result)
    res.status(200).send(resultWithAllCategory)
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
    await Wallet.findByIdAndUpdate(req.body._id, req.body)
    res.status(200).send()  
  } catch (err) {
    console.log(err)
  }
})

walletRouter.post('/editCategory', async (req, res) => {
  try {
    req.body.forEach(async (item)=>{
      await Wallet.findByIdAndUpdate(item._id, {category: item.category})
    })
    res.status(200).send()  
  } catch (err) {
    console.log(err)
  }
})

walletRouter.post('/deleteOne', async (req, res) => {
  try {
    await Wallet.findByIdAndDelete(req.body.id)
    res.status(200).send()  
  } catch (err) {
    console.log(err)
  }
})


module.exports = { walletRouter }