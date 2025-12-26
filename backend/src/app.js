import express from 'express'
import errorHandler from './middlewares/errorHandler.middleware.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json({ limit: '20kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(cookieParser())

app.get('/health', (_, res) => {
  res.status(200).json({ status: 'OK' })
})

//import routes
import userRouter from './routes/auth.route.js'

// Routes declaration
app.use('/api/v1/auth', userRouter)

// Global error handler
app.use(errorHandler)

export default app
