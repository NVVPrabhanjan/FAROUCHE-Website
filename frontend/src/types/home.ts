export interface ImageData {
    src: string;
    caption: string;
    role?: string;
}

export interface Committee {
    name: string;
    students: number;
    images: ImageData[];
    featured?: boolean;
    description?: string;
    achievements?: string[];
    social?: { platform: string; url: string }[];
}

export interface Leader {
    name: string;
    role: string;
    image: string;
    description?: string;
    contact?: string;
    achievements?: string[];
}

export interface HostelGroup {
    title: string;
    members: Leader[];
    description?: string;
}
