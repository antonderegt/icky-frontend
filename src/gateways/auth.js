import axios from "axios";

const baseURL = "http://localhost:8000/api-token-auth";

const Login = {
  post: async data => {
    const response = await axios.post(`${baseURL}/`, data, {
      headers: {
        "Content-Type": "application/json",
        // "Authorization": "Token c35b929929c4aded4412f88a9f8c5858d3396e1a"
      }
    });
    return response.data;
  }
};

export default Login;
