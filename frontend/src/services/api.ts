import axios from "axios";

export const api = axios.create({
    baseURL : process.env.NEXT_PUBLIC_API_URL,
})

// Services API

export const getServices = async() => {
    const response = await api.get("/service")
    return response.data;
}