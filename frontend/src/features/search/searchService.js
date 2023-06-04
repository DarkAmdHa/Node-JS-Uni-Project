import axios from 'axios'

const API_URL = '/api/search/'

//Search
const search = async (token, searchData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, searchData, config)

  return response.data
}

const searchService = {
  search,
}

export default searchService
