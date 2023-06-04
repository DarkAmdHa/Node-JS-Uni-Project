const express = require('express')
const {
  registerUser,
  loginUser,
  getUserDetails,
} = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/', registerUser)

router.post('/login', loginUser)

router.get('/currentUser', protect, getUserDetails)
module.exports = router
