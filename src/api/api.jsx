import axios, { Axios } from "axios"

const api=axios.create({
    baseURL:"http://40.192.14.44/api",
     withCredentials:true,
})
export default api