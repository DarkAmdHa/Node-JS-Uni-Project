const mongoose = require('mongoose')
const dotenv = require('dotenv')

const colors = require('colors')
const publishedPapers = require('./data/publishedPapers.js')
const patents = require('./data/patents.js')
const projects = require('./data/projects.js')
const PublishedPaper = require('./models/publishedPaperModel.js')
const Patent = require('./models/PatentModel.js')
const Project = require('./models/ProjectModel.js')
const connectDB = require('./config/db.js')

dotenv.config()
connectDB()

const importData = async () => {
  try {
    await PublishedPaper.deleteMany()
    await Patent.deleteMany()
    await Project.deleteMany()

    const samplePublishedPapers = publishedPapers.map((publishedPaper) => {
      return { ...publishedPaper }
    })
    const samplePatents = patents.map((patent) => {
      return { ...patent }
    })
    const sampleProjects = projects.map((project) => {
      return { ...project }
    })

    await PublishedPaper.insertMany(samplePublishedPapers)
    await Patent.insertMany(samplePatents)
    await Project.insertMany(sampleProjects)

    console.log(`Data Imported`.green.inverse)
    process.exit()
  } catch (error) {
    console.log(`Error: ${error}`.red.inverse)
    process.exit(1)
  }
}
const destroyData = async () => {
  try {
    await PublishedPaper.deleteMany()
    await Patent.deleteMany()
    await Project.deleteMany()

    console.log(`Data Destroyed`.red.inverse)
    process.exit()
  } catch (error) {
    console.log(`Error: ${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
