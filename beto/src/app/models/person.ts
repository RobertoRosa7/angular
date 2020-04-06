export interface Person {
    name:string | number;
    age:number | string;
    address:number | string;
    city:string | number;
    country:string | number;
    id?:string;
}
export interface PersonFirestore {
    name?:string | number;
    age?:number | string;
    email?:string;
    city?:string | number;
    country?:string | number;
    id?:string;
}