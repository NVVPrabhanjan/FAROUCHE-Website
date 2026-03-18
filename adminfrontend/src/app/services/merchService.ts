import axios from "axios";

const isLocal =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1");

const BACKEND_URL = isLocal ? "http://localhost:4000" : "https://farouche.in";

const axiosInstance = axios.create({
    baseURL: `${BACKEND_URL}/api/v1/admin/merch`,
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export interface SportsMerchOrder {
    _id: string;
    name: string;
    email: string;
    phone: string;
    hostelName: string;
    academicYear: string;
    transactionId: string;
    merchName: string;
    merchNumber: number;
    verified: boolean;
    emailSent: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface FestMerchOrder {
    _id: string;
    name: string;
    email: string;
    phone: string;
    hostelName: string;
    academicYear: string;
    transactionId: string;
    verified: boolean;
    emailSent: boolean;
    createdAt: string;
    updatedAt: string;
}

export const fetchSportsMerchOrders = async (filters: { verified?: string; academicYear?: string; hostelName?: string } = {}) => {
    const params = new URLSearchParams();
    if (filters.verified) params.append("verified", filters.verified);
    if (filters.academicYear) params.append("academicYear", filters.academicYear);
    if (filters.hostelName) params.append("hostelName", filters.hostelName);

    const response = await axiosInstance.get(`/sports?${params.toString()}`);
    return response.data;
};

export const fetchFestMerchOrders = async (filters: { verified?: string; academicYear?: string; hostelName?: string } = {}) => {
    const params = new URLSearchParams();
    if (filters.verified) params.append("verified", filters.verified);
    if (filters.academicYear) params.append("academicYear", filters.academicYear);
    if (filters.hostelName) params.append("hostelName", filters.hostelName);

    const response = await axiosInstance.get(`/fest?${params.toString()}`);
    return response.data;
};

export const verifyMerchOrder = async (type: "sports" | "fest", id: string, verified: boolean) => {
    const response = await axiosInstance.patch(`/verify/${type}/${id}`, { verified });
    return response.data;
};

export const sendConfirmationMails = async () => {
    const response = await axiosInstance.post(`/send-confirmation-mails`);
    return response.data;
};

export const getExportExcelUrl = (type: "sports" | "fest") => {
    return `${BACKEND_URL}/api/v1/admin/merch/export/excel/${type}`;
};

export const getExportPDFUrl = (type: "sports" | "fest") => {
    return `${BACKEND_URL}/api/v1/admin/merch/export/pdf/${type}`;
};
