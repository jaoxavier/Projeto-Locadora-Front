import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Carro } from './model/Carro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetConfigService {

  url = "http://localhost:8080/api/"

  httpOptions = {
    headers: new HttpHeaders({
        'Content-type' : 'application/json',
        'Access-Control-Allow-Origin' : 'http://localhost:4200',
        'CrossOrigin' : '*'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  getCarros() : Observable<Carro[]>{
    return this.http.get<Carro[]>(this.url+"carros");
  }
  getCarrosDisponiveis() : Observable<Carro[]>{
    return this.http.get<Carro[]>(this.url+"carros/disponiveis");
  }
}
