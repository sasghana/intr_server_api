'use strict'

import jwt from 'jwt-simple'
import moment from 'moment'
import config from '../config/config'

export default {
  CreateToken: (user) => {
    const payload = {
      sub: user._id,
      iat: moment().unix(),
      exp: moment().add(15, 'days').unix()
    }
    return jwt.encode(payload, config.SECRET_TOKEN)
  },

  DecodeToken(token) {
    const decode = new Promise((resolve, reject) => {
      try {
        const payload = jwt.decode(token, config.SECRET_TOKEN)

        if (payload.exp <= moment().unix()) {
          reject({
            status: 401,
            message: 'The token has expired'
          })
        }

        resolve(payload.sub)

      } catch (err) {

        reject({
          status: 500,
          message: 'Invalid Token'
        })

      }
    })

    return decode

  }

}