const asyncHandler = require('express-async-handler')

const Project = require('../models/projectModel')
const User = require('../models/userModel')

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

// @desc    Create a project
//@route    POST /api/projects/
//@access   Private
const createProject = asyncHandler(async (req, res) => {
  const {
    createdBy,
    name,
    projectDetails,
    projectFunding,
    projectCollaborators,
    sauAuthorProfessor,
    sauProfessorDepartment,
    sauProfessorEmail,
    relevantTags,
  } = req.body

  if (
    !name ||
    !projectDetails ||
    !projectFunding ||
    !projectCollaborators ||
    !sauAuthorProfessor ||
    !sauProfessorDepartment ||
    !sauProfessorEmail ||
    !relevantTags
  ) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // Find if title already exists
  const titleExists = await Project.findOne({ name })

  if (titleExists) {
    res.status(400)
    throw new Error('Project already exists')
  }

  const project = await Project.create(
    {
      createdBy,
      name,
      projectDetails,
      projectFunding,
      projectCollaborators,
      sauAuthorProfessor,
      sauProfessorDepartment,
      sauProfessorEmail,
      relevantTags,
    },
    (err, project) => {
      User.findById(req.body.createdBy, (err, user) => {
        user.update(
          {
            $push: {
              projects: project._id,
            },
          },
          function (err) {
            if (err) {
              res
                .status(500)
                .send(
                  'There was a problem adding the information to the database.'
                )
            } else {
              res.status(200).send(project)
            }
          }
        )
      })
    }
  )
})

//@desc     Update a project
//@route    PUT /api/projects/:id
//@access   Private
const updateProject = asyncHandler(async (req, res) => {
  const {
    name,
    projectDetails,
    projectFunding,
    projectCollaborators,
    sauAuthorProfessor,
    sauProfessorDepartment,
    sauProfessorEmail,
    relevantTags,
  } = req.body

  // Find if title already exists
  const titleExists = await Project.findOne({ name })

  if (titleExists && titleExists._id != req.params.id) {
    res.status(400)
    throw new Error('Project with that title already exists')
  }

  const updateObj = {}
  if (name != '') {
    updateObj.name = name
  }
  if (projectDetails != '') {
    updateObj.projectDetails = projectDetails
  }
  if (projectFunding != '') {
    updateObj.projectFunding = projectFunding
  }
  if (projectCollaborators != '') {
    updateObj.projectCollaborators = projectCollaborators
  }
  if (sauAuthorProfessor != '') {
    updateObj.sauAuthorProfessor = sauAuthorProfessor
  }
  if (sauProfessorEmail != '') {
    updateObj.sauProfessorEmail = sauProfessorEmail
  }
  if (sauProfessorDepartment != '') {
    updateObj.sauProfessorDepartment = sauProfessorDepartment
  }
  if (relevantTags != '') {
    updateObj.relevantTags = relevantTags
  }
  let project
  if (Object.keys(updateObj).length > 0) {
    project = await Project.findOneAndUpdate(
      { _id: req.params.id },
      updateObj,
      {
        new: true,
      }
    )
  } else {
    res.status(404)
    throw new Error('No data to update.')
  }

  if (!project) {
    res.status(404)
    throw new Error('Project not found')
  }
  res.status(200).send(project)
})

//@desc     Delete A Project
//@route    DELETE /api/projects/:id
//@access   Private
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findOneAndDelete({
    _id: req.params.id,
  })
  if (!project) {
    res.status(404)
    throw new Error('Project not found')
  }

  res.status(200).json({ message: 'Project Deleted.' })
})

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
}
