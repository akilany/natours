const path = require('path')
const express = require('express')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const cookieParser = require('cookie-parser')
const compression = require('compression')
// const cors = require('cors')

const tourRouter = require('./routes/tourRouter.js')
const userRouter = require('./routes/userRouter.js')
const reviewRouter = require('./routes/reviewRouter')
const bookingRouter = require('./routes/bookingRouter')
const viewRouter = require('./routes/viewRouter')

const globalErrorHandler = require('./controllers/errorController')
const AppError = require('./utils/appError')

const app = express()

app.enable('trust proxy')

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Global Middlewares //
// Serving static files
app.use(express.static(path.join(__dirname, 'public')))

// Set security HTTP headers
// app.use(helmet())

// Development Logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

// Limit requests from same API
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
})
app.use('/api', limiter)

// Body parser, reading data from the body into req.body || cookies
app.use(express.json({ limit: '10kb' }))
app.use(cookieParser())

// Data sanitization against NoSQL query injection
app.use(mongoSanitize())

// Data sanitization against XSS
app.use(xss())

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
)

app.use(compression())

// Test Middlewares
app.use((req, res, next) => {
  req.requestTime = new Date().toUTCString()
  // console.log(req.cookies)
  next()
})

// app.use(cors())

// Routes
app.use('/', viewRouter)
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/reviews', reviewRouter)
app.use('/api/v1/bookings', bookingRouter)

// Catch Unhandled Routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler)

module.exports = app
