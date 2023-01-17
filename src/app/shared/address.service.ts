import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  header = new HttpHeaders()
    .set('Authorization', `Bearer ${this.accountService.getAuthorizationToken()}`)

  constructor(
    private http: HttpClient,
    private accountService: AccountService
    ) { }

    getAddress(id: string): Observable<any>{
      const result = this.http.get<any>(`${environment.api}/address/id/${id}`, {'headers': this.header})
      return result;
    }

    patchAddress(address: any): Observable<any>{
      const id = window.localStorage.getItem('id');
      const result = this.http.patch<any>(`${environment.api}/usuarios/id/${id}`, address, {'headers': this.header})
      return result;
    }

    deleteAddress(id: String){
      const result = this.http.delete<any>(`${environment.api}/address/${id}`, {'headers': this.header});
      return result
    }
}
