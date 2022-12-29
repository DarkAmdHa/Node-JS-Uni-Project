const asyncHandler = require('express-async-handler')

const Project = require('../models/projectModel')

// @desc    Get user projects
//@route    GET /api/projects/
//@access   Private
const getProjects = asyncHandler(async (req, res) => {
  //Get user using id and the jwt

  const projects = await Project.find({})
  res.status(200).json(projects)
})

// @desc    Get user project
//@route    GET /api/projects/:id
//@access   Private
const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { totalViews: 1 } }
  )
  if (!project) {
    res.status(404)
    throw new Error('Project not found')
  }

  res.status(200).json(project)
})

module.exports = {
  getProjects,
  getProject,
}
