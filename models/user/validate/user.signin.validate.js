'use strict'

import { Joi, celebrate } from 'celebrate'

const { body } = {
  body: Joi.object().keys({
    account: Joi.string().required(),
    password: Joi.string().required()
  })
}

export default {
  BODY: celebrate({ body })
}