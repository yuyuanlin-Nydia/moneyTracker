import { Wallet } from '.';

export default defineEventHandler(async(event) => {
  try {
    const body = await readBody(event)
    const user = event.context.user
    const date = new Date();
    const totalByCategoryList = await Wallet.aggregate([
      { $match: { 
          _id: { $in: user.wallet },
          type: body.type,
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
    return totalByCategoryList[0] || null
  } catch (err) {
    console.log(err)
  }
})