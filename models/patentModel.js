const mongoose = require('mongoose')

const patentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      text: true, // Add text index to the 'name' field
    },
    authorizationDate: {
      type: Date,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
      text: true, // Add text index to the 'excerpt' field
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
    relevantTags: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

patentSchema.index({ name: 'text', excerpt: 'text', contributors: 'text' }) // Define the text index

module.exports = mongoose.model('patent', patentSchema)
