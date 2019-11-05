import axios from 'axios'

const api = axios.create({
    withCredentials: false,
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
})

export default api