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

const createPatent = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, data, config)
  return response.data
}
const updatePatent = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    API_URL + data.id,
    data.editModePatentFormData,
    config
  )
  return response.data
}
const deletePatent = async (patentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + patentId, config)
  return response.data
}

const patentsService = {
  getPatents,
  getPatent,
  createPatent,
  updatePatent,
  deletePatent,
}

export default patentsService
