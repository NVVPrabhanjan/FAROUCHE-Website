const isLocal =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

const BACKEND_URL = isLocal ? "http://localhost:4000" : "https://your-production-backend.com";
const GALLERY_URL = isLocal ? "http://localhost:4001" : "https://your-production-gallery.com";

export const RESULTS_END_POINT          = `${BACKEND_URL}/api/v1/results`;
export const EVENT_API_END_POINT        = `${BACKEND_URL}/api/v1/event`;
export const REGISTRATION_API_END_POINT = `${BACKEND_URL}/api/v1/registration`;
export const GALLERY_API_END_POINT      = `${GALLERY_URL}/api/v1/gallery`;