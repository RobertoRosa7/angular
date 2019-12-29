import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './products.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly api: string = 'http://localhost:8080';

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
}
