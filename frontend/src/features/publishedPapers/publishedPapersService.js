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

const publishedPapersService = { getPublishedPapers, getPublishedPaper }

export default publishedPapersService
