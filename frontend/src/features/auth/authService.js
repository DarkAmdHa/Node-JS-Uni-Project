import axios from 'axios'

const API_URL = '/api/users/'

//Register User
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
    return response.data
  }
}

//Login User
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
    return response.data
  }
}

//refetchUser
const refetchUser = async (userData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  }

  const response = await axios.get(API_URL + 'currentUser', config)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
    return response.data
  }
}
//Logout User
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
  refetchUser,
}

export default authService
