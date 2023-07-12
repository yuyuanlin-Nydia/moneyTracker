import { User } from '../user'
import { Wallet } from '.'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const user = event.context.user
    const newItem = await Wallet.create(body)
    await User.updateOne(
      { _id: user._id },
      { $push: { wallet: newItem._id } },
    )
    return {
      success: true,
    }
  }
  catch (err) {
    console.error(err)
  }
})
