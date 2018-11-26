'use strict'

import commentController from '../controllers/comment.controller'
import commentValidate from '../models/comment/comment.validate'
import auth from '../auth/auth'

import { errors } from 'celebrate'

export default (app) => {

  app.post('/api/comment', auth.isAuth, commentValidate.BODY, commentController.AddComment)
  // app.put('/comment', commentController.Updatecomment)
  // app.delete('/comment', commentController.Removecomment)
  app.get('/api/comment/:id', auth.isAuth,commentValidate.PARAMS, commentController.GetcommentByPublicationId)

  app.use(errors())

}