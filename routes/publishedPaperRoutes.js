const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

const {
  getPublishedPapers,
  getPublishedPaper,
  createPublishedPaper,
  updatePublishedPaper,
  deletePublishedPaper,
} = require('../controllers/publishedPaperController')

router
  .route('/')
  .get(protect, getPublishedPapers)
  .post(protect, createPublishedPaper)

router
  .route('/:id')
  .get(protect, getPublishedPaper)
  .put(protect, updatePublishedPaper)
  .delete(protect, deletePublishedPaper)
module.exports = router
