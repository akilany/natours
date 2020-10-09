const mongoose = require('mongoose')
const dotenv = require('dotenv')

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message)
  console.log('Uncaught Exception: Shutting down...')

  process.exit(1)
})

dotenv.config({ path: './config.env' })

const app = require('./app')

const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

mongoose
  // Local database
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB CONNECTION SUCCESSFUL')
  })

// console.log(process.env)

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => {
  console.log('App running on port ' + PORT)
})

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message)
  console.log('Unhandled Rejection: Shutting down...')
  server.close(() => {
    process.exit(1)
  })
})

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED: Shutting down gracefully...')
  server.close(() => {
    console.log('Process terminated!')
  })
})
