const mongoose = require('mongoose')
const debug = require('debug')('app:startup')
const MONGO_URI = process.env.MONGO_URI

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI)
        debug(`${conn.connection.host}`)
    } catch (error) {
        debug(error)
        process.exit(1)
    }
}

module.exports = connectDB

