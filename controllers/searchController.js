const asyncHandler = require('express-async-handler')

const Patent = require('../models/patentModel')
const Project = require('../models/projectModel')
const PublishedPaper = require('../models/publishedPaperModel')

// @desc    Search for documents
// @route   POST /api/search
// @access  Public
const search = asyncHandler(async (req, res) => {
  const { searchValue, searchThrough, specificField } = req.body
  try {
    let results = []
    switch (searchThrough) {
      case 'All':
        // Search all models
        const publishedPapers = await PublishedPaper.find({
          $or: [
            { name: { $regex: searchValue, $options: 'i' } },
            { excerpt: { $regex: searchValue, $options: 'i' } },
            { contributors: { $regex: searchValue, $options: 'i' } },
            { sauAuthorProfessor: { $regex: searchValue, $options: 'i' } },
            { sauProfessorDepartment: { $regex: searchValue, $options: 'i' } },
            { sauProfessorEmail: { $regex: searchValue, $options: 'i' } },
            { relevantTags: { $regex: searchValue, $options: 'i' } },
          ],
        })
          .limit(5)
          .lean()
        const projects = await Project.find({
          $or: [
            { name: { $regex: searchValue, $options: 'i' } },
            { projectDetails: { $regex: searchValue, $options: 'i' } },
            { projectCollaborators: { $regex: searchValue, $options: 'i' } },
            { sauAuthorProfessor: { $regex: searchValue, $options: 'i' } },
            { sauProfessorDepartment: { $regex: searchValue, $options: 'i' } },
            { sauProfessorEmail: { $regex: searchValue, $options: 'i' } },
            { relevantTags: { $regex: searchValue, $options: 'i' } },
          ],
        })
          .limit(5)
          .lean()
        const patents = await Patent.find({
          $or: [
            { name: { $regex: searchValue, $options: 'i' } },
            { excerpt: { $regex: searchValue, $options: 'i' } },
            { contributors: { $regex: searchValue, $options: 'i' } },
            { sauAuthorProfessor: { $regex: searchValue, $options: 'i' } },
            { sauProfessorDepartment: { $regex: searchValue, $options: 'i' } },
            { sauProfessorEmail: { $regex: searchValue, $options: 'i' } },
            { relevantTags: { $regex: searchValue, $options: 'i' } },
          ],
        })
          .limit(5)
          .lean()

        publishedPapers.forEach((publishedPaper) => {
          publishedPaper.url = '/published-paper/' + publishedPaper._id
          publishedPaper.type = 'Published Paper'
        })
        projects.forEach((project) => {
          project.url = '/project/' + project._id
          project.type = 'Project'
        })
        patents.forEach((patent) => {
          patent.url = '/patent/' + patent._id
          patent.type = 'Patent'
        })

        results = [...publishedPapers, ...projects, ...patents]
        break
      case 'publishedPapers':
        // Search only in publishedPapers model
        results = await PublishedPaper.find({
          $or: [
            { name: { $regex: searchValue, $options: 'i' } },
            { excerpt: { $regex: searchValue, $options: 'i' } },
            { contributors: { $regex: searchValue, $options: 'i' } },
            { sauAuthorProfessor: { $regex: searchValue, $options: 'i' } },
            { sauProfessorDepartment: { $regex: searchValue, $options: 'i' } },
            { sauProfessorEmail: { $regex: searchValue, $options: 'i' } },
            { relevantTags: { $regex: searchValue, $options: 'i' } },
          ],
        })
          .limit(5)
          .lean()

        results.forEach((publishedPaper) => {
          publishedPaper.url = '/published-paper/' + publishedPaper._id
          publishedPaper.type = 'Published Paper'
        })
        break

      case 'projects':
        // Search only in projects model
        results = await Project.find({
          $or: [
            { name: { $regex: searchValue, $options: 'i' } },
            { projectDetails: { $regex: searchValue, $options: 'i' } },
            { projectCollaborators: { $regex: searchValue, $options: 'i' } },
            { sauAuthorProfessor: { $regex: searchValue, $options: 'i' } },
            { sauProfessorDepartment: { $regex: searchValue, $options: 'i' } },
            { sauProfessorEmail: { $regex: searchValue, $options: 'i' } },
            { relevantTags: { $regex: searchValue, $options: 'i' } },
          ],
        })
          .limit(5)
          .lean()
        results.forEach((project) => {
          project.url = '/project/' + project._id
          project.type = 'Project'
        })

        break
      case 'patents':
        // Search only in patents model
        results = await Patent.find({
          $or: [
            { name: { $regex: searchValue, $options: 'i' } },
            { excerpt: { $regex: searchValue, $options: 'i' } },
            { contributors: { $regex: searchValue, $options: 'i' } },
            { sauAuthorProfessor: { $regex: searchValue, $options: 'i' } },
            { sauProfessorDepartment: { $regex: searchValue, $options: 'i' } },
            { sauProfessorEmail: { $regex: searchValue, $options: 'i' } },
            { relevantTags: { $regex: searchValue, $options: 'i' } },
          ],
        })
          .limit(5)
          .lean()
        results.forEach((patent) => {
          patent.url = '/patent/' + patent._id
          patent.type = 'Patent'
        })

        break
      default:
        // Invalid searchThrough value
        return res.status(400).json({ error: 'Invalid searchThrough value' })
    }

    if (specificField !== 'All') {
      results = results.filter((result) => result[specificField])
    }

    // Return the search results
    return res.json(results)
  } catch (error) {
    console.error('Error searching:', error)
    throw new Error('An error occurred while searching')
    return res.status(500).json({ error: 'An error occurred while searching' })
  }
})

module.exports = {
  search,
}
