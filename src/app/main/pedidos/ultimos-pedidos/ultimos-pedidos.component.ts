import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/account.service';
import { PedidoService } from 'src/app/shared/pedido.service';

@Component({
  selector: 'app-ultimos-pedidos',
  templateUrl: './ultimos-pedidos.component.html',
  styleUrls: ['./ultimos-pedidos.component.css']
})
export class UltimosPedidosComponent implements OnInit {

  header = new HttpHeaders()
    .set('Authorization', `Bearer ${this.accountService.getAuthorizationToken()}`)

  pedidos: any[] = [];

  constructor(
    private accountService: AccountService,
    private pedidoService: PedidoService
  ){}

  ngOnInit(): void {
    const id = window.localStorage.getItem('id');

    if(id!=null){
      this.pedidoService.getPedido(id).subscribe(
        data => {
          this.pedidos = data
          console.log(this.pedidos)
        }
      )
    }
  }

}
