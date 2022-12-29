const asyncHandler = require('express-async-handler')

const Patent = require('../models/patentModel')

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

module.exports = {
  getPatents,
  getPatent,
}
