'use strict'

import googleStorage from '@google-cloud/storage'
import shortid from 'shortid'
import { resolve } from 'path'
import cloudinary from 'cloudinary'
import utilities from '../utilities/utilities'
import config from '../config/config'
import fs from 'fs'

let tokenId = shortid.generate()

const storage = googleStorage({
  keyFilename: `${__dirname}/../config/public_credentials/firebase_storage.json`
})

cloudinary.config(require(`${__dirname}/../config/public_credentials/cloudinary_storage.json`))

const bucket = storage.bucket('gs://db-firebase-5cf99.appspot.com')

//#region  UploadStorageCloudinary 
const UploadStorageCloudinary = (files, userId, mainFolder) => {

  let prom = new Promise((_resolve, _reject) => {

    let arrayFile = []

    if (files.length <= 0)
      _reject('Not file')

    files.map((file, i) => {

      let nameFile = `${Date.now()}${i}`

      const resource_type = file.mimetype.includes('image') ? 'image' : 'video';

      cloudinary.uploader.upload_stream(

        result => {

          const url = result.url
          arrayFile.push({ url: url, type: file.mimetype, code: nameFile.toString() })

          if (arrayFile.length == (files.length))
            _resolve(arrayFile)

        }, { resource_type: resource_type }).end(file.buffer)

    })

  })

  return prom

}
//#endregion 

//#region UploadStorageServer 
const UploadStorageServer = (files, userId, mainFolder) => {

  let prom = new Promise((_resolve, _reject) => {

    let arrayFile = []

    if (files.length <= 0) {
      _reject('Not file')
    }

    let folderPath = resolve(`./storage_files`)

    files.forEach((file, i) => {

      let nameFile = `${Date.now()}${i}`
      let ext = utilities.GetFileExtension(file.originalname)

      let newFileName = `${folderPath}/${nameFile}.${ext}`

      const blobStream = fs.createWriteStream(newFileName)

      blobStream.on('error', error => {
        _reject(error)
      })

      blobStream.on('finish', data => {

        const url = `${config.url}/${nameFile}.${ext}`
        arrayFile.push({ url: url, type: file.mimetype, code: nameFile.toString() })

        if (arrayFile.length == (files.length))
          _resolve(arrayFile)

      })

      blobStream.end(file.buffer)

    })

  })

  return prom

}
//#endregion

//#region UploadStorageFirebase 
const UploadStorageFirebase = (files, userId, mainFolder) => {

  let prom = new Promise((_resolve, _reject) => {

    let arrayFile = []

    if (files.length <= 0) {
      _reject('Not file')
    }

    files.map((file, i) => {

      let nameFile = `${Date.now()}${i}`
      let folderPath = `socialfriends-mean/${mainFolder}/${userId}`
      let newFileName = `${folderPath}/${nameFile}`

      let fileUpload = bucket.file(newFileName)

      const blobStream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
          metadata: {
            firebaseStorageDownloadTokens: tokenId
          }
        },
      })

      blobStream.on('error', error => {
        _reject(error)
      })

      blobStream.on('finish', data => {

        const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileUpload.name)}?alt=media&token=${tokenId}`
        fileUpload.getSignedUrl({ action: 'read' })
        arrayFile.push({ url: url, type: file.mimetype, code: nameFile.toString() })

        if (arrayFile.length == (files.length))
          _resolve(arrayFile)

      })

      blobStream.end(file.buffer)

    })

  })

  return prom
}
//#endregion

export default {

  AddFile: async (req, res) => {

    try {

      let data = {
        files: req.files,
        userId: req.body.userId,
        folderName: req.body.folderName
      }

      if (data.files.length > 0) {

        const response = await UploadStorageFirebase(data.files, data.userId, data.folderName)
        return res.status(200).send(response)

      }

      return res.status(400).send({
        status: 'File required'
      })

    } catch (error) {
      return res.status(400).send({
        status: 'an error has ocurred'
      })
    }

  }

}