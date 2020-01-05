import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/products.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly api: string = 'http://localhost:8080';
  public showComponent: string;
  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.api}/products`);
  }
  public getProductsError(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.api}/productserr`);
  }
  public getProductsDelay(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.api}/productsdelay`);
  }
  public getProductsIds(): Observable<string[]>{
    return this.http.get<string[]>(`${this.api}/products_ids`);
  }
  // public getProductName(id: string): Observable<string>{
  //   return this.http.get<string>(`${this.api}/name/${id}`).pipe(map(p => p.name));
  // } 
  
  // public getProductName(id: string): Observable<Product>{
  //   return this.http.get<Product>(`${this.api}/products/name/${id}`);
  // }
  public getProductName(id: string): Observable<string>{
    return this.http.get(`${this.api}/products/name/${id}`, {responseType: 'text'});
  }

  public saveProduct(p: Product): Observable<Product>{
    return this.http.post<Product>(`${this.api}/products`, p);
  }
  public deleteProduct(p: Product){
    return this.http.delete(`${this.api}/products/${p._id}`);
  }
  public editProduct(p: Product): Observable<Product>{
    return this.http.patch<Product>(`${this.api}/products/${p._id}`, p);
  }
}
