import axios from 'axios'
const baseUrl = process.env.REACT_APP_BACKEND_URL + 'api/users'

const getAll = async () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const userService = {
  getAll,
}

export default userService
