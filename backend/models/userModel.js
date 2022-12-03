const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const User = new Schema({
    Name: {
        type: String,
        required: [true, "Please add your Name"]
    },
    Email: {
        type: String,
        required: [true, "Please add your Email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email"
        ]
    },
    Password: {
        type: String,
        required: [true, "Please add a Password"],
        minLength: [6, "Password must be a minimum of 6 characters"],
        // maxLength: [50, "Password must not be more than 50 characters"]
    },
    Photo: {
        type: String,
        required: [true, "Please add a Photo"],
        default: 'Photo...'
    },
    Phone: {
        type: String,
        default: '+123'
    },
    Bio: {
        type: String,
        default: 'Bio...',
        maxLength: [250, "Bio must not be more than 250 characters"]
    },
}, { timestamps: true })

// * Encrypt Password
User.pre('save', async function (next) {
    if (!this.isModified('Password')) {
        return next()
    }

    const salt = await bcrypt.genSalt(8)
    const hashedPassword = await bcrypt.hash(this.Password, salt)
    this.Password = hashedPassword
})

module.exports = mongoose.model('User', User)