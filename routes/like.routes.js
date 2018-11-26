'use strict'

import likeController from '../controllers/like.controller'
import likeValidate from '../models/like/like.validate'
import auth from '../auth/auth'

import { errors } from 'celebrate'

export default (app) => {

  app.post('/api/like', auth.isAuth, likeValidate.BODY, likeController.AddLike)
  app.post('/api/unlike', auth.isAuth, likeValidate.BODY, likeController.RemoveLike)
  app.get('/api/like/:publicationId', auth.isAuth, likeValidate.PARAMS, likeController.GetLikeByPublicationId)

  app.use(errors())

}