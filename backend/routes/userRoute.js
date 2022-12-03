const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')

const {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    userLoggedIn,
    updateUser,
    changePassword,
    forgotPassword,
    resetPassword
} = require('../controllers/userController')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/user', protect, getUser)
router.get('/userloggedin', userLoggedIn)
router.patch('/updateuser', protect, updateUser)
router.patch('/changepassword', protect, changePassword)
router.post('/forgotpassword', forgotPassword)
router.put('/resetpassword/:resetToken', resetPassword)

module.exports = router