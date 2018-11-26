'use strict'

import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import routes from './routes/_routes'
import winston from './config/winston'

const app = express()
app.use(morgan('combined', { stream: winston.stream }))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(helmet())
app.use(compression({}))
app.use(express.static('storage_files'))

routes(app)

export default app