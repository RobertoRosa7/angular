import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductStore } from '../models/products.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly api: string = 'http://localhost:8080';
  public showComponent: string;
  private storeProduct$: BehaviorSubject<ProductStore[]> = new BehaviorSubject<ProductStore[]>(null);
  private loaded: boolean = false;

  constructor(private http: HttpClient) { }

  public getStoreProducts(): Observable<ProductStore[]>{
    if(!this.loaded){
      this.http.get<ProductStore[]>(`${this.api}/v1/products`)
        .pipe(tap((prods) => (prods) ? this.orderByName(prods): []))
        .subscribe(this.storeProduct$)
      this.loaded = true;
    }
    return this.storeProduct$.asObservable();
  }
  private orderByName(list: any[]){
    return list.sort((a, b) => {
      if(a.name > b.name) return 1;
      if(a.name < b.name) return -1;
      return 0;
    })
  }
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
