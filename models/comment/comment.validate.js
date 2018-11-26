'use strict'

import { Joi, celebrate } from 'celebrate'

const { body, params, query, headers } = {
  body: Joi.object().keys({
    comment: Joi.string().required(),
    publicationId: Joi.string().required(),
    userId: Joi.string().required(),
    creationDate: Joi.date(),
  }),
  params: Joi.object({
    id: Joi.string().alphanum().required()
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