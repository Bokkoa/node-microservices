import express, { Request, Response } from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import { currentUserRouter } from './routes/current-user'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { signinRouter } from './routes/signin'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test'
}))

// routers
app.use(currentUserRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.use(signinRouter)

app.get('*', () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }