'use strict'

import followerController from '../controllers/follower.controller'
import followerValidate from '../models/follower/follower.validate'
import auth from '../auth/auth'

import { errors } from 'celebrate'

export default (app) => {

  app.post('/api/follow', auth.isAuth, followerValidate.BODY, followerController.AddFollower)
  app.post('/api/unfollow', auth.isAuth, followerValidate.BODY, followerController.RemoveFollower)
  app.get('/api/follower/:userId', auth.isAuth, followerValidate.PARAMS, followerController.GetFollowerByUserId)
  app.get('/api/following/:userId', auth.isAuth, followerValidate.PARAMS, followerController.GetFollowingByUserId)
  
  app.use(errors());

}