import axios  from "axios";

const axiosClient = axios.create({
    baseURL: 'https://ophim1.com/phim/',
    headers: 'application/json'
})

export default axiosClient