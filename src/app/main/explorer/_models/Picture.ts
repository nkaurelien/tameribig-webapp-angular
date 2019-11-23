
export interface IPicture {
    picture: string;
    miniature: string;
    decription: string;
    prix: number;
    auteur: string;
    uid: string;
    created_at?: string;
    upvote?: string;
    downvote?: string;
    comments?: Array<any>;
}
