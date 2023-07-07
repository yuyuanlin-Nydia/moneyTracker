const express = require('express')
const Wallet = require('../models/wallet.js')
const User = require('../models/user.js')
const walletRouter = express.Router()
const { mergeArrays } = require("../helper.js")

// INDEX PAGE
walletRouter.post('/getLatestWallet', async (req, res) => {
  try {
    const income = await Wallet.find({type: "Income", _id: { $in: req.user.wallet }}).sort({date: -1}).limit(3)
    const expense = await Wallet.find({type: "Expense", _id: { $in: req.user.wallet }}).sort({date: -1}).limit(3)
    res.status(200).send({ income, expense })  
  } catch (err) {
    console.log(err)
  }
})

walletRouter.post('/getWalletTotalAmount', async (req, res) => {
  try {
    const date = new Date();
    const totalByTypeList = await Wallet.aggregate([
      {
        $match: {
          _id: { $in: req.user.wallet },
          date: {
            $gte: new Date(date.getFullYear(), date.getMonth(), 1), 
            $lte: new Date(date.getFullYear(), date.getMonth() + 1, 0) 
          },
        },
      },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
      {
        $group: {
          _id: null,
          stats: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          type: "$_id",
          total: 1,
          _id: 0,
          stats: {
            $map: {
              input: ["Income", "Expense"],
              as: "type",
              in: {
                $let: {
                  vars: {
                    dateIndex: {
                      $indexOfArray: [
                        "$stats._id",
                        "$$type",
                      ],
                    },
                  },
                  in: {
                    $cond: {
                      if: {
                        $ne: ["$$dateIndex", -1],
                      },
                      then: {
                        $arrayElemAt: [
                          "$stats",
                          "$$dateIndex",
                        ],
                      },
                      else: {
                        _id: "$$type",
                        total: 0,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      {
        $unwind: "$stats",
      },
      {
        $replaceRoot: {
          newRoot: "$stats",
        },
      },
    ])
    noMatchResult = [
      {
        "_id": "Income",
        "total": 0
      },
      {
        "_id": "Expense",
        "total": 0
      }
    ]
    const result = totalByTypeList.length ? totalByTypeList : noMatchResult
    res.status(200).send(result)  
  } catch (err) {
    console.log(err)
  }
})

walletRouter.post('/getWalletAnalysis', async (req, res) => {
  try {
    const date = new Date();
    const totalByCategoryList = await Wallet.aggregate([
      { $match: { 
          _id: { $in: req.user.wallet },
          type: req.body.type,
          date: { 
            $gte: new Date(date.getFullYear(), date.getMonth(), 1), 
            $lte: new Date(date.getFullYear(), date.getMonth() + 1, 0) 
          }
        } 
      },
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
          _id: { $in: req.user.wallet },
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
    const newItem = await Wallet.create(req.body)
    await User.updateOne(
      { _id: req.user._id },
      { $push: { wallet: newItem._id } }
    )
    res.status(200).send({
      success: true
    })
  } catch (err) {
    console.log(err)
  }
})


walletRouter.post('/edit', async (req, res) => {
  try {
    await Wallet.findByIdAndUpdate(req.body._id, req.body)
    res.status(200).send({
      success: true
    })  
  } catch (err) {
    console.log(err)
  }
})

walletRouter.post('/editCategory', async (req, res) => {
  try {
    req.body.forEach(async (item)=>{
      await Wallet.findByIdAndUpdate(item._id, {category: item.category})
    })
    res.status(200).send({
      success: true
    })
  } catch (err) {
    console.log(err)
  }
})

walletRouter.post('/deleteOne', async (req, res) => {
  try {
    const deleteItem = await Wallet.findByIdAndDelete(req.body.id)
    await User.updateOne(
      { _id: req.user._id },
      { $pull: { wallet: deleteItem._id } }
    )
    res.status(200).send({
      success: true
    })  
  } catch (err) {
    console.log(err)
  }
})


module.exports = { walletRouter }