'use strict'

import services from './jwt'
import response from '../utilities/response'

export default {
  isAuth: async (req, res, next) => {
    try {
      const { authorization } = req.headers

      if (!authorization) {
        return res.status(403).send({ message: response.notAuthorization })
      }
      const token_decode = await services.DecodeToken(authorization)
      req.user = token_decode
    } catch (err) {
      return res.status(200).send(err)
    }
    next()
  }

}