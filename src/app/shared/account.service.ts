import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable, take } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  acess_token?: string;

  account = {
    login: ''
  }

  constructor(
    private http: HttpClient
  ) { }
  
  login(user: any){
    const result = this.http.post<any>(`${environment.api}/clientes/auth`, user).subscribe(
      data => {        
        this.acess_token = data.token;
        this.account.login = data.login;

        if (result && this.acess_token!=undefined){
          window.localStorage.setItem('token', this.acess_token);
          window.localStorage.setItem('login', this.account.login)
          return true;
        }
        return false;
      }     
    )    
  }

  createAccount(account: any){
    const result = this.http.post<any>(`${environment.api}/clientes`, account);
    return result;
  }

  getUsuarioInfo(login: string, header: HttpHeaders): Observable<any>{
    return this.http.get<any>(`${environment.api}/usuarios/nome/${login}`,{'headers': header})
  }

  getAuthorizationToken(){
    const token = window.localStorage.getItem('token');
    return token;
  }

  getTokenExpirationDate(token: string): Date | null{
    const decoded: any = jwt_decode(token);

    if(decoded.exp === undefined){
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token: string): Boolean{
    if(!token){
      return true;
    }

    const date = this.getTokenExpirationDate(token);

    if(date === undefined){
      return false;
    }

    return !(date!.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn(): Boolean{
    const token = this.getAuthorizationToken();
    if(!token){
      return false;
    }else if (this.isTokenExpired(token)){
      return false;
    }

    return true;
  }
}
