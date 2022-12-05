import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/account.service';
import { PedidoService } from 'src/app/shared/pedido.service';
import { CarrosListComponent } from '../carros-list.component';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  header = new HttpHeaders()
  .set('Authorization', `Bearer ${this.accountService.getAuthorizationToken()}`)

  pedido = {
    carro: Number(window.localStorage.getItem('idCarro')),
    diasLocacao: 0,
    usuario: Number(window.localStorage.getItem('id'))
  }

  constructor(
    private accountService: AccountService,
    private pedidoService: PedidoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(window.localStorage.getItem('idCarro') == null){
      this.router.navigate(['/carros'])
    }
  }

  onSubmit(){
    this.pedido.diasLocacao = Number(this.pedido.diasLocacao);
    console.log(this.pedido);
    this.pedidoService.postPedido(this.pedido.carro, this.pedido.diasLocacao).subscribe(
      data =>{
        window.localStorage.removeItem('idCarro');
        this.router.navigate(['/perfil']);
      })
  }

}