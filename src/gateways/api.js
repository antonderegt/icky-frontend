import axios from "axios";

const baseURL = "http://localhost:8000/api/problems";

const Api = {
  get: async term => {
    const response = await axios.get(`${baseURL}${term}`, {
      headers: {
        "Content-Type": "application/json",
        // "Authorization": "Token c35b929929c4aded4412f88a9f8c5858d3396e1a"
      }
    });
    return response.data;
  },
  post: async term => {
    const response = await axios.post(`${baseURL}${term}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token c35b929929c4aded4412f88a9f8c5858d3396e1a"
      }
    });
    return response.data;
  },
  put: async (term, data) => {
    const response = await axios.put(`${baseURL}${term}`, data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token c35b929929c4aded4412f88a9f8c5858d3396e1a"
      }
    });
    return response.data;
  },
  delete: async term => {
    const response = await axios.delete(`${baseURL}${term}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token c35b929929c4aded4412f88a9f8c5858d3396e1a"
      }
    });
    return response.data;
  }
};

export default Api;
