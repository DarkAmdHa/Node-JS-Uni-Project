import axios from 'axios'

const API_URL = '/api/projects/'

//Get Projects
const getProjects = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

//Get specific project
const getProject = async (projectId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + projectId, config)
  return response.data
}

const projectsService = { getProjects, getProject }

export default projectsService
