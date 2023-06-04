const mongoose = require('mongoose')

const publishedPaperSchema = mongoose.Schema(
  {
    createdBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    name: {
      type: String,
      required: true,
      text: true, // Add text index to the 'name' field
    },
    excerpt: {
      type: String,
      required: true,
      text: true, // Add text index to the 'excerpt' field
    },
    journalOfPublication: {
      type: String,
      required: true,
    },
    contributors: {
      type: String,
      required: true,
      text: true, // Add text index to the 'contributors' field
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
    relevantTags: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

publishedPaperSchema.index({
  name: 'text',
  excerpt: 'text',
  contributors: 'text',
}) // Define the text index

module.exports = mongoose.model('publishedPaper', publishedPaperSchema)
