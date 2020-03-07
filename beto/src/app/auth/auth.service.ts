import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly api: string = 'http://localhost:8080/api/v2/auth/';

  constructor(
    private http: HttpClient
  ) { }

  public register(user: User): Observable<User>{
    return this.http.post<User>(`${this.api}register`, user);
  }
}
