import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const delete_person = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

const personsService = {
  getAll,
  create,
  update,
  delete_person,
};

export default personsService;
