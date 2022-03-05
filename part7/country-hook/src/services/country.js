import axios from 'axios'

const base_url = 'https://restcountries.com/v3.1/name/'

const getCountry = async country => {
  try {
    const result = await axios.get(`${base_url}${country}`)
    return result.data
  } catch (err) {
    throw err
  }
}

const exp = { getCountry }
export default exp
