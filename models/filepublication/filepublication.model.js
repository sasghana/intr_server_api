'use strict'

import config from '../../config/config'

const { Schema } = config.mongoose

const FilePublicationSchema = new Schema({
  url: String,
  type: String,
  code: String
},{ versionKey: false })

export default config.mongoose.model('FilePublication', FilePublicationSchema)