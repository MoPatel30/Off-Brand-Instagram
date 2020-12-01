import axios from "axios"

const instance = axios.create({
    url: "http://localhost:6000"
})

export default instance