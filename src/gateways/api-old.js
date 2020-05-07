import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000/api/problems",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json"
  }
});