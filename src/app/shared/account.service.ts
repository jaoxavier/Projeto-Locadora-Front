import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  header = new HttpHeaders()
    .set('Authorization', `Bearer ${this.getAuthorizationToken()}`)

  acess_token?: string;
  result: number;

  account = {
    login: '',
    id: ''
  }

  constructor(
    private http: HttpClient
  ) { }

  login(user: any){
    const result = this.http.post<any>(`${environment.api}/clientes/auth`, user)
    result.subscribe(
      data => {
        this.acess_token = data.token;
        this.account.login = data.login;
        this.account.id = data.id;

        if (result && this.acess_token!=undefined){
          window.localStorage.setItem('login', this.account.login);
          window.localStorage.setItem('token', this.acess_token);
          window.localStorage.setItem('id', this.account.id);
        }
      }
    )
    return result
  }

  createAccount(account: any){
    const result = this.http.post<any>(`${environment.api}/clientes`, account);
    return result;
  }

  getUsuarioInfo(): Observable<any>{
    return this.http.get<any>(`${environment.api}/usuarios/login/${this.account.login}`,{'headers': this.header});
  }

  getUsuarioAccount(id: String, header: HttpHeaders): Observable<any>{
    return this.http.get<any>(`${environment.api}/usuarios/id/${id}`, {'headers' : header})
  }

  getLoginById(id: string, header: HttpHeaders): Observable<any>{
    return this.http.get<any>(`${environment.api}/usuarios/${id}`, {'headers': header})
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
    console.log("Usuario logado")
    return true;
  }

  getCep(cep: String){
    return this.http.get<any>("http://viacep.com.br/ws/" + cep + "/json");
  }
}
