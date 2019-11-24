export class User {
  uid: number;
  email: string;
  password: string;
  fullName: string;
  lastName: string;
  firstName: string;
  userName: string;
  companyName: string;
  occupation: string;
  about: string;
  deleted_at: string;
  updated_at: string;
  created_at: string;
  phoneNumber: string;
  photoUrl?: string;
  providerName?: string;
  providerId?: string;
  address?: {
    street?: string,
    city?: string,
    country?: string
    postCode?: string
  };
  socialLinks?: {
    twitter?: string,
    facebook?: string,
    linkedin?: string,
    instagram?: string
    youtube?: string
  };
  roles?: string[];

  public constructor(init?: Partial<User>) {

    this.address = {},
    this.socialLinks = {},
    this.init(init);

  }


  init(user?: Partial<User>) {
    if (user) {
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
  }
}
