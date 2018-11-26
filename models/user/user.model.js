'use strict'

import config from '../../config/config'

const { Schema } = config.mongoose

const defaultImage = 'http://www.gravatar.com/avatar/be7bc9fa8b67225e3619786f742c7310?s=200&r=pg&d=mm'

const UserSchema = new Schema({
  displayName: { type: String, required: true },
  avatar: { type: String, default: defaultImage },
  email: { type: String, required: true, unique: true, lowercase: true },
  username: {
    unique: true,
    type: String,
    required: true,
    lowercase: true,
    minlength: [4, 'Username Should be minimum 4 Characters long'], maxlength: [16, 'Username can be maximum of 16 characters']
  },
  password: { type: String, required: true },
  signupDate: { type: Date, default: Date.now() },
  lastLogin: Date,
  state: { type: Boolean, default: false },
  providerId: String,
  dateOfBirth: Date,
  department: String,
  bio: String
}, { versionKey: false })

export default config.mongoose.model('User', UserSchema) 
