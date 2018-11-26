'use strict'

import publicationController from '../controllers/publication.controller'
import publicationValidate from '../models/publication/publication.validate'
import auth from '../auth/auth'

import { errors } from 'celebrate'

export default (app) => {

  app.post('/api/publication', auth.isAuth, publicationValidate.BODY, publicationController.AddPublication)
  app.put('/api/publication', auth.isAuth, publicationValidate.BODY_AND_PARAMS, publicationController.UpdatePublication)
  app.delete('/api/publication/:publicationId', auth.isAuth, publicationValidate.PARAMS, publicationController.RemovePublication)
  app.get('/api/publication/:userId', auth.isAuth, publicationValidate.PARAMS, publicationController.GetPublicationByUserId)
  app.get('/api/publication/followers/:userId', auth.isAuth, publicationValidate.PARAMS, publicationController.GetPublicationFollowersByUserId)

  app.use(errors())

}