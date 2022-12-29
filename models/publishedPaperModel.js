const mongoose = require('mongoose')

const publishedPaperSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    journalOfPublication: {
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
    linkToPublication: {
      type: String,
      required: true,
    },
    sauProfessorEmail: {
      type: String,
      required: true,
    },
    sauProfessorDepartment: {
      type: String,
      required: true,
    },
    dateWritten: {
      type: Date,
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

module.exports = mongoose.model('publishedPaper', publishedPaperSchema)
