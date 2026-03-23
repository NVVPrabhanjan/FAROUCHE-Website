"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const PROD_BACKEND_URL = "https://farouche.in";
const PROD_GALLERY_URL = "https://farouche.in";
const PROD_EMAIL_URL = "https://farouche.in";
const LOCAL_BACKEND_URL = "http://localhost:4000";
const LOCAL_GALLERY_URL = "http://localhost:4001";
const LOCAL_EMAIL_URL = "http://localhost:5001";

interface APIConfig {
  RESULTS_END_POINT: string;
  EVENT_API_END_POINT: string;
  REGISTRATION_API_END_POINT: string;
  GALLERY_API_END_POINT: string;
  GALLERY_ADD_END_POINT: string;
  MERCH_API_END_POINT: string;
  EMAIL_API_END_POINT: string;
}

function buildConfig(backendUrl: string, galleryUrl: string, emailUrl: string): APIConfig {
  return {
    RESULTS_END_POINT: `${backendUrl}/api/v1/results`,
    EVENT_API_END_POINT: `${backendUrl}/api/v1/event`,
    REGISTRATION_API_END_POINT: `${backendUrl}/api/v1/registration`,
    GALLERY_API_END_POINT: `${galleryUrl}/api/v1/gallery`,
    GALLERY_ADD_END_POINT: `${galleryUrl}/api/v1/gallery/add`,
    MERCH_API_END_POINT: `${backendUrl}/api/v1/merch`,
    EMAIL_API_END_POINT: `${emailUrl}/api`,
  };
}

// Automatically switch based on environment
const isLocal = process.env.NODE_ENV === "development";
const defaultConfig = isLocal
  ? buildConfig(LOCAL_BACKEND_URL, LOCAL_GALLERY_URL, LOCAL_EMAIL_URL)
  : buildConfig(PROD_BACKEND_URL, PROD_GALLERY_URL, PROD_EMAIL_URL);

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
