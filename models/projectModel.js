const mongoose = require('mongoose')

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      text: true, // Add text index to the 'name' field
    },
    projectDetails: {
      type: String,
      required: true,
      text: true, // Add text index to the 'projectDetails' field
    },
    projectFunding: {
      type: Number,
      required: true,
    },
    projectCollaborators: {
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
    relevantTags: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

projectSchema.index({ name: 'text', projectDetails: 'text' }) // Define the text index

module.exports = mongoose.model('project', projectSchema)
