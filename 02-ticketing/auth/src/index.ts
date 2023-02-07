import express, { Request, Response } from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import mongoose, { mongo } from 'mongoose'

import { currentUserRouter } from './routes/current-user'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { signinRouter } from './routes/signin'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()

app.use(json())

// routers
app.use(currentUserRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.use(signinRouter)

app.get('*', () => {
  throw new NotFoundError()
})

app.use(errorHandler)

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log('Connected to mongoDB')
  } catch (err) {
    console.log(err)
  }

  app.listen(3000, () => {
    console.log('auth Listening on port 3000!');
  })

}

start()
