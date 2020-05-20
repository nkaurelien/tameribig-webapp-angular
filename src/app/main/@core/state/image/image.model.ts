export interface Author {
    fullname: string;
    displayName: string;
    email?: string;
    social?: string;
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
    author: Author;
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
