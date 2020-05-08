import axios from "axios";

const baseURL = "http://localhost:8000/api/problems";

function getCookie(name) {
  var match = document.cookie.match(
    new RegExp("(^| )" + name + "=([^;]+)")
  );
  if (match) {
    return match[2];
  } else {
    return null;
  }
};

const Api = {
  get: async term => {
    const response = await axios.get(`${baseURL}${term}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${getCookie('Token')}`
      }
    });
    return response.data;
  },
  post: async term => {
    const response = await axios.post(`${baseURL}${term}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${getCookie('Token')}`
      }
    });
    return response.data;
  },
  put: async (term, data) => {
    const response = await axios.put(`${baseURL}${term}`, data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${getCookie('Token')}`
      }
    });
    return response.data;
  },
  delete: async term => {
    const response = await axios.delete(`${baseURL}${term}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${getCookie('Token')}`
      }
    });
    return response.data;
  }
};

export default Api;
