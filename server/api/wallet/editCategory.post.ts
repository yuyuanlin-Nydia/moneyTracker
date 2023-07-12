import { Wallet } from '.'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    body.forEach(async (item: Pick<IWalletItem, '_id' | 'category'>) => {
      await Wallet.findByIdAndUpdate(item._id, { category: item.category })
    })
    return {
      success: true,
    }
  }
  catch (err) {
    console.error(err)
  }
})
