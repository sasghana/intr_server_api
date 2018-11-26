'use strict'

import config from '../../config/config'

const { Schema } = config.mongoose

const ChatSchema = new Schema({
  creationDate: Date,
  Message: String,
  filePublication: Array,
  userFromChat: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Required field']
  },
  userToChat: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Required field']
  }
}, { versionKey: false })

export default config.mongoose.model('Chat', ChatSchema)