'use strict'

import mongoose from 'mongoose'
import chalk from 'chalk'
import winston from './winston'

const host = {
  DEV: 'mongodb://localhost:27017/socialfriends',
  MLAB: 'mongodb://sasghana:digimas14@ds111244.mlab.com:11244/social'
}

mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)

mongoose.connect(host.MLAB, { useNewUrlParser: true })
  .catch(err => winston.error('[ERROR MONGODB]', err))

// mongoose.connect(host.DEV, { useNewUrlParser: true })
//   .catch(err => console.log(chalk.red(err)))

export default mongoose