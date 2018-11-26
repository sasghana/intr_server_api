'use strict'

import notificationController from '../controllers/notification.controller'
import auth from '../auth/auth'

import { errors } from 'celebrate'

export default (app) => {

  app.post('/api/notification', auth.isAuth, notificationController.AddNotification)
  app.get('/api/notification/:userId', auth.isAuth, notificationController.GetNotificationByUserId)

  app.use(errors())

}