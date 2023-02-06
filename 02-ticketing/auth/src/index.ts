import express, { Request, Response } from 'express'
import { json } from 'body-parser'
import { currentUserRouter } from './routes/current-user'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { signinRouter } from './routes/signin'

const app = express()

app.use(json())

// routers
app.use(currentUserRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.use(signinRouter)


app.listen(3000, () => {
  console.log('auth Listening on port 3000!');
})