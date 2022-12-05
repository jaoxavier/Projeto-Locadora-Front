import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Carro } from 'src/app/model/Carro';
import { AccountService } from 'src/app/shared/account.service';
import { AddressService } from 'src/app/shared/address.service';
import { PedidoService } from 'src/app/shared/pedido.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  address = {
    bairro: '',
    cidade: '',
    rua: '',
    estado: '',
    cep: '',
    numero: '',
    login: ''
  }
  account = {
    nome: '',
    cpf: '',
    cnh: '',
    login: '',
    address: this.address
  }
  pedido = {
    carro: '',
    diasLocacao: '',
    valorTotal: '',
    status: ''
  }

  constructor(private addressService: AddressService, private accountService: AccountService, private pedidosService: PedidoService) {
  }

  private id = window.localStorage.getItem('id')

  header = new HttpHeaders()
    .set('Authorization', `Bearer ${this.accountService.getAuthorizationToken()}`)

  ngOnInit(): void {
    if(this.id!=null && this.accountService.isUserLoggedIn()){
      this.accountService.getUsuarioAccount(this.id, this.header)
      .subscribe(data=>{
        console.log(data);
        this.account.cnh = data.cnh
        this.account.cpf = data.cpf
        this.account.login = data.email
        this.account.nome = data.nomeUsuario
      })

      this.addressService.getAddress(this.id, this.header)
      .subscribe(
        data => {
          this.address = data[0]
          console.log(this.address);
        })

      this.pedidosService.getPedidosUsuario(this.id)
      .subscribe(data=>{
        console.log(data)
        this.pedido.carro = data[0].carro.modelo
        this.pedido.diasLocacao = data[0].diasLocacao
        this.pedido.valorTotal = data[0].valorTotal
        this.pedido.status = data[0].status
      })
    }
  }
}
