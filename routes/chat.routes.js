'use strict'

import chatController from '../controllers/chat.controller'
import chatValidate from '../models/chat/chat.validate'
import auth from '../auth/auth'

import { errors } from 'celebrate'

export default (app) => {

  app.use(errors())

}
