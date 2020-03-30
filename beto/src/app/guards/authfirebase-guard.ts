import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';
import { FirestoreService } from '../services/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthfirebaseGuard implements CanActivate {

  constructor(
    private router: Router,
    private fs: FirestoreService
  ) { }

  public canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot): Observable<boolean>{
    return this.fs.isAuthenticated()
      .pipe(
        tap((bool) => {
          if(!bool) this.router.navigateByUrl('/auth/login');
        })
      )
  }
}
