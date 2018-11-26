'use strict'

/* 
  OBS: 
    Tengo que añadir paginación a algunas peticiones.
*/

import followerModel from '../models/follower/follower.model'

export default {

  AddFollower: async (req, res) => {

    try {

      const find = await followerModel.findOne(req.body)

      if (find === null) {
        const response = await followerModel.insertMany(req.body)
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

  RemoveFollower: async (req, res) => {

    try {

      const response = await followerModel.findOneAndRemove(req.body)
      return res.status(200).send(response)

    } catch (error) {

      return res.status(500).send({
        message: `Error al dar like ${error}`
      })

    }

  },

  GetFollowerByUserId: async (req, res) => {

    try {

      const response = await followerModel
        .find({ userId: req.params.userId })
        .populate({ path: 'followerId', select: '-password -state' })

      const total = await followerModel
        .find({ userId: req.params.userId })
        .countDocuments()

      return res.status(200).send({ response, total })


    } catch (error) {

      return res.status(200).send(error)

    }

  },

  GetFollowingByUserId: async (req, res) => {

    try {

      const response = await followerModel
        .find({ followerId: req.params.userId })
        .populate({ path: 'userId', select: '-password -state' })

      const total = await followerModel
        .find({ followerId: req.params.userId })
        .countDocuments()

      return res.status(200).send({ response, total })


    } catch (error) {

      return res.status(200).send(error)

    }

  }
}