import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AccountService } from '../shared/account.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private accountService: AccountService
    ){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.accountService.getAuthorizationToken();
        let request: HttpRequest<any> = req;

        if(token && this.accountService.isTokenExpired(token)){
            request = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
        }

        return next.handle(request)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse){
        if(error.error instanceof ErrorEvent){
            console.error("Ocorreu um erro", error.error.message)
        }else{
            console.error(
                `Código do erro ${error.status}, ` +
                `Erro: ${JSON.stringify(error.error)}`
            );
        }
        return throwError(() => error);
    }

}