'use strict'

import mongoose from './mongoose'

const url = {
  localhost: 'http://localhost:9000',
  laptop: 'http://192.168.1.59:9000',
  heroku: 'https://socialfriends-restapi.herokuapp.com'
}

export default {
  server: {
    port: process.env.PORT || 9000,
    message: `Server running in the port `
  },
  SECRET_TOKEN: 'EkjtNl2ftMj4ivQJBhyoaChaZMFKCpgoA',
  mongoose,
  url: url.laptop,
  siteUrl: 'http://196.61.32.218:9000/'
}
