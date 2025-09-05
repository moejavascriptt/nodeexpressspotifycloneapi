const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRouter = require('./routes/userRoutes')

//load environment variables
dotenv.config()

// initialize app
const app = express()

//connect to database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Database connected..')
  })
  .catch(err => {
    console.log('Error connecting to database', err.message)
  })

  //pass incoming data 
  app.use(express.json())

  //routes
  app.use('/api/users', userRouter)


//start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Server is running on the port', PORT)
})
