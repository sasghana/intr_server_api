'use strict'

import profileModel from '../models/profile/profile.model'
import userModel from '../models/user/user.model'

export default {

  CreateProfile: async (req, res) => {
    try {
      req.body.creationDate = Date.now()
      const profile = await profileModel.insertMany(req.body)
      console.log('creat user profile >>>'+ profile);
      return res.status(200).send(profile)

    } catch (error) {
      return res.status(500).send({
        message: `Error creating profile ${error}`
      })

    }
  },

  UpdateProfile: async (req, res) => {
  },

  RemoveProfile: async (req, res) => {
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

  GetProfileByUserId: async (req, res) => {
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

  GetAllProfiles: async (req, res) => {},
  GetCurrentProfile: async (req, res) => {}

}
