import axios from "axios";

const instance = axios.create({
    baseURL: "http://192.168.1.46:8080",
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
    }
})

export const get = async (api) => {
    const response = await instance.get(api)
    return response.data
}
export default instance