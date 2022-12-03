// ! CHECK VIDEO 84 FOR OUTLOOK HELP

const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const sendEmail = require('../utils/sendEmail')

const contactUs = asyncHandler(async (req, res) => {
    const { Subject, Message } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(400);
        throw new Error("User not found, please signup");
    }

    if (!Subject || !Message) {
        res.status(400);
        throw new Error("Please add subject and message");
    }

    const send_to = process.env.EMAIL_USER;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = user.Email;
    try {
        await sendEmail(Subject, Message, send_to, sent_from, reply_to);
        res.status(200).json({ success: true, message: "Email Sent" });
    } catch (error) {
        res.status(500);
        throw new Error("Email not sent, please try again");
    }

})

module.exports = contactUs