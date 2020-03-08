import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  public canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot): Observable<boolean>{
    return this.authService.isAuthenticated()
      .pipe(
        tap((bool) => {
          if(!bool) this.router.navigateByUrl('/auth/login');
        })
      )
  }
}
