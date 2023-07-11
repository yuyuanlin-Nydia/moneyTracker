import { Wallet } from '.';

export default defineEventHandler(async(event) => {
  try {
    const user = event.context.user
    const date = new Date();
    const totalByTypeList = await Wallet.aggregate([
      {
        $match: {
          _id: { $in: user.wallet },
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
    const noMatchResult = [
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
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
  }
})