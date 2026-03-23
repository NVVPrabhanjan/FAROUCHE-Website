const isLocal =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

const BACKEND_URL = isLocal ? "http://localhost:4000" : "https://farouche.in";
const GALLERY_URL = isLocal ? "http://localhost:4001" : "https://farouche.in";
const EMAIL_SERVICE_URL = isLocal ? "http://localhost:5001" : "https://farouche.in";

export const RESULTS_END_POINT = `${BACKEND_URL}/api/v1/results`;
export const EVENT_API_END_POINT = `${BACKEND_URL}/api/v1/event`;
export const REGISTRATION_API_END_POINT = `${BACKEND_URL}/api/v1/registration`;
export const GALLERY_API_END_POINT = `${GALLERY_URL}/api/v1/gallery`;
export const GALLERY_ADD_END_POINT = `${GALLERY_URL}/api/v1/gallery/add`;
export const GALLERY_EVENTS_END_POINT = `${GALLERY_URL}/api/v1/gallery/events`;
export const EMAIL_API_END_POINT = `${EMAIL_SERVICE_URL}/api`;