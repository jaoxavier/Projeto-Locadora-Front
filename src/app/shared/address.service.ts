import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private http: HttpClient
    ) { }

    getAddress(id: string, header: HttpHeaders): Observable<any>{
      const result = this.http.get<any>(`${environment.api}/address/id/${id}`, {'headers': header})
      return result;
    }

    patchAddress(address: any, header: HttpHeaders): Observable<any> {
      const id = window.localStorage.getItem('id');
      const result = this.http.patch<any>(`${environment.api}/usuarios/id/${id}`, address, {'headers': header})
      return result;
    }

    deleteAddress(id: String, header: HttpHeaders){
      const result = this.http.delete<any>(`${environment.api}/address/${id}`, {'headers': header});
      return result
    }
}
