import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarroModeloPost } from '../model/CarroModelo';
import { CarroModeloPut } from '../model/CarroModeloPut'

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(
    private http: HttpClient
  ) { }

  getCarros(){
    return this.http.get<any>(`${environment.api}/carros`);
  }

  getCarro(id: number): Observable<any>{
    return this.http.get<any>(`${environment.api}/carros/id/${id}`);
  }

  cadastrarCarro(carro: CarroModeloPost, header: HttpHeaders){
    return this.http.post<any>(`${environment.api}/carros/id`, carro, {'headers': header});
  }

  atualizarCarro(id: number, carro: CarroModeloPut, header: HttpHeaders){
    return this.http.put<any>(`${environment.api}/carros/id/${id}`, carro, {'headers': header})
  }
}
