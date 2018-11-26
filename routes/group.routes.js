'use strict'

import groupController from '../controllers/group.controller'
import groupValidate from '../models/group/group.validate'
import auth from '../auth/auth'

import { errors } from 'celebrate'

export default (app) => {

  // groupValidate.BODY
  app.post('/api/group', auth.isAuth, groupController.AddGroup)
  app.get('/api/group', auth.isAuth, groupController.GetGroup)
  // api.get('/api/group/:id', auth.isAuth, groupValidate.PARAMS, groupController.GetUserById)

  //app.use(errors())

}