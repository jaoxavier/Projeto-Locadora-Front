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

  private idUsuario = window.localStorage.getItem('id')

  postPedido(idCarro: number, diasLocacao: number){
    if(this.idUsuario != null && this.accountService.isUserLoggedIn()){
      this.pedido.carro = idCarro;
      this.pedido.usuario = parseInt(this.idUsuario)
      this.pedido.diasLocacao = diasLocacao;
      this.http.post<any>(`${environment.api}/pedidos/id`, this.pedido, {'headers': this.header});
    }
  }

  getPedidosUsuario(login: String, header: HttpHeaders){
    return this.http.get<any>(`${environment.api}/pedidos/login/${login}`, {'headers': header})
  }
}
