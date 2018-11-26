'use strict'

import { Joi, celebrate } from 'celebrate'

const { body, params, query, headers } = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
    followerId: Joi.string().required(),
    followDate: Joi.date()
  }),
  params: Joi.object({
    id: Joi.string().alphanum()
  }).unknown(),
  query: {

  },
  headers: Joi.object({

  }).unknown()
}

export default {
  BODY: celebrate({ body }),
  PARAMS: celebrate({ params }),
  BODY_AND_PARAMS: celebrate({ body, params })
}