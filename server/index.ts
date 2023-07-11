import type { Nitro } from 'nitropack'
import mongoose, { set } from 'mongoose'

export default async (_nitroApp: Nitro) => {
  const config = useRuntimeConfig()

  set('strictQuery', false)
  mongoose.connect(config.mongoUrl, { dbName: 'moneyTracker' })
    .then((m) => {
      m.connection.getClient()
      // eslint-disable-next-line no-console
      console.log('Connected to MongoDB!')
    })
    .catch(err => console.error(err))
}
