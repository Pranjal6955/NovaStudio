import axios from "axios";

export const api = axios.create({
    baseURL : process.env.NEXT_PUBLIC_API_URL,
})

// Services API

export const getServices = async() => {
    const response = await api.get("/service")
    return response.data;
}

// Project/Portfolio API

export const getProject = async() => {
    const response = await api.get("/project")
    return response.data;
}

// Stats API

export const getStats = async () => {
    const response = await api.get("/stats")
    return response.data;
}