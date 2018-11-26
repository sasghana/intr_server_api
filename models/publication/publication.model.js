'use strict'

import config from '../../config/config'

const { Schema } = config.mongoose

const PublicationSchema = new Schema({
  message: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User'},
  filePublication: Array,
  creationDate: Date,
  comment: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
  like: [{ type: Schema.Types.ObjectId, ref: 'Like'}],
  totalComment: { type: Number, default: 0 },
  totalLike: { type: Number, default: 0 },
  indexCommentPagination: { type: Number, default: 1 }
}, { versionKey: false })

export default config.mongoose.model('Publication', PublicationSchema)