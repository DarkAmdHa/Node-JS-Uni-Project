const asyncHandler = require('express-async-handler')

const Patent = require('../models/patentModel')
const User = require('../models/userModel')

// @desc    Get user patents
//@route    GET /api/patents/
//@access   Private
const getPatents = asyncHandler(async (req, res) => {
  //Get user using id and the jwt

  const patents = await Patent.find({})
  res.status(200).json(patents)
})

// @desc    Get user patent
//@route    GET /api/patents/:id
//@access   Private
const getPatent = asyncHandler(async (req, res) => {
  const patent = await Patent.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { totalViews: 1 } }
  )
  if (!patent) {
    res.status(404)
    throw new Error('Patent not found')
  }

  res.status(200).json(patent)
})

// @desc    Create a patent
//@route    POST /api/patents/
//@access   Private
const createPatent = asyncHandler(async (req, res) => {
  const {
    createdBy,
    name,
    excerpt,
    authorizationDate,
    contributors,
    sauAuthorProfessor,
    sauProfessorEmail,
    sauProfessorDepartment,
    relevantTags,
  } = req.body
  console.log(req.body)
  if (
    !name ||
    !excerpt ||
    !authorizationDate ||
    !contributors ||
    !sauAuthorProfessor ||
    !sauProfessorEmail ||
    !relevantTags ||
    !sauProfessorDepartment
  ) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // Find if title already exists
  const titleExists = await Patent.findOne({ name })

  if (titleExists) {
    res.status(400)
    throw new Error('Patent already exists')
  }

  const yy = await User.findById(createdBy)
  console.log(yy)

  const patent = await Patent.create(
    {
      createdBy,
      name,
      excerpt,
      authorizationDate,
      contributors,
      sauAuthorProfessor,
      sauProfessorEmail,
      sauProfessorDepartment,
      relevantTags,
    },
    (err, patent) => {
      User.findById(req.body.createdBy, (err, user) => {
        user.update(
          {
            $push: {
              patents: patent._id,
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
              res.status(200).send(patent)
            }
          }
        )
      })
    }
  )
})

//@desc     Update a patent
//@route    PUT /api/patents/:id
//@access   Private
const updatePatent = asyncHandler(async (req, res) => {
  const {
    name,
    excerpt,
    authorizationDate,
    contributors,
    sauAuthorProfessor,
    sauProfessorEmail,
    sauProfessorDepartment,
    relevantTags,
  } = req.body

  console.log(req.body)

  // Find if title already exists
  const titleExists = await Patent.findOne({ name })

  if (titleExists && titleExists._id != req.params.id) {
    res.status(400)
    throw new Error('Patent with that title already exists')
  }

  const updateObj = {}
  if (name != '') {
    updateObj.name = name
  }
  if (excerpt != '') {
    updateObj.excerpt = excerpt
  }
  if (authorizationDate != '') {
    updateObj.authorizationDate = authorizationDate
  }
  if (contributors != '') {
    updateObj.contributors = contributors
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
  let patent
  if (Object.keys(updateObj).length > 0) {
    patent = await Patent.findOneAndUpdate({ _id: req.params.id }, updateObj, {
      new: true,
    })
  } else {
    res.status(404)
    throw new Error('No data to update.')
  }

  if (!patent) {
    res.status(404)
    throw new Error('Patent not found')
  }
  res.status(200).send(patent)
})

//@desc     Delete A Patent
//@route    DELETE /api/patents/:id
//@access   Private
const deletePatent = asyncHandler(async (req, res) => {
  const patent = await Patent.findOneAndDelete({
    _id: req.params.id,
  })
  if (!patent) {
    res.status(404)
    throw new Error('Patent not found')
  }

  res.status(200).json({ message: 'Patent Deleted.' })
})

module.exports = {
  getPatents,
  getPatent,
  createPatent,
  updatePatent,
  deletePatent,
}
