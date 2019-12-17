

export class Address {
    street?: string;
    addressLine?: string;
    locality?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;


    public constructor(init?: Partial<Address>) {

        this.init(init);

    }


    init(data?: Partial<Address>) {

        Object.assign(this, data);

    }

    clear() {
        this.street = '';
        this.locality = '';
        this.country = '';
        this.addressLine = '';
        this.city = '';
        this.state = '';
        this.postalCode = '';
    }
}
