'use strict'

import config from '../../config/config'

const { Schema } = config.mongoose

const LikeSchema = new Schema({
  publicationId: {
    type: Schema.Types.ObjectId,
    ref: 'Publication'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Required field']
  }
},{ versionKey: false })

export default config.mongoose.model('Like', LikeSchema)