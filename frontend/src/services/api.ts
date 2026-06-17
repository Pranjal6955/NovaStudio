import axios from "axios";

export const api = axios.create({
    baseURL : process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
    withCredentials: true,
})

// Services API

export const getServices = async() => {
    const response = await api.get("/service")
    return response.data;
}

export const createService = async(data: { title: string; description: string }) => {
    const response = await api.post("/service", data)
    return response.data;
}

export const updateService = async(id: string, data: { title: string; description: string }) => {
    const response = await api.put(`/service/${id}`, data)
    return response.data;
}

export const deleteService = async(id: string) => {
    const response = await api.delete(`/service/${id}`)
    return response.data;
}

// Project/Portfolio API

export const getProject = async() => {
    const response = await api.get("/project")
    return response.data;
}

export const createProject = async(data: {
    title: string;
    category: string;
    imageUrl: string;
    techStack: string[];
    description?: string;
}) => {
    const response = await api.post("/project", data)
    return response.data;
}

export const updateProject = async(id: string, data: {
    title?: string;
    category?: string;
    imageUrl?: string;
    techStack?: string[];
    description?: string;
}) => {
    const response = await api.put(`/project/${id}`, data)
    return response.data;
}

export const deleteProject = async(id: string) => {
    const response = await api.delete(`/project/${id}`)
    return response.data;
}

// Stats API

export const getStats = async () => {
    const response = await api.get("/stats")
    return response.data;
}

export const updateStats = async (id: string, data: {
    projectsCompleted?: number;
    clientWorldwide?: number;
    experience?: number;
}) => {
    const response = await api.put(`/stats/${id}`, data)
    return response.data;
}

// Contact API

export const createContact = async (data : {
    name : string,
    email : string,
    message : string,
}) => {
    const response = await api.post("/contact",data)
    return response.data
}

export const getContacts = async () => {
    const response = await api.get("/contact")
    return response.data
}

// Analytics API

export const trackEvent = async (data: {
    eventType: "PAGE_VISIT" | "CTA_CLICK" | "CONTACT_SUBMIT";
    page: string;
    metadata?: Record<string, any>;
}) => {
    const response = await api.post("/analytic", data)
    return response.data
}

export const getAnalytics = async () => {
    const response = await api.get("/analytic")
    return response.data
}

// Admin Auth API

export const adminLogin = async (data: { email: string; password: string }) => {
    const response = await api.post("/admin/login", data)
    return response.data
}

export const adminLogout = async () => {
    const response = await api.post("/admin/logout")
    return response.data
}

// Admin Logs API

export const getLogs = async () => {
    const response = await api.get("/logs")
    return response.data
}