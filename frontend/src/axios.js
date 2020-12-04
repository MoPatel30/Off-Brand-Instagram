import axios from "axios"

const instance = axios.create({
    baseURL: "https://off-brand-instagram.web.app"
})
// https://off-brand-instagram.web.app
export default instance