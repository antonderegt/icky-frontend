import axios from "axios";

const baseURL = "http://localhost:8000/api-token-auth";

const Login = {
  post: async data => {
    const response = await axios.post(`${baseURL}/`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  }
};

export default Login;
