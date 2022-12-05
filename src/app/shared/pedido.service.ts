import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  postPedido(pedido: any): Observable<any>{
    
    this.pedido.carro = pedido.carro;
    this.pedido.diasLocacao = pedido.diasLocacao;
    this.pedido.usuario = pedido.usuario;
    
    console.log(this.pedido); 

    return this.http.post<any>(`${environment.api}/pedidos/id`, this.pedido, {'headers': this.header});
  }

  getIdCarro(){
    
  }

}
