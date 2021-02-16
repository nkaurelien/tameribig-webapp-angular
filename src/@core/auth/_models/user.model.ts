import {BaseModel} from '../../_base/crud';
import {Address} from './address.model';
import {SocialNetworks} from './social-networks.model';

export class User extends BaseModel {
    _id: string;
    uid: string;
    avatar: string;
    username: string;
    password: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    pic: string;
    fullname: string;
    displayName: string;
    lastName: string;
    firstName: string;
    userName: string;
    occupation: string;
    about: string;
    companyName: string;
    phoneNumber: string;
    photoUrl?: string;
    providerName?: string;
    providerId?: string;
    address: Address;


    socialLinks: SocialNetworks;

    roles?: string[];

    public constructor(init?: Partial<User>) {
        super();

        this.address = new Address();
        this.socialLinks = new SocialNetworks();
        this.init(init);

    }


    init(user?: Partial<User>) {

        // const { uid, photoUrl, providerId, providerName, userName, adress, fullName, email, roles, phone, created_at, updated_at, deleted_at } = user;
        // this.uid = uid;
        // this.photoUrl = photoUrl;
        // this.providerId = providerId;
        // this.providerName = providerName;
        // this.fullName = fullName;
        // this.userName = userName;
        // this.email = email;
        // this.phone = phone;
        // this.updated_at = updated_at;
        // this.created_at = created_at;
        // this.roles = roles;
        // this.adress = adress;
        Object.assign(this, user);

    }

    clear(): void {
        this._id = undefined;
        this.username = '';
        this.password = '';
        this.email = '';
        this.roles = [];
        this.fullname = '';
        this.accessToken = 'access-token-' + Math.random();
        this.refreshToken = 'access-token-' + Math.random();
        this.pic = './assets/media/users/default.jpg';
        this.occupation = '';
        this.companyName = '';
        this.phoneNumber = '';
        this.address = new Address();
        // this.address.clear();
        this.socialLinks = new SocialNetworks();
        // this.socialLinks.clear();
    }
}
