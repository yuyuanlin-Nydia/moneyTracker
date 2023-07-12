import { Wallet } from '../wallet'
import { getDiffDays } from '~/helper/time.helper'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const user = event.context.user
    const { type, date } = body
    // Line
    let mapDateStart: any = new Date(date[0])
    mapDateStart = mapDateStart.setDate(mapDateStart.getDate() + 1)
    const diffDays = getDiffDays(date[0], date[1])
    const lineData = await Wallet.aggregate([
      {
        $match: {
          _id: { $in: user.wallet },
          type,
          date: { $gte: new Date(date[0]), $lte: new Date(date[1]) },
        },
      },
      {
        $facet: {
          data: [
            { $group: { _id: '$date', total: { $sum: '$amount' }, tasks: { $push: '$$ROOT' } } },
            { $project: { date: '$_id', tasks: 1, total: 1 } },
          ],
        },
      },
      {
        $addFields: {
          dates: {
            $map: {
              input: { $range: [0, diffDays + 1] },
              // maybe more dynamic with $dateDiff -> { $dateDiff: { startDate: new Date("2022-10-19"), endDate: new Date("2022-10-26") }, unit: "day" } }
              in: {
                date: {
                  $dateAdd: {
                    startDate: new Date(mapDateStart),
                    unit: 'day',
                    amount: '$$this',
                  },
                },
                tasks: [],
              },
            },
          },
        },
      },
      { $project: { data: { $concatArrays: ['$data', '$dates'] } } },
      { $unwind: '$data' },
      {
        $group: {
          _id: { year: { $year: '$data.date' }, month: { $month: '$data.date' }, day: { $dayOfMonth: '$data.date' } },
          tasks: { $first: '$data.tasks' },
          total: { $first: { $sum: '$data.total' } },
        },
      },
      {
        $project: {
          _id: 0,
          date: '$_id',
          tasks: 1,
          total: 1,
          month: '$_id.month',
          day: '$_id.day',
        },
      },
      { $sort: { date: 1 } },
      {
        $group: {
          _id: null,
          data: {
            $push: {
              date: {
                $concat: [
                  { $toString: '$month' },
                  '/',
                  { $toString: '$day' },
                ],
              },
              total: '$total',
            },
          },
        },
      },
      {
        $project: {
          label: '$data.date',
          total: '$data.total',
          _id: 0,
        },
      },
    ])
    // Top
    const top5 = await Wallet.find({
      _id: { $in: user.wallet },
      type,
      date: { $gte: new Date(date[0]), $lte: new Date(date[1]) },
    }).sort({ amount: -1 })
      .limit(5)

    // Doughnut
    const totalByCategoryList = await Wallet.aggregate([
      {
        $match: {
          _id: { $in: user.wallet },
          type,
          date: { $gte: new Date(date[0]), $lte: new Date(date[1]) },
        },
      },
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
      { $sort: { _id: 1 } },
      {
        $group: {
          _id: null,
          data: {
            $push: {
              category: '$_id',
              total: '$total',
            },
          },
        },
      },
      { $project: { category: '$data.category', total: '$data.total', _id: 0 } },
    ])

    return {
      lineData: lineData[0],
      top5,
      doughnutData: totalByCategoryList[0],
    }
  }
  catch (err) {
    console.error(err)
  }
})
