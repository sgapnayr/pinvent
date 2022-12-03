const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const debug = require('debug')('app:startup')
const cookieParser = require('cookie-parser')

// * Imports
const app = express()
require('dotenv').config()
const { PORT, MONGO_URI } = process.env
const userRoutes = require('./routes/userRoute')
const productRoutes = require('./routes/productRoute')
const errorHandler = require('./middleware/errorMiddleware')

// * Logger
app.use((req, res, next) => {
    debug(req.path, req.method)
    next()
})

// ? Connect
mongoose
    .connect(MONGO_URI)
    .then(() => { app.listen(PORT, debug(`Server is on PORT: ${PORT}`)) })

// ! Middleware
app.use(cors())
app.use(helmet())
app.use(express())
app.use(errorHandler)
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false, limit: '1kp' }))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// * Routes
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)