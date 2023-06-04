const express = require('express')
const path = require('path')
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

//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/publishedPapers', require('./routes/publishedPaperRoutes'))
app.use('/api/patents', require('./routes/patentRoutes'))
app.use('/api/projects', require('./routes/projectRoutes'))
app.use('/api/search', require('./routes/searchRoutes'))

app.use(express.static(path.join(__dirname, './frontend/build')))

app.get('*', function (_, res) {
  res.sendFile(
    path.join(__dirname, './frontend/build/index.html'),
    function (err) {
      res.status(500).send(err)
    }
  )
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log('Server is runnnig')
})
