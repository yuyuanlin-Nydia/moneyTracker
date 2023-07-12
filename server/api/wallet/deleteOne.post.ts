import { User } from '../user'
import { Wallet } from '.'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const user = event.context.user
    const deleteItem = await Wallet.findByIdAndDelete(body.id)
    await User.updateOne(
      { _id: user._id },
      { $pull: { wallet: deleteItem?._id } },
    )
    return {
      success: true,
    }
  }
  catch (err) {
    console.error(err)
  }
})
