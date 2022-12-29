const mongoose = require('mongoose')

const patentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    authorizationDate: {
      type: Date,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    contributors: {
      type: String,
      required: true,
    },
    sauAuthorProfessor: {
      type: String,
      required: true,
    },
    sauProfessorDepartment: {
      type: String,
      required: true,
    },
    sauProfessorEmail: {
      type: String,
      required: true,
    },
    totalViews: {
      type: Number,
      required: false,
      default: 0,
    },
    //This is for searching and/or SEO purposes
    relevantTags: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('patent', patentSchema)
