'use strict'

import fileController from '../controllers/file.controller'
import auth from '../auth/auth'
import multer from 'multer'

const upload = multer({
  storage: multer.memoryStorage()
})

export default (app) => {

  app.post('/api/fileupload', auth.isAuth, upload.array('files', 100), fileController.AddFile)

}