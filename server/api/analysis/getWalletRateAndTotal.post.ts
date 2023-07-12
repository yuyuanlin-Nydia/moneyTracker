import { Wallet } from '../wallet'
import { getLastMonth } from '~/helper/time.helper'

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    const now = new Date()
    const current = `${now.getFullYear()}-${now.getMonth() + 1}`
    const lastMonth = `${getLastMonth().year}-${getLastMonth().month}`
    const lastYear = `${now.getFullYear() - 1}-${now.getMonth() + 1}`
    // Income
    const incomeResult = await Wallet.aggregate([
      {
        $match: {
          _id: { $in: user.wallet },
          type: 'Income',
          $expr: {
            $in: [
              { $year: '$date' },
              [now.getFullYear() - 1, now.getFullYear()],
            ],
            // @ts-expect-error ignore
            $in: [
              { $month: '$date' },
              [getLastMonth().month, now.getMonth() + 1],
            ],
          },
        },
      },
      {
        $group: {
          _id: { year: { $year: '$date' }, month: { $month: '$date' } },
          total: { $sum: '$amount' },
        },
      },
      {
        $project: {
          date: {
            $concat: [
              { $toString: '$_id.year' },
              '-',
              { $toString: '$_id.month' },
            ],
          },
          total: 1,
          _id: 0,
        },
      },
      {
        $group: {
          _id: null,
          stats: { $push: '$$ROOT' },
        },
      },
      {
        $project: {
          stats: {
            $map: {
              input: [lastYear, lastMonth, current],
              as: 'date',
              in: {
                $let: {
                  vars: {
                    dateIndex: { $indexOfArray: ['$stats.date', '$$date'] },
                  },
                  in: {
                    $cond: {
                      if: { $ne: ['$$dateIndex', -1] },
                      then: { $arrayElemAt: ['$stats', '$$dateIndex'] },
                      else: { date: '$$date', total: 0 },
                    },
                  },
                },
              },
            },
          },
        },
      },
      {
        $unwind: '$stats',
      },
      {
        $replaceRoot: {
          newRoot: '$stats',
        },
      },
    ])
    const incomeTotal = incomeResult.reduce((newArr, result) => {
      newArr.push(result.total)
      return newArr
    }, [])
    const [lastYearIncome, lastMonthIncome, currentIncome] = incomeTotal
    const incomeMoM = (
      ((currentIncome - lastMonthIncome) / lastMonthIncome)
      * 100
    ).toFixed(2)
    const incomeYoY = (
      ((currentIncome - lastYearIncome) / lastYearIncome)
      * 100
    ).toFixed(2)
    const income = {
      type: 'Income',
      total: currentIncome || 0,
      MoM: incomeMoM === 'Infinity' || incomeMoM === 'NaN' ? '0.00' : incomeMoM,
      YoY: incomeYoY === 'Infinity' || incomeYoY === 'NaN' ? '0.00' : incomeYoY,
    }
    // Expense
    const expenseResult = await Wallet.aggregate([
      {
        $match: {
          _id: { $in: user.wallet },
          type: 'Expense',
          $expr: {
            $in: [
              { $year: '$date' },
              [now.getFullYear() - 1, now.getFullYear()],
            ],
            // @ts-expect-error ignore
            $in: [
              { $month: '$date' },
              [getLastMonth().month, now.getMonth() + 1],
            ],
          },
        },
      },
      {
        $group: {
          _id: { year: { $year: '$date' }, month: { $month: '$date' } },
          total: { $sum: '$amount' },
        },
      },
      {
        $project: {
          date: {
            $concat: [
              { $toString: '$_id.year' },
              '-',
              { $toString: '$_id.month' },
            ],
          },
          total: 1,
          _id: 0,
        },
      },
      {
        $group: {
          _id: null,
          stats: { $push: '$$ROOT' },
        },
      },
      {
        $project: {
          stats: {
            $map: {
              input: [lastYear, lastMonth, current],
              as: 'date',
              in: {
                $let: {
                  vars: {
                    dateIndex: { $indexOfArray: ['$stats.date', '$$date'] },
                  },
                  in: {
                    $cond: {
                      if: { $ne: ['$$dateIndex', -1] },
                      then: { $arrayElemAt: ['$stats', '$$dateIndex'] },
                      else: { date: '$$date', total: 0 },
                    },
                  },
                },
              },
            },
          },
        },
      },
      {
        $unwind: '$stats',
      },
      {
        $replaceRoot: {
          newRoot: '$stats',
        },
      },
    ])
    const expenseTotal = expenseResult.reduce((newArr, result) => {
      newArr.push(result.total)
      return newArr
    }, [])
    const [lastYearExpense, lastMonthExpense, currentExpense] = expenseTotal
    const expenseMoM = (
      ((currentExpense - lastMonthExpense) / lastMonthExpense)
      * 100
    ).toFixed(2)
    const expenseYoY = (
      ((currentExpense - lastYearExpense) / lastYearExpense)
      * 100
    ).toFixed(2)
    const expense = {
      type: 'Expense',
      total: currentExpense || 0,
      MoM: expenseMoM === 'Infinity' || expenseMoM === 'NaN' ? '0.00' : expenseMoM,
      YoY: expenseYoY === 'Infinity' || expenseYoY === 'NaN' ? '0.00' : expenseYoY,
    }

    return [income, expense]
  }
  catch (err) {
    console.error(err)
  }
})
