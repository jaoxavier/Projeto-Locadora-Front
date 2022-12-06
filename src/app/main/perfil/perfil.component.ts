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
  usuario = {
    nomeUsuario: '',
    cpf: '',
    cnh: '',
    login: '',
    address: this.address
  }

  carro = {
    id: 0,
    modelo: '',
    placa: '',
    valorDiaria: '',
    categoria: '',
    disponivel: false
  }

  pedido = {
    id: 0,
    diasLocacao: 0,
    status: '',
    valorTotal: 0,
    usuario: this.usuario,
    carro: this.carro
  }

  constructor(private addressService: AddressService, private accountService: AccountService, private pedidosService: PedidoService) {
  }

  private id = window.localStorage.getItem('id')

  header = new HttpHeaders()
    .set('Authorization', `Bearer ${this.accountService.getAuthorizationToken()}`)

  ngOnInit(): void {
    if(this.id!=null && this.accountService.isUserLoggedIn()){
      this.accountService.getUsuarioAccount(this.id, this.header).subscribe(
        data=>{
          this.usuario = data
          console.log(this.usuario)
        })

        this.addressService.getAddress(this.id, this.header)
      .subscribe(
        data => {
          this.address = data[0]
          console.log(data)
        })

      this.pedidosService.getPedido(this.id, this.header).subscribe(
        data => {
          this.carro = data[data.length-1].carro
          console.log(this.carro)
          this.pedido = data[data.length-1];
          console.log(this.pedido);
        })

    } else {
      console.log("Erro, id nulo")
    }
  }
}
