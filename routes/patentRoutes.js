const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

const {
  getPatents,
  getPatent,
  createPatent,
  deletePatent,
  updatePatent,
} = require('../controllers/patentController')

router.route('/').get(protect, getPatents).post(protect, createPatent)

router
  .route('/:id')
  .get(protect, getPatent)
  .put(protect, updatePatent)
  .delete(protect, deletePatent)
module.exports = router
