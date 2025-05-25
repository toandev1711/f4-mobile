import axios from "axios";

const URL = "http://172.28.128.1:8080"

const instance = axios.create({
    baseURL: URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    }
})

export const get = async (api) => {
    const response = await instance.get(api)
    return response.data
}

export default instance