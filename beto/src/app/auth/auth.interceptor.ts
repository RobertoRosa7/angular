import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(
        private authService: AuthService
    ){ }

    // intercept obrigatório devido ao uso da interface HttpInterceptor
    public intercept(req: HttpRequest<any>, next: HttpHandler){
        if(this.authService.fetchToken()){
            const authreq = req.clone({
                setHeaders: {
                    Authorization: this.authService.fetchToken()
                }
            });
            return next.handle(authreq);
        }
        return next.handle(req);
    }
}