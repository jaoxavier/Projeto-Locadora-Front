import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
}
