const path = require('node:path')
const { createServer } = require('node:http')
const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { connectMongoDB } = require('./db')
const { userRouter } = require('./routes/user')
const { walletRouter } = require('./routes/wallet')
const { analysisRouter } = require('./routes/analysis')

const app = express()
const auth = require('./jwt-auth-middleware.js')

dotenv.config()
connectMongoDB()
const httpServer = createServer(app)

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}
const port = process.env.BACKEND_PORT || 5000
app
  .use(cors(corsOptions))
  .use(express.json())
  .use(cookieParser())
  .use('/user', userRouter)
  .use(auth)
  .use('/wallet', walletRouter)
  .use('/analysis', analysisRouter)

const __dirname1 = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname1, '/dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname1, 'dist', 'index.html'))
  })
}
else {
  app.get('/', (req, res) => {
    res.send('success')
  })
}
httpServer.listen(port)
