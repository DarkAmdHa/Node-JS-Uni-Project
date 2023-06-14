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

const createProject = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, data, config)
  return response.data
}
const updateProject = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    API_URL + data.id,
    data.editModeProjectFormData,
    config
  )
  return response.data
}
const deleteProject = async (projectId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + projectId, config)
  return response.data
}

const projectsService = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
}

export default projectsService
