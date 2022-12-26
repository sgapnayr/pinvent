const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
const bodyParser = require('body-parser')
const debug = require('debug')('app:startup')
const cookieParser = require('cookie-parser')
const connectDB = require('./connect/connectDB')

// * Imports
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const userRoutes = require('./routes/userRoute')
const productRoutes = require('./routes/productRoute')
const contactRoute = require('./routes/contactRoute')
const errorHandler = require('./middleware/errorMiddleware')
const { default: mongoose } = require('mongoose')

// * Logger
app.use((req, res, next) => {
    debug(req.path, req.method)
    next()
})

// ? Connect
app.listen(PORT, debug(`Server is on ${PORT}`))
// ! NEED TO H
mongoose.connect('mongodb+srv://ryanpags:Crf150r35$@crud.h76aa1g.mongodb.net/test')

// ! Middleware
app.use(helmet())
app.use(express())
app.use(errorHandler)
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false, limit: '1kp' }))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))
app.use(cors({
    origin: ["http://localhost:3000", "https://trier.vercel.app"], // TODO Change URL depending on app
    credentials: true
}))

// * Routes
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/contact', contactRoute)