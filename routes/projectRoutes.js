const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

const { getProjects, getProject } = require('../controllers/projectController')

router.route('/').get(protect, getProjects)

router.route('/:id').get(protect, getProject)
module.exports = router
