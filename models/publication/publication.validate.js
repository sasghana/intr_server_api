'use strict'

import { Joi, celebrate } from 'celebrate'

const { body, params, query, headers } = {
  body: Joi.object().keys({
    message: Joi.string().trim().allow(null),
    userId: Joi.string().required(),
    filePublication: Joi.array().required(),
    creationDate: Joi.date(),
    comment: Joi.array(),
    like: Joi.array(),
    totalComment: Joi.number(),
  }),
  params: Joi.object({
    userId: Joi.string().alphanum(),
    publicationId: Joi.string().alphanum()
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