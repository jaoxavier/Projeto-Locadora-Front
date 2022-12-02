import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  pedido = {
    usuario: 0,
    carro: 0,
    diasLocacao: 0
  }

  header = new HttpHeaders()
    .set('Authorization', `Bearer ${this.accountService.getAuthorizationToken()}`)

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) { }

  postPedido(idCarro: number, diasLocacao: number){
    
    const loginSTR = window.localStorage.getItem('login'); 
    if(loginSTR != null && this.accountService.isUserLoggedIn()){
      this.accountService.getUsuarioInfo(loginSTR, this.header).subscribe(
        data => {
          this.pedido.carro = idCarro;
          this.pedido.usuario = data.id
          this.pedido.diasLocacao = diasLocacao;
        }
      )
    }

    
    return this.http.post<any>(`${environment.api}/pedidos/id`, this.pedido, {'headers': this.header});
  }

}
