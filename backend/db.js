const { connect, set } = require('mongoose')

module.exports = {
  connectMongoDB: function connectMongoDB () {
    set("strictQuery", false);
    connect(process.env.MONGO_URL, { dbName: 'moneyTracker' })
      .then((m) => {
        m.connection.getClient()
        console.log('Connected to MongoDB!')
      })
      .catch(err => console.log(err))
  }
}
