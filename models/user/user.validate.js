'use strict'

import { Joi, celebrate } from 'celebrate'

import forgetPassword from '../user/validate/user.forgetpassword.validate'
import signIn from '../user/validate/user.signin.validate'
import signUp from '../user/validate/user.signup.validate'

const { params } = {
  params: Joi.object({
    id: Joi.string().alphanum().required()
  }).unknown()
}

export default {
  forgetPassword,
  signIn,
  signUp,
  user: {
    PARAMS: celebrate({ params })
  }
}