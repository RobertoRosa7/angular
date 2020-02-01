import { DepartmentsModel } from './departments-model';

export interface Product {
    name: string,
    department: string,
    price: number,
    _id?: string
}
export interface ProductStore {
    name: string,
    department: DepartmentsModel[] | String[],
    price: number,
    stock: number,
    _id?: string
}