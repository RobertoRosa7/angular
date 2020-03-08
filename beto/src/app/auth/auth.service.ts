import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  // providedIn - automaticamente fornecido para módulo raiz
  providedIn: 'root'
})
export class AuthService {

  private readonly api: string = 'http://localhost:8080/api/v2/auth/';
  private user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private token$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient
  ) { }

  public register(user: User): Observable<User>{
    return this.http.post<User>(`${this.api}register`, user);
  }

  public login(credentials: {"email":string, "password":string}): Observable<User>{
    return this.http.post<User>(`${this.api}login`, credentials)
      .pipe(
        tap((u: any) => {
          localStorage.setItem('token', u.token);
          this.loggedIn$.next(true);
          this.user$.next(u);
        })
      )
  }
  public isAuthenticated(): Observable<boolean>{
    return this.loggedIn$.asObservable();
  }
  public fetchUser(): Observable<User>{
    return this.user$.asObservable();
  }
  public logout(){
    localStorage.removeItem('token');
    this.loggedIn$.next(false);
    this.user$.next(null);
  }
  public fetchToken(){
    return (localStorage.getItem('token')) ? localStorage.getItem('token') : null;
  }
}
