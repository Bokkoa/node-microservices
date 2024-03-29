import express, { Request, Response } from  'express'
import { body } from 'express-validator'
import { User } from '../models/user'
import { BadRequestError, validateRequest } from '@bokkoa-study/common'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/api/users/signup', [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().isLength({min: 4, max: 20}).withMessage('Password mus have at least 4 characters')
],
validateRequest,
 async (req: Request, res: Response) => {
  const { email, password } = req.body
  const existingUser = await User.findOne({email})

  if (existingUser) {
    throw new BadRequestError('Email in use')
  }

  const user = User.build({ email, password })
  await user.save()

  // Generate JWT

  const userJwt = jwt.sign({
    id: user.id,
    email: user.email
  }, process.env.JWT_KEY! )  // in infra kubernetes: kubectl create secret generic jwt-secret --from literal=JWT_KEY=asdf

  // store in session object
  req.session = {
    jwt: userJwt
  }

  res.status(201).send(user)

})

export { router as signupRouter }