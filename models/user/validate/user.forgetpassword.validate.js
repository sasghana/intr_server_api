'use strict'

import { Joi, celebrate } from 'celebrate'

const { body } = {
  body: Joi.object().keys({
    email: Joi.string().required()
  })
}

export default {
  BODY: celebrate({ body })
}