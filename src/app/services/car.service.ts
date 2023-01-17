import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarroModeloPost } from '../model/CarroModelo';
import { CarroModeloPut } from '../model/CarroModeloPut'
import { AccountService } from '../shared/account.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  header = new HttpHeaders()
    .set('Authorization', `Bearer ${this.accountService.getAuthorizationToken()}`)

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) { }

  getCarros(){
    return this.http.get<any>(`${environment.api}/carros`);
  }

  getCarro(id: number): Observable<any>{
    return this.http.get<any>(`${environment.api}/carros/id/${id}`);
  }

  getCarrosLocados(){
    return this.http.get<any>(`${environment.api}/carros/locados`, {'headers': this.header})
  }

  getCarrosDisponiveis(){
    return this.http.get<any>(`${environment.api}/carros/disponiveis`, {'headers': this.header})
  }

  cadastrarCarro(carro: CarroModeloPost){
    return this.http.post<any>(`${environment.api}/carros/id`, carro, {'headers': this.header});
  }

  atualizarCarro(id: number, carro: CarroModeloPut){
    return this.http.put<any>(`${environment.api}/carros/id/${id}`, carro, {'headers': this.header})
  }
}
