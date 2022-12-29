const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

const { getPatents, getPatent } = require('../controllers/patentController')

router.route('/').get(protect, getPatents)

router.route('/:id').get(protect, getPatent)
module.exports = router
