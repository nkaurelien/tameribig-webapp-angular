export class Address {
    street?: string;
    addressLine?: string;
    locality?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;

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
