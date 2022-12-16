import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    carro: 0,
    diasLocacao: 0,
    usuario: Number(window.localStorage.getItem('id'))
  }

  carro: any;
  total: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private accountService: AccountService,
    private pedidoService: PedidoService,
    private router: Router
  ){
    this.carro = data;
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.pedido.diasLocacao = Number(this.pedido.diasLocacao);
    this.pedido.carro = this.carro.id;
    console.log(this.pedido)
    this.pedidoService.postPedido(this.pedido.carro, this.pedido.diasLocacao).subscribe(
      data =>{
        this.dialog.closeAll();
        this.router.navigate(['/perfil']);
      })
  }

}
