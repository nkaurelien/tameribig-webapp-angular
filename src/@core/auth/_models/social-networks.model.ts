
export class SocialNetworks {
    linkedIn: string;
	facebook: string;
	twitter: string;
    instagram: string;
    youtube: string

    public constructor(init?: Partial<SocialNetworks>) {

        this.init(init);

    }


    init(data?: Partial<SocialNetworks>) {

        Object.assign(this, data);

    }

    clear() {
        this.linkedIn = '';
        this.facebook = '';
        this.twitter = '';
        this.instagram = '';
        this.youtube = '';
    }
}
