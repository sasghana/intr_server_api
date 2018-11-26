'use strict'

import { Joi, celebrate } from 'celebrate'

const { body, params, query, headers } = {
  body: Joi.object().keys({
    displayName: Joi.string().required(),
    avatar: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    verificationPassword: Joi.string().required(),
    signupDate: Joi.date().optional(),
    lastLogin: Joi.date(),
    state: Joi.boolean().optional(),
    providerId: Joi.string().required(),
    dateOfBirth: Joi.date().optional(),
    department: Joi.string().optional(),
    bio: Joi.string().optional()
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