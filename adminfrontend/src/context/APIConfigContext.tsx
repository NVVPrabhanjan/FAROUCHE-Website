"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const PROD_BACKEND_URL = "https://farouche.in";
const PROD_GALLERY_URL = "https://farouche.in";
const PROD_EMAIL_URL = "https://farouche.in";
const LOCAL_BACKEND_URL = "http://localhost:4000";
const LOCAL_GALLERY_URL = "http://localhost:4001";
const LOCAL_EMAIL_URL = "http://localhost:5001";

// Automatically switch based on environment
const isLocal = process.env.NODE_ENV === "development";

export const BACKEND_URL = isLocal ? LOCAL_BACKEND_URL : PROD_BACKEND_URL;
export const GALLERY_URL = isLocal ? LOCAL_GALLERY_URL : PROD_GALLERY_URL;
export const EMAIL_URL = isLocal ? LOCAL_EMAIL_URL : PROD_EMAIL_URL;

interface APIConfig {
  BACKEND_URL: string;
  ADMIN_API_END_POINT: string;
  EVENT_API_END_POINT: string;
  RESULTS_END_POINT: string;
  GALLERY_API_END_POINT: string;
  GALLERY_ADD_END_POINT: string;
  EMAIL_URL: string;
  EMAIL_API_END_POINT: string;
}

function buildConfig(backendUrl: string, galleryUrl: string, emailUrl: string): APIConfig {
  return {
    BACKEND_URL: backendUrl,
    ADMIN_API_END_POINT: `${backendUrl}/api/v1/admin`,
    EVENT_API_END_POINT: `${backendUrl}/api/v1/event`,
    RESULTS_END_POINT: `${backendUrl}/api/v1/results`,
    GALLERY_API_END_POINT: `${galleryUrl}/api/v1/gallery`,
    GALLERY_ADD_END_POINT: `${galleryUrl}/api/v1/gallery/add`,
    EMAIL_URL: emailUrl,
    EMAIL_API_END_POINT: `${emailUrl}/api`,
  };
}

const defaultConfig = buildConfig(BACKEND_URL, GALLERY_URL, EMAIL_URL);

const APIConfigContext = createContext<APIConfig>(defaultConfig);

export function APIConfigProvider({ children }: { children: ReactNode }) {
  const [config] = useState<APIConfig>(defaultConfig);

  return (
    <APIConfigContext.Provider value={config}>
      {children}
    </APIConfigContext.Provider>
  );
}

export function useAPIConfig() {
  return useContext(APIConfigContext);
}
