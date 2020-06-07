import {User} from "@core/auth";

export interface Author {
    fullname: string;
    displayName: string;
    email?: string;
    socialLinks?: {
        twitter?: string,
        facebook?: string,
        dribbble?: string,
        linkedin?: string,
        instagram?: string
        youtube?: string
    };
    avatar?: string;
    uid?: string;
}

export interface ImageSize {
    bytes: string;
    downloadUrl: string;
    downloadSecureUrl?: string;
}

export interface ImageBreakpoint {
    bytes?: number;
    height?: number;
    secure_url?: string;
    url?: string;
    width?: number;
}

export interface Image {
    _id: string;
    uid: string;
    picture: string;
    miniature: string;
    download: string;
    title: string;
    description: string;
    originalname: string;
    content: any;
    price: number;
    author: Partial<User>;
    authorId: string;
    userId: number;
    createdAt?: string;
    publishedAt?: string;
    updatedAt?: string;
    deletedAt?: string;
    upvote?: number;

    keywords?: string[];
    // tags?: string[];
    topics?: any[];
    comments?: any[];
    breakpoints?: ImageBreakpoint[];
    services: {
        cloudinary: object;
    };
    size?: {
        xs?: ImageSize,
        sm?: ImageSize,
        md?: ImageSize,
        lg?: ImageSize,
        xl?: ImageSize,

    };
}
