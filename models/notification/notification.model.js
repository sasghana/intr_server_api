'use strict'

import config from '../../config/config'

const { Schema } = config.mongoose

const NotificationSchema = new Schema({
  creationDate: Date,
  description: String,
  userFromNotification: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Required field']
  },
  userToNotification: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Required field']
  }
}, { versionKey: false })

export default config.mongoose.model('Notification', NotificationSchema) 
