'use strict'

import chatModel from '../models/chat/chat.model'

export default {

  AddMessage: async (req, res) => {

    try {

      req.body.creationDate = Date.now()
      const message = await chatModel.insertMany(req.body)
      return res.status(200).send(message)

    } catch (error) {

      return res.status(500).send({
        message: `Error al crear la publicación ${error}`
      })

    }
  },

  GetPublicationByUserId: async (req, res) => {

    let page = req.query.page
    const limit = 6

    if (page >= 1)
      page = page - 1
    else
      page = 0

    try {

      const userId = req.params.userId

      const publications = await publicationModel
        .find({ userId })
        .limit(limit)
        .skip(page * limit)
        .sort({ creationDate: 'desc' })
        .populate({ path: 'comment', options: { limit: 5, skip: 1, sort: { creationDate: 'desc' }, populate: { path: 'userId', select: ' avatar displayName _id' } } })
        .populate({ path: 'like', populate: { path: 'userId', select: ' avatar displayName _id' }, })

      const total = await publicationModel
        .find({ userId })
        .countDocuments()

      return res.status(200).send({ publications, total })

    } catch (error) {

      return res.status(500).send({
        message: 'Error en el servidor'
      })

    }
  }

}
