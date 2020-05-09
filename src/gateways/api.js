import axios from "axios";

const baseURL = "http://localhost:8000/api/problems";

const Api = {
  get: async term => {
    const response = await axios.get(`${baseURL}${term}`, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response.data;
  },
  post: async term => {
    const response = await axios.post(`${baseURL}${term}`, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response.data;
  },
  put: async (term, data) => {
    const response = await axios.put(`${baseURL}${term}`, data, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response.data;
  },
  delete: async term => {
    const response = await axios.delete(`${baseURL}${term}`, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response.data;
  }
};

export default Api;
