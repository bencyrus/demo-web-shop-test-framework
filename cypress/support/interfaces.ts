export interface UserData {
    email: string
    password: string
}

export interface RegisterData {
    firstName: string
    lastName: string
    email: string
    password: string
}

export interface Address {
    id: number
    firstName: string
    lastName: string
    email: string
    company: string
    countryId: number
    stateProvinceId: number
    city: string
    address1: string
    address2: string
    zip: string
    phoneNumber: string
    faxNumber: string
}

export interface ProductData {
    productType: string
    productSubtype: string
    productName: string
}
