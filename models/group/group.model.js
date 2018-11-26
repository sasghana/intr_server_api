'use strict'

import config from '../../config/config'

const { Schema } = config.mongoose

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'http://guguia.net/wp-content/plugins/wp-recall/add-on/groups/img/group-avatar.png'
  },
  description: {
    type: String,
    required: true
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  admin: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
}, { versionKey: false })

export default config.mongoose.model('Group', GroupSchema)