import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Person } from '../components/switch-merge/person.model';
import { Product } from '../models/products.model';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private readonly api: string = 'http://localhost:8080/api/v2/';
  private people$: BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>(null);
  private products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(null);

  constructor(
    private http: HttpClient
  ) { }

  public fetchPeople(): Observable<Person[]>{
    this.http.get<Person[]>(`${this.api}people`)
      .pipe(
        tap(p => console.log(p))
      )
      .subscribe(p => this.people$.next(p))
    return this.people$.asObservable();
  }
  public fetchProducts(): Observable<Product[]>{
    this.http.get<Product[]>(`${this.api}products`)
      .pipe(
        tap(p => console.log(p))
      )
      .subscribe(p => this.products$.next(p));
    return this.products$.asObservable();
  }
}
