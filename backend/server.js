const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const debug = require('debug')('app:startup')

// * Imports
const app = express()
require('dotenv').config()
const { PORT, MONGO_URI } = process.env

// * Logger
app.use((req, res, next) => {
    debug(req.path, req.method)
    next()
})

// ! Middleware
app.use(cors())
app.use(helmet())
app.use(express())
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '1kp' }))

// ? Connect
mongoose
    .connect(MONGO_URI)
    .then(() => { app.listen(PORT, debug(`Server is on PORT: ${PORT}`)) })
