import axios from 'axios'
import { compareSync } from 'bcryptjs'

const API_URL = '/api/publishedPapers/'

//Get Published Papers
const getPublishedPapers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)

  return response.data
}

//Get specific Published Paper
const getPublishedPaper = async (paperId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + paperId, config)
  return response.data
}

const createPublishedPaper = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, data, config)
  return response.data
}
const updatePublishedPaper = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    API_URL + data.id,
    data.editModePaperFormData,
    config
  )
  return response.data
}
const deletePublishedPaper = async (paperId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + paperId, config)
  return response.data
}

const publishedPapersService = {
  getPublishedPapers,
  getPublishedPaper,
  createPublishedPaper,
  updatePublishedPaper,
  deletePublishedPaper,
}

export default publishedPapersService
