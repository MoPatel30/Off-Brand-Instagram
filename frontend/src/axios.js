import axios from "axios"

const instance = axios.create({
    baseURL: "http://localhost:3001"
})
// https://off-brand-instagram.web.app
export default instance