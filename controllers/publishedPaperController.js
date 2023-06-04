const asyncHandler = require('express-async-handler')

const PublishedPaper = require('../models/publishedPaperModel')
const User = require('../models/userModel')

// @desc    Get user publishedPapers
//@route    GET /api/publishedPapers/
//@access   Private
const getPublishedPapers = asyncHandler(async (req, res) => {
  //Get user using id and the jwt

  const publishedPapers = await PublishedPaper.find({})
  res.status(200).json(publishedPapers)
})

// @desc    Get user publishedPaper
//@route    GET /api/publishedPapers/:id
//@access   Private
const getPublishedPaper = asyncHandler(async (req, res) => {
  const publishedPaper = await PublishedPaper.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { totalViews: 1 } },
    {
      new: true,
    }
  )
  if (!publishedPaper) {
    res.status(404)
    throw new Error('Published Paper not found')
  }

  res.status(200).json(publishedPaper)
})

// @desc    Create a publishedPaper
//@route    POST /api/publishedPapers/
//@access   Private
const createPublishedPaper = asyncHandler(async (req, res) => {
  const {
    createdBy,
    name,
    excerpt,
    journalOfPublication,
    contributors,
    sauAuthorProfessor,
    linkToPublication,
    sauProfessorEmail,
    sauProfessorDepartment,
    dateWritten,
    relevantTags,
  } = req.body

  if (
    !name ||
    !excerpt ||
    !journalOfPublication ||
    !contributors ||
    !sauAuthorProfessor ||
    !linkToPublication ||
    !sauProfessorEmail ||
    !relevantTags ||
    !dateWritten ||
    !sauProfessorDepartment
  ) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // Find if title already exists
  const titleExists = await PublishedPaper.findOne({ name })

  if (titleExists) {
    res.status(400)
    throw new Error('Paper already exists')
  }

  const yy = await User.findById(createdBy)

  const publishedPaper = await PublishedPaper.create(
    {
      createdBy,
      name,
      excerpt,
      journalOfPublication,
      contributors,
      sauAuthorProfessor,
      linkToPublication,
      sauProfessorEmail,
      sauProfessorDepartment,
      dateWritten,
      relevantTags,
    },
    (err, publishedPaper) => {
      User.findById(req.body.createdBy, (err, user) => {
        user.update(
          {
            $push: {
              papersPublished: publishedPaper._id,
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
              res.status(200).send(publishedPaper)
            }
          }
        )
      })
    }
  )
})

//@desc     Update a publishedPaper
//@route    PUT /api/publishedPapers/:id
//@access   Private
const updatePublishedPaper = asyncHandler(async (req, res) => {
  const {
    name,
    excerpt,
    journalOfPublication,
    contributors,
    sauAuthorProfessor,
    linkToPublication,
    sauProfessorEmail,
    sauProfessorDepartment,
    dateWritten,
    relevantTags,
  } = req.body

  // Find if title already exists
  const titleExists = await PublishedPaper.findOne({ name })

  if (titleExists && titleExists._id != req.params.id) {
    res.status(400)
    throw new Error('Paper with that title already exists')
  }

  const updateObj = {}
  if (name != '') {
    updateObj.name = name
  }
  if (excerpt != '') {
    updateObj.excerpt = excerpt
  }
  if (journalOfPublication != '') {
    updateObj.journalOfPublication = journalOfPublication
  }
  if (contributors != '') {
    updateObj.contributors = contributors
  }
  if (sauAuthorProfessor != '') {
    updateObj.sauAuthorProfessor = sauAuthorProfessor
  }
  if (linkToPublication != '') {
    updateObj.linkToPublication = linkToPublication
  }
  if (sauProfessorEmail != '') {
    updateObj.sauProfessorEmail = sauProfessorEmail
  }
  if (sauProfessorDepartment != '') {
    updateObj.sauProfessorDepartment = sauProfessorDepartment
  }
  if (dateWritten != '') {
    updateObj.dateWritten = dateWritten
  }
  if (relevantTags != '') {
    updateObj.relevantTags = relevantTags
  }
  let publishedPaper
  if (Object.keys(updateObj).length > 0) {
    publishedPaper = await PublishedPaper.findOneAndUpdate(
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

  if (!publishedPaper) {
    res.status(404)
    throw new Error('Published Paper not found')
  }
  res.status(200).send(publishedPaper)
})

//@desc     Delete A Published`Paper
//@route    DELETE /api/publishedPapers/:id
//@access   Private
const deletePublishedPaper = asyncHandler(async (req, res) => {
  const publishedPaper = await PublishedPaper.findOneAndDelete({
    _id: req.params.id,
  })
  if (!publishedPaper) {
    res.status(404)
    throw new Error('Published Paper not found')
  }

  res.status(200).json({ message: 'Paper Deleted.' })
})

module.exports = {
  getPublishedPapers,
  getPublishedPaper,
  createPublishedPaper,
  updatePublishedPaper,
  deletePublishedPaper,
}
