import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(){

    }
    // intercept obrigatório devido ao uso da interface HttpInterceptor
    public intercept(req: HttpRequest<any>, next: HttpHandler){
        console.log(req)
        return next.handle(req);
    }
}