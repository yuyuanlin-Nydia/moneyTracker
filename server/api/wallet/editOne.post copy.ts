import { Wallet } from '.'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    await Wallet.findByIdAndUpdate(body._id, body)
    return {
      success: true,
    }
  }
  catch (err) {
    console.error(err)
  }
})
