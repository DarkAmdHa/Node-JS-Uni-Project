const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

const {
  getProjects,
  getProject,
  createProject,
  deleteProject,
  updateProject,
} = require('../controllers/projectController')

router.route('/').get(protect, getProjects).post(protect, createProject)

router
  .route('/:id')
  .get(protect, getProject)
  .put(protect, updateProject)
  .delete(protect, deleteProject)
module.exports = router
