const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401)
        throw new Error('Not Authorized, Please Login.')
    }

    // * Verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET)

    // * Get User ID from token
    const user = await User.findById(verified.id).select("-Password")

    if (!user) {
        res.status(401)
        throw new Error('User Not Found.')
    }

    req.user = user
    next()
})

module.exports = protect
