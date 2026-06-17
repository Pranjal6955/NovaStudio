import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// ---------- Auth ----------
export const adminLogin = (email: string, password: string) =>
  api.post("/api/admin/login", { email, password }).then((r) => r.data);

export const adminLogout = () =>
  api.post("/api/admin/logout").then((r) => r.data);

// ---------- Services ----------
export const getServices = () =>
  api.get("/api/service/").then((r) => r.data.data);

export const createService = (data: { title: string; description: string }) =>
  api.post("/api/service/", data).then((r) => r.data.data);

export const updateService = (
  id: string,
  data: { title: string; description: string }
) => api.put(`/api/service/${id}`, data).then((r) => r.data.data);

export const deleteService = (id: string) =>
  api.delete(`/api/service/${id}`).then((r) => r.data);

// ---------- Projects ----------
export const getProjects = () =>
  api.get("/api/project/").then((r) => r.data.data);

export const createProject = (data: {
  title: string;
  category: string;
  imageUrl: string;
  techStack: string[];
  description?: string;
}) => api.post("/api/project/", data).then((r) => r.data.data);

export const updateProject = (
  id: string,
  data: {
    title: string;
    category: string;
    imageUrl: string;
    techStack: string[];
    description?: string;
  }
) => api.put(`/api/project/${id}`, data).then((r) => r.data.data);

export const deleteProject = (id: string) =>
  api.delete(`/api/project/${id}`).then((r) => r.data);

// ---------- Stats ----------
export const getStats = () =>
  api.get("/api/stats/").then((r) => r.data.data);

export const updateStats = (
  id: string,
  data: {
    projectsCompleted: number;
    clientWorldwide: number;
    experience: number;
  }
) => api.put(`/api/stats/${id}`, data).then((r) => r.data.data);

// ---------- Contact ----------
export const createContact = (data: {
  name: string;
  email: string;
  message: string;
}) => api.post("/api/contact/", data).then((r) => r.data);

export const getContacts = () =>
  api.get("/api/contact/").then((r) => r.data.data);

export const deleteContact = (id: string) =>
  api.delete(`/api/contact/${id}`).then((r) => r.data);

// ---------- Analytics ----------
export const trackEvent = (data: {
  eventType: string;
  page: string;
  metadata?: Record<string, unknown>;
}) => api.post("/api/analytic/", data).then((r) => r.data);

export const getAnalytics = () =>
  api.get("/api/analytic/").then((r) => r.data.data);

// ---------- Logs ----------
export const getLogs = () =>
  api.get("/api/logs/").then((r) => r.data.data);

export default api;
