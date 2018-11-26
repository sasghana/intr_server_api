'use strict'

import notificationModel from '../models/notification/notification.model'

export default {
  AddNotification: async (req, res) => {
    try {
      req.body.creationDate = Date.now()
      const response = await notificationModel.insertMany(req.body)

      return res.status(200).send(response)

    } catch (err) {
      return res.status(500).send(err)
    }

  },

  GetNotificationByUserId: async (req, res) => {
    try {
      const limit = 20
      let page = req.query.page

      if (page >= 1)
        page = page - 1
      else
        page = 0

      const userId = req.params.userId

      const notifications = await notificationModel
        .find({ userToNotification: userId })
        .limit(limit)
        .skip(page * limit)
        .sort('-creationDate')

      const total = await notificationModel
        .find({ userToNotification: userId })
        .countDocuments()

      return res.status(200).send({ notifications, total })

    } catch (err) {
      return res.status(500).send(err)
    }

  },

  DeleteNotificationById: async (req, res) => {
    try {
      const id = req.params.id

      const response = await notificationModel
        .findByIdAndRemove(id)

      return res.status(200).send(response)

    } catch (err) {
      return res.status(500).send(err)
    }

  },

  DeleteAllNotification: async (req, res) => {
    try {
      const userId = req.params.userId

      const response = await notificationModel
        .findOneAndRemove({ userToNotification: userId })

      return res.status(200).send(response)

    } catch (err) {
      return res.status(500).send(err)
    }

  }

}