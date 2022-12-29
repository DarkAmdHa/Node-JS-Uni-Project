const asyncHandler = require('express-async-handler')

const PublishedPaper = require('../models/publishedPaperModel')

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
    { $inc: { totalViews: 1 } }
  )
  if (!publishedPaper) {
    res.status(404)
    throw new Error('Published Paper not found')
  }

  res.status(200).json(publishedPaper)
})

module.exports = {
  getPublishedPapers,
  getPublishedPaper,
}
