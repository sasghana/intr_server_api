'use strict'

import userModel from '../models/user/user.model'
import utilities from '../utilities/utilities'
import winston from '../config/winston'

export default {
  GetUsers: async (req, res) => {
    const limit = 6
    let findProperty = {}
    let displayname = req.query.displayname
    let page = req.query.page

    if (page >= 1)
      page = page - 1
    else
      page = 0

    try {
      if (displayname != null && displayname != 'undefined')
        findProperty = { displayName: new RegExp(displayname, 'i') }

      const users = await userModel
        .find(findProperty)
        .select(['-password'])
        .limit(limit)
        .skip(page * limit)
        .sort('-signupDate')

      const total = await userModel
        .find()
        .countDocuments()

      winston.info(`Total users ==> ${users} ${total}`);
      return res.status(200).send({ users, total })

    } catch (error) {
      return res.status(500).send({
        message: 'Error en el servidor'
      })
    }
  },

  UpdateUser: async (req, res) => {
    try {
      const userId = req.params.id

      const response = await userModel
        .findByIdAndUpdate(userId, { $set: req.body }, { new: true })

      return res.status(200).send(response)

    } catch (err) {
      return res.status(500).send({ err })
    }

  },

  // UpdateAvatar: async (req, res) => {

  //   try {

  //     const { userId, avatar_url } = req.body

  //     const response = await userModel
  //       .findByIdAndUpdate(userId, { avatar: avatar_url }, { new: true })

  //     return res.status(200).send(response)

  //   } catch (err) {
  //     return res.status(500).send({ err })
  //   }

  // },

  UpdateUsersOnlyPassword: async (req, res) => {
    try {
      const { actual_password, new_password } = req.body
      const userId = req.params.id

      const { password } = await userModel.findById(userId)

      if (utilities.DecodePassword(actual_password, password)) {

        const response = await userModel
          .findByIdAndUpdate(userId,
            { password: utilities.EncodePassword(new_password) },
            { new: true })

        return res.status(200).send({ message: 'Changed password' })
      }

      return res.status(200).send({ message: 'Wrong password' })

    } catch (err) {
      return res.status(500).send({ err })
    }

  },

  GetUserById: async (req, res) => {
    try {
      const id = req.params.id
      const user = await userModel
        .findOne({ _id: id })
        .select(['-password'])

      if (user === null)
        return res.status(200).send({ data: 'User not found' })

      return res.status(200).send(user)

    } catch (error) {
      return res.status(500).send({})
    }

  },

  GetUserByUsername: async (req, res) => {
    try {
      const username = req.params.id
      const user = await userModel
        .findOne({ username: username })
        .select(['-password'])

      if (user === null)
        return res.status(200).send({ data: 'User not found' })

      return res.status(200).send(user)

    } catch (error) {
      return res.status(500).send({})
    }

  }

}

