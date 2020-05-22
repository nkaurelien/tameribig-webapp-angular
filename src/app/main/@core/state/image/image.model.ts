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
    size: string;
    downloadUrl: string;
}

export interface Image {
    _id: string;
    uid: string;
    picture: string;
    miniature: string;
    title: string;
    description: string;
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
