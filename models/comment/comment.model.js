'use strict'

import config from '../../config/config'

const { Schema } = config.mongoose

const CommentSchema = new Schema({
  comment: String,
  publicationId: {
    type: Schema.Types.ObjectId,
    ref: 'Publication'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Required field']
  },
  creationDate: Date
}, { versionKey: false })

export default config.mongoose.model('Comment', CommentSchema)