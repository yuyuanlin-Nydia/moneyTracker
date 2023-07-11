import { Wallet } from '.'

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    const income = await Wallet.find({ type: 'Income', _id: { $in: user.wallet } }).sort({ date: -1 }).limit(3)
    const expense = await Wallet.find({ type: 'Expense', _id: { $in: user.wallet } }).sort({ date: -1 }).limit(3)
    return { income, expense }
  }
  catch (err) {
    console.error(err)
  }
})
