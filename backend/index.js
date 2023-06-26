const path = require('path')
const dotenv = require('dotenv')
const express = require('express')
const { createServer } = require('http')
const cors = require('cors')
const { connectMongoDB } = require('./db')
const { userRouter } = require('./routes/user')
const { walletRouter } = require('./routes/wallet')
const { analysisRouter } = require('./routes/analysis')
const app = express()

dotenv.config()
connectMongoDB()
const httpServer = createServer(app)

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
}
const port = process.env.BACKEND_PORT || 5000
app
  .use(cors(corsOptions))
  .use(express.json())
  // .use('/user', userRouter)
  .use('/wallet', walletRouter)
  .use('/analysis', analysisRouter)

const __dirname1 = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname1, '/dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname1, 'dist', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('success')
  })
}
httpServer.listen(port)


