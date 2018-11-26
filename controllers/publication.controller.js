'use strict'

import publicationModel from '../models/publication/publication.model'
import followerModel from '../models/follower/follower.model'
import likeModel from '../models/like/like.model'
import commentModel from '../models/comment/comment.model'

export default {

  AddPublication: async (req, res) => {
    try {
      req.body.creationDate = Date.now()
      const publication = await publicationModel.insertMany(req.body)
      return res.status(200).send(publication)

    } catch (error) {
      return res.status(500).send({
        message: `Error al crear la publicación ${error}`
      })

    }
  },

  UpdatePublication: async (req, res) => {

  },

  RemovePublication: async (req, res) => {

    try {

      const publicationId = req.params.publicationId

      const publication = await publicationModel
        .findByIdAndRemove(publicationId)

      const comments = await commentModel
        .find({ publicationId: publicationId }).remove()

      const likes = await likeModel
        .find({ publicationId: publicationId }).remove()

      res.status(200).send({ data: 'Publication deleted' })

    } catch (err) {
      return res.status(500).send(err)
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
        .populate({ path: 'comment', options: { limit: 5, skip: 0, sort: { creationDate: 'desc' }, populate: { path: 'userId', select: ' avatar displayName _id' } } })
        .populate({ path: 'like', populate: { path: 'userId', select: ' avatar displayName _id' }, })
        .populate({ path: 'userId', select: ' avatar displayName _id' })

      const total = await publicationModel
        .find({ userId })
        .countDocuments()

      return res.status(200).send({ publications, total })

    } catch (error) {

      return res.status(500).send({
        message: 'Error en el servidor'
      })

    }
  },

  GetPublicationFollowersByUserId: async (req, res) => {

    let page = req.query.page
    const limit = 6

    if (page >= 1)
      page = page - 1
    else
      page = 0

    try {

      const userId = req.params.userId
      let followersId = []

      const response = await followerModel.find({ userId: userId })

      response.forEach(item => {
        followersId.push(item.followerId)
      })

      const publications = await publicationModel
        .find({ userId: { $in: followersId } })
        .limit(limit).skip(page * limit)
        .sort({ creationDate: 'desc' })
        .populate({ path: 'comment', options: { limit: 5, skip: 0, sort: { creationDate: 'desc' }, populate: { path: 'userId', select: ' avatar displayName _id' } } })
        .populate({ path: 'like', populate: { path: 'userId', select: ' avatar displayName _id' }, })
        .populate({ path: 'userId', select: ' avatar displayName _id' })

      const total = await publicationModel
        .find({ userId: followersId })
        .countDocuments()

      return res.status(200).send({ publications, total })

    } catch (error) {

      return res.status(500).send({
        message: 'Error en el servidor'
      })

    }
  }

}
