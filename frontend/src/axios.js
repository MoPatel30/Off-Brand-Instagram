import axios from "axios"

const instance = axios.create({
    baseURL: "http://off-brand-instagram.web.app"
})

export default instance