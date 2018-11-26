'use strict'

import loginController from '../controllers/login.controller'
import userValidate from '../models/user/user.validate'

import { errors } from 'celebrate'

export default (app) => {

  app.post('/api/signup', userValidate.signUp.BODY, loginController.SignUp)
  app.post('/api/signin', userValidate.signIn.BODY, loginController.SignIn)

  app.use(errors())

}