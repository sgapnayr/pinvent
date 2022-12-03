const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Token = require('../models/tokenModel')
const crypto = require('crypto')
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

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

    const user = await User.create({ Name, Email, Password })
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

const loginUser = asyncHandler(async (req, res) => {
    const { Email, Password } = req.body

    if (!Email || !Password) {
        res.status(400)
        throw new Error('Please Add Email and Password.')
    }

    const user = await User.findOne({ Email })

    if (!user) {
        res.status(400)
        throw new Error('User not found. Please sign up.')
    }

    const passwordIsCorrect = await bcrypt.compare(Password, user.Password)
    const token = generateToken(user._id)

    // TODO Send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
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

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0), // * Expires cookie right now
        sameSite: "none",
        secure: true
    })

    return res.status(200).json({ message: "Successfully Logged Out." })
})

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id) // ! Possible Error

    if (user) {
        const { _id, Name, Email, Photo, Phone, Bio } = user
        res.status(200).json({
            _id, Name, Email, Photo, Phone, Bio
        })
    } else {
        res.status(400)
        throw new Error('User Not Found.')
    }
})

const userLoggedIn = asyncHandler(async (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.json(false)
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if (verified) {
        return res.json(true)
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        const { _id, Name, Email, Photo, Phone, Bio } = user
        user.Email = Email
        user.Name = req.body.Name || Name
        user.Photo = req.body.Photo || Photo
        user.Phone = req.body.Phone || Phone
        user.Bio = req.body.Bio || Bio

        const updatedUser = await user.save()
        res.status(200).json({
            _id: updatedUser._id,
            Name: updatedUser.Name,
            Email: updatedUser.Email,
            Photo: updatedUser.Photo,
            Phone: updatedUser.Phone,
            Bio: updatedUser.Bio
        })
    } else {
        res.status(404)
        throw new Error('User Not Found.')
    }
})

const changePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    const { OldPassword, Password } = req.body

    if (!user) {
        res.status(400)
        throw new Error("User Not Found, Please Sign Up or Sign In.")
    }

    if (!OldPassword || !Password) {
        res.status(400)
        throw new Error("Please Add Old & New Password.")
    }

    const PasswordIsCorrect = await bcrypt.compare(OldPassword, user.Password)

    if (user && PasswordIsCorrect) {
        user.Password = Password
        await user.save()
        res.status(200).send('Password Change Successful.')
    } else {
        res.status(400)
        throw new Error("Old Password is Incorrect.")
    }
})

const forgotPassword = asyncHandler(async (req, res) => {
    const { Email } = req.body;
    const user = await User.findOne({ Email });

    if (!user) {
        res.status(404);
        throw new Error("User does not exist");
    }

    let token = await Token.findOne({ userId: user._id });
    if (token) {
        await token.deleteOne();
    }

    let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
    console.log(resetToken)

    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    await new Token({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * (60 * 1000), // * Thirty minutes
    }).save();

    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

    const message = `
        <h2>Hello ${user.Name}</h2>
        <p>Please use the url below to reset your password</p>  
        <p>This reset link is valid for only 30minutes.</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    const subject = "Password Reset Request";
    const send_to = user.Email;
    const sent_from = process.env.EMAIL_USER;

    try {
        await sendEmail(subject, message, send_to, sent_from);
        res.status(200).json({ success: true, message: "Reset Email Sent" });
    } catch (error) {
        res.status(500);
        throw new Error("Email not sent, please try again");
    }
});

const resetPassword = asyncHandler(async (req, res) => {
    const { Password } = req.body
    const { resetToken } = req.params

    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    const userToken = await Token.findOne({
        token: hashedToken,
        expiresAt: { $gt: Date.now() }
    })

    if (!userToken) {
        res.status(404)
        throw new Error('Expired Token.')
    }

    const user = await User.findOne({ _id: userToken.userId })
    user.Password = Password
    await user.save()
    res.status(200).json({ message: "Password Reset Successful, Please Login." })

})

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    userLoggedIn,
    updateUser,
    changePassword,
    forgotPassword,
    resetPassword
}