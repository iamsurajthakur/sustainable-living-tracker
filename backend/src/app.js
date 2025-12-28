import express from 'express'
import errorHandler from './middlewares/errorHandler.middleware.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

const allowedOrigins = [
  process.env.CORS_ORIGIN_DEV,
  process.env.CORS_ORIGIN_PROD
].filter(Boolean)

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true)

    if (allowedOrigins.includes(origin)) {
      cb(null, true)
    } else {
      cb(null, false) // clean CORS rejection
    }
  },
  credentials: true,
}))

app.use(express.json({ limit: '20kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(cookieParser())

app.get('/health', (_, res) => {
  res.status(200).json({ status: 'OK' })
})
app.get('/', (_, res) => {
  res.send('API is running...')
})

//import routes
import userRouter from './routes/auth.route.js'

// Routes declaration
app.use('/api/v1/auth', userRouter)

// Global error handler
app.use(errorHandler)

export default app
