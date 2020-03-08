import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(
        private authService: AuthService,
        private router: Router
    ){ }

    // intercept obrigatório devido ao uso da interface HttpInterceptor
    public intercept(req: HttpRequest<any>, next: HttpHandler){
        if(this.authService.fetchToken()){
            const authreq = req.clone({
                setHeaders: {
                    Authorization: this.authService.fetchToken()
                }
            });
            return next.handle(authreq)
                .pipe(
                    catchError((err) => {
                        if(err instanceof HttpErrorResponse){
                            if(err.status === 401){
                                this.authService.logout();
                                this.router.navigateByUrl('/auth/login');
                            }
                        }
                        return throwError(err);
                    })
                )
        }
        return next.handle(req);
    }
}