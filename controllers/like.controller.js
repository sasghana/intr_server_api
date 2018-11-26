'use strict'

import likeModel from '../models/like/like.model'
import publicationModel from '../models/publication/publication.model'
import beautify from 'json-beautify'

export default {

  AddLike: async (req, res) => {

    try {

      const { publicationId, userId } = req.body

      const find = await likeModel.findOne({ publicationId, userId })

      if (find === null) {
        const response = await likeModel.insertMany({ publicationId, userId })

        await publicationModel.findOneAndUpdate(
          { _id: publicationId },
          {
            $push: { like: response[0] },
            $inc: { totalLike: 1 }
          },
          { new: true })

        return res.status(200).send(response[0])

      }

      return res.status(500).send({
        message: `Error`
      })

    } catch (error) {

      return res.status(500).send({
        message: `Error al dar like ${error}`
      })

    }
  },

  RemoveLike: async (req, res) => {
    try {

      const Like = await likeModel.findOneAndRemove({
        publicationId: req.body.publicationId,
        userId: req.body.userId,
      })

      await publicationModel.findOneAndUpdate(
        { _id: req.body.publicationId },
        {
          $pull: { like: Like._id },
          $inc: { totalLike: -1 }
        },
        { new: true })

      return res.status(200).send(Like)

    } catch (error) {

      return res.status(500).send({
        message: `Error al dar like ${error}`
      })

    }
  },

  GetLikeByPublicationId: async (req, res) => {

    // let page = req.query.page
    // const limit = 6

    // if (page >= 1)
    //   page = page - 1
    // else
    //   page = 0

    try {

      const publicationId = req.params.publicationId

      const Likes = await likeModel
        .find({ publicationId })//.limit(limit).skip(page * limit)

      const total = await likeModel
        .find({ publicationId })
        .countDocuments()

      return res.status(200).send({ Likes, total })

    } catch (error) {

      return res.status(500).send({})

    }
  }

}
