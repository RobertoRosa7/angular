export interface User {
    firstname: string,
    lastname: string,
    address: string,
    city: string,
    state: string,
    phone: string,
    mobilephone: string,
    email: string,
    password: string,
    _id?: string,
}
export interface UserFirestore{
    firstname:  string,
    lastname: string,
    address: string,
    city: string,
    state: string,
    phone: string,
    mobilephone: string,
    email: string,
    password?: string,
    _id?: string,
}