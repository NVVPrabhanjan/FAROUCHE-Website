"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const PROD_BACKEND_URL = "https://your-production-backend.com";
const PROD_GALLERY_URL = "https://your-production-gallery.com";
const LOCAL_BACKEND_URL = "http://localhost:4000";
const LOCAL_GALLERY_URL = "http://localhost:4001";

interface APIConfig {
  RESULTS_END_POINT: string;
  EVENT_API_END_POINT: string;
  REGISTRATION_API_END_POINT: string;
  GALLERY_API_END_POINT: string;
  GALLERY_ADD_END_POINT: string;
}

function buildConfig(backendUrl: string, galleryUrl: string): APIConfig {
  return {
    RESULTS_END_POINT: `${backendUrl}/api/v1/results`,
    EVENT_API_END_POINT: `${backendUrl}/api/v1/event`,
    REGISTRATION_API_END_POINT: `${backendUrl}/api/v1/registration`,
    GALLERY_API_END_POINT: `${galleryUrl}/api/v1/gallery`,
    GALLERY_ADD_END_POINT: `${galleryUrl}/api/v1/gallery/add`,
  };
}

const defaultConfig = buildConfig(PROD_BACKEND_URL, PROD_GALLERY_URL);

const APIConfigContext = createContext<APIConfig>(defaultConfig);

export function APIConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<APIConfig>(defaultConfig);

  useEffect(() => {
    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (isLocal) {
      setConfig(buildConfig(LOCAL_BACKEND_URL, LOCAL_GALLERY_URL));
    }
  }, []);

  return (
    <APIConfigContext.Provider value={config}>
      {children}
    </APIConfigContext.Provider>
  );
}

export function useAPIConfig() {
  return useContext(APIConfigContext);
}
