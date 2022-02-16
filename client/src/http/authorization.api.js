import axios from "axios";

export const API_URL = '/api'
const api = axios.create({withCredentials: true, baseURL: API_URL})

api.interceptors.request.use(config=>{
    config.headers.Authorization = `Bearer ${localStorage.token}`
    return config
})

export default api