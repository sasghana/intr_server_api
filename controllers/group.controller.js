'use strict'

import groupModel from '../models/group/group.model'

export default {

  AddGroup: async (req, res) => {

    try {

      const group = await groupModel.insertMany(req.body)
      res.status(200).send(group)

    } catch (err) {

      res.status(404).send({
        error: 'An error has ocurred'
      })

    }
  },

  GetGroup: async (req, res) => {

    let page = req.query.page
    const limit = 6

    if (page >= 1)
      page = page - 1
    else
      page = 0

    try {

      const groups = await groupModel
        .find()
        .limit(limit)
        .skip(page * limit)

      const total = await groupModel
        .find()
        .countDocuments()
        
      return res.status(200).send({ groups, total })

    } catch (error) {

      return res.status(500).send({
        message: 'Error en el servidor'
      })

    }

  }

}