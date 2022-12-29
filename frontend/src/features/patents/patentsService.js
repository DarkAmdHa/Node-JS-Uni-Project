import axios from 'axios'

const API_URL = '/api/patents/'

//Get Patent
const getPatents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

//Get specific Patent
const getPatent = async (patentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + patentId, config)
  return response.data
}

const patentsService = { getPatents, getPatent }

export default patentsService
