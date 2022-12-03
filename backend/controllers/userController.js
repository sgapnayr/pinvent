const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

// ? Register User
const registerUser = asyncHandler(async (req, res) => {
    const { Name, Email, Password } = req.body

    if (!Name || !Email || !Password) {
        res.status(400)
        throw new Error('Please fill in all required fields.')
    }
    if (Password.length < 6) {
        res.status(400)
        throw new Error('Password must be 6 characters or more.')
    }

    const userExists = await User.findOne({ Email })

    if (userExists) {
        res.status(400)
        throw new Error('Email has already been used.')
    }

    // * Create New User
    const user = await User.create({ Name, Email, Password })

    // ! Generate Token
    const token = generateToken(user._id)

    // TODO Send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // One day
        sameSite: "none",
        secure: true
    })

    if (user) {
        const { _id, Name, Email, Photo, Phone, Bio } = user
        res.status(201).json({
            _id, Name, Email, Photo, Phone, Bio, token
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

// ? Login User
const loginUser = asyncHandler(async (req, res) => {
    const { Email, Password } = req.body

    // * Validate Request
    if (!Email || !Password) {
        res.status(400)
        throw new Error('Please add Email and Password.')
    }

    // ! Check if User exists
    const user = await User.findOne({ Email })

    if (!user) {
        res.status(400)
        throw new Error('User not found. Please sign up.')
    }

    // * User exists
    const passwordIsCorrect = await bcrypt.compare(Password, user.Password)

    // ! Generate Token
    const token = generateToken(user._id)

    // TODO Send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // One day
        sameSite: "none",
        secure: true
    })

    if (user && passwordIsCorrect) {
        const { _id, Name, Email, Photo, Phone, Bio } = user
        res.status(200).json({
            _id, Name, Email, Photo, Phone, Bio, token
        })
    } else {
        res.status(400)
        throw new Error('Invalid Email or Password.')
    }
})

module.exports = { registerUser, loginUser }