const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

const {
  getPublishedPapers,
  getPublishedPaper,
} = require('../controllers/publishedPaperController')

router.route('/').get(protect, getPublishedPapers)

router.route('/:id').get(protect, getPublishedPaper)
module.exports = router
