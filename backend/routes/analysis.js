const auth = require("../jwt-auth-middleware.js");
const express = require("express");
const Wallet = require("../models/wallet.js");
const analysisRouter = express.Router();
const { getLastMonth, getDiffDays } = require("../helper.js");

analysisRouter.post("/getWalletRateAndTotal", async (req, res) => {
  try {
    const now = new Date();
    const current = now.getFullYear() + "-" + (now.getMonth() + 1);
    const lastMonth = getLastMonth().year + "-" + getLastMonth().month;
    const lastYear = now.getFullYear() - 1 + "-" + (now.getMonth() + 1);
    // Income
    const incomeResult = await Wallet.aggregate([
      {
        $match: {
          type: "Income",
          $expr: {
            $in: [
              { $year: "$date" },
              [now.getFullYear() - 1, now.getFullYear()],
            ],
            $in: [
              { $month: "$date" },
              [getLastMonth().month, now.getMonth() + 1],
            ],
          },
        },
      },
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          total: { $sum: "$amount" },
        },
      },
      {
        $project: {
          date: {
            $concat: [
              { $toString: "$_id.year" },
              "-",
              { $toString: "$_id.month" },
            ],
          },
          total: 1,
          _id: 0,
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
          stats: {
            $map: {
              input: [lastYear, lastMonth, current],
              as: "date",
              in: {
                $let: {
                  vars: {
                    dateIndex: { $indexOfArray: ["$stats.date", "$$date"] },
                  },
                  in: {
                    $cond: {
                      if: { $ne: ["$$dateIndex", -1] },
                      then: { $arrayElemAt: ["$stats", "$$dateIndex"] },
                      else: { date: "$$date", total: 0 },
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
      }
    ]);
    const incomeTotal = incomeResult.reduce((newArr, result) => {
      newArr.push(result.total);
      return newArr;
    }, []);
    const [lastYearIncome, lastMonthIncome, currentIncome] = incomeTotal;
    const incomeMoM = (
      ((currentIncome - lastMonthIncome) / lastMonthIncome) *
      100
    ).toFixed(2);
    const incomeYoY = (
      ((currentIncome - lastYearIncome) / lastYearIncome) *
      100
    ).toFixed(2);
    const income = {
      type: 'Income', 
      total: currentIncome || 0,
      MoM: incomeMoM === "Infinity" ||  incomeMoM === "NaN" ? '0.00' : incomeMoM,
      YoY: incomeYoY === "Infinity" ||  incomeYoY === "NaN" ? '0.00' : incomeYoY,
    };
    // Expense
    const expenseResult = await Wallet.aggregate([
      {
        $match: {
          type: "Expense",
          $expr: {
            $in: [
              { $year: "$date" },
              [now.getFullYear() - 1, now.getFullYear()],
            ],
            $in: [
              { $month: "$date" },
              [getLastMonth().month, now.getMonth() + 1],
            ],
          },
        },
      },
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          total: { $sum: "$amount" },
        },
      },
      {
        $project: {
          date: {
            $concat: [
              { $toString: "$_id.year" },
              "-",
              { $toString: "$_id.month" },
            ],
          },
          total: 1,
          _id: 0,
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
          stats: {
            $map: {
              input: [lastYear, lastMonth, current],
              as: "date",
              in: {
                $let: {
                  vars: {
                    dateIndex: { $indexOfArray: ["$stats.date", "$$date"] },
                  },
                  in: {
                    $cond: {
                      if: { $ne: ["$$dateIndex", -1] },
                      then: { $arrayElemAt: ["$stats", "$$dateIndex"] },
                      else: { date: "$$date", total: 0 },
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
    ]);
    const expenseTotal = expenseResult.reduce((newArr, result) => {
      newArr.push(result.total);
      return newArr;
    }, []);
    const [lastYearExpense, lastMonthExpense, currentExpense] = expenseTotal;
    const expenseMoM = (
      ((currentExpense - lastMonthExpense) / lastMonthExpense) *
      100
    ).toFixed(2);
    const expenseYoY = (
      ((currentExpense - lastYearExpense) / lastYearExpense) *
      100
    ).toFixed(2);
    const expense = {
      type: 'Expense', 
      total: currentExpense || 0,
      MoM: expenseMoM === "Infinity" || expenseMoM === "NaN" ? "0.00" : expenseMoM,
      YoY: expenseYoY === "Infinity" || expenseYoY === "NaN" ? "0.00" : expenseYoY,
    };

    res.status(200).send([income, expense]);
  } catch (err) {
    console.log(err);
  }
});

analysisRouter.post('/getData', async (req, res) => {
  try{
    const { type, date } = req.body
    //Line
    let mapDateStart= new Date(date[0]);
    mapDateStart = mapDateStart.setDate(mapDateStart.getDate()+1)
    const diffDays = getDiffDays(date[0], date[1])
    const lineData = await Wallet.aggregate([
      {
        $match:{
          type,
          date: { $gte: new Date(date[0]), $lte: new Date(date[1]) }
        } 
      }, 
      { $facet: {
        data: [
          {$group: {_id: "$date",total: { $sum: "$amount" }, tasks: {$push: "$$ROOT"} }},
          {$project: { date: "$_id", tasks: 1, total: 1}}
        ]
      }},
      { $addFields: {
        dates: { $map: {
            input: {$range: [0, diffDays + 1]},
            // maybe more dynamic with $dateDiff -> { $dateDiff: { startDate: new Date("2022-10-19"), endDate: new Date("2022-10-26") }, unit: "day" } }
            in: {
              date: {
                $dateAdd: {
                  startDate: new Date(mapDateStart),
                  unit: "day",
                  amount: "$$this"
                }
              },
              tasks: []
            }
          }}
      }},
      { $project: {data: {$concatArrays: ["$data", "$dates"]}}},
      { $unwind: "$data"},
      { $group: {
        _id: { year: { $year: "$data.date" }, month: { $month: "$data.date" }, day: { $dayOfMonth: "$data.date" }, }, 
        "tasks": {$first: "$data.tasks"},
        "total": {$first: {$sum: "$data.total"}}       
      }},
      { $project: { 
          _id: 0, 
          date: "$_id",
          tasks: 1,
          total:1, 
          month: "$_id.month",
          day: "$_id.day",
      }},
      { $sort: { date: 1 }},
      { $group: {
          _id: null,
          data: {
            $push: {
              date: {
                $concat: [ 
                  { $toString: "$month" },
                  "/",
                  { $toString: "$day" }
                ],
              },
              total: "$total"
            }
          }
        }
      },
      { $project: {
          label:"$data.date",
          total: "$data.total", 
          _id: 0 
        }
      }
    ])
    //Top
    const top5 = await Wallet.find({
      type,
      date: { $gte: new Date(date[0]), $lte: new Date(date[1]) }
    }).sort({ amount: -1 })
      .limit(5);

    // Doughnut
    const totalByCategoryList = await Wallet.aggregate([
      { $match: {
          type,
          date: { $gte: new Date(date[0]), $lte: new Date(date[1]) }
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

    res.status(200).send({
      lineData: lineData[0],
      top5, 
      doughnutData: totalByCategoryList[0]
    });
  }catch(err){
    console.log(err)
  }
})
module.exports = { analysisRouter };
