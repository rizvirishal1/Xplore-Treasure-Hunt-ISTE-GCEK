import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api/";

const api = axios.create({
    baseURL: baseURL,
});

export default api;