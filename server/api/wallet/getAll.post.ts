import { Wallet } from '.'
import { mergeArrays } from '~/helper/array.helper'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const user = event.context.user
    const { type, category, date } = body
    const result = await Wallet.aggregate([
      {
        $match: {
          _id: { $in: user.wallet },
          type,
          category: { $in: category },
          date: { $gte: new Date(date[0]), $lte: new Date(date[1]) },
        },
      },
      { $group: { _id: '$category', total: { $sum: '$amount' }, list: { $push: '$$ROOT' } } },
      { $sort: { total: -1 } },
    ])
    const resultWithAllCategory = mergeArrays(category, result)
    return resultWithAllCategory
  }
  catch (err) {
    console.error(err)
  }
})
