'use strict'

import config from '../../config/config'

const { Schema } = config.mongoose

const FollowerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Required field']
  },
  followerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Required field']
  },
  followDate: {
    type: Date,
    default: Date.now()
  }
}, { versionKey: false })

export default config.mongoose.model('Follower', FollowerSchema)