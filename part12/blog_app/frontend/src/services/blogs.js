import axios from 'axios'
const baseUrl = process.env.REACT_APP_BACKEND_URL + 'api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const createComment = async (blogId, newComment) => {
  const url = `${baseUrl}/${blogId}/comments`
  const response = await axios.post(url, newComment)
  return response.data
}

const update = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const url = `${baseUrl}/${newObject.id}`

  const response = await axios.put(url, newObject, config)
  return response.data
}

const remove = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const url = `${baseUrl}/${newObject.id}`
  const response = await axios.delete(url, config)
  return response.data
}

const blogService = { getAll, create, setToken, update, remove, createComment }

export default blogService
