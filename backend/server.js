const express = require('express')
const colors = require('colors')
require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 8000

//Connect to Database
connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res
    .status(201)
    .json({ message: "Welcome to the SAU Scientific Reasearch Portal's API!" })
})

//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/publishedPapers', require('./routes/publishedPaperRoutes'))
app.use('/api/patents', require('./routes/patentRoutes'))
app.use('/api/projects', require('./routes/projectRoutes'))

app.use(errorHandler)

app.listen(PORT, () => {
  console.log('Server is runnnig')
})
