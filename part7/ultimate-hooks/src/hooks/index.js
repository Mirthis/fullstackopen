import { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = baseUrl => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => setResources(response.data))
      .catch(err => {
        throw err
      })
  }, [baseUrl])

  const create = resource => {
    axios
      .post(baseUrl, resource)
      .then(response => setResources(resources.concat(response.data)))
      .catch(err => {
        throw err
      })
  }

  const service = {
    create,
  }

  return [resources, service]
}
