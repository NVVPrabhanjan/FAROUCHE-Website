import axios from "axios";

const isLocal =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1");

const BACKEND_URL = isLocal ? "http://localhost:4000" : "https://your-production-backend.com";
const EVENT_API_URL = `${BACKEND_URL}/api/v1/event`;
const RESULT_API_URL = `${BACKEND_URL}/api/v1/results`;

const axiosInstance = axios.create({
    baseURL: `${BACKEND_URL}/api/v1/admin`,
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const authHeaders = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const adminLogin = async (credentials: any) => {
    const response = await axiosInstance.post("/login", credentials);
    return response.data;
};

export const adminSignup = async (credentials: any) => {
    const response = await axiosInstance.post("/signup", credentials);
    return response.data;
};

export const fetchEventsAdmin = async () => {
    const response = await axiosInstance.get("/events");
    return response.data;
};

export const fetchEventRegistrations = async (eventId: string) => {
    const response = await axiosInstance.get(`/event/${eventId}/registrations`);
    return response.data;
};

export const markAttendance = async (registrationId: string, status: boolean) => {
    const response = await axiosInstance.post("/attendance", { registrationId, status });
    return response.data;
};

export const sendCustomEmail = async (data: any) => {
    const response = await axiosInstance.post("/email", data);
    return response.data;
};

export const addEvent = async (formData: FormData) => {
    const response = await axios.post(`${EVENT_API_URL}/addEvent`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data", ...authHeaders() },
    });
    return response.data;
};

export const updateEvent = async (formData: FormData) => {
    const response = await axios.put(`${EVENT_API_URL}/updateEvent`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data", ...authHeaders() },
    });
    return response.data;
};

export const deleteEvent = async (eventId: string) => {
    const response = await axios.delete(`${EVENT_API_URL}/deleteEvent`, {
        withCredentials: true,
        headers: authHeaders(),
        data: { eventId },
    });
    return response.data;
};

export const addResult = async (formData: FormData) => {
    const response = await axios.post(`${RESULT_API_URL}/addResults`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data", ...authHeaders() },
    });
    return response.data;
};
