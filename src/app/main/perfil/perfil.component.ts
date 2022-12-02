import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/Account';
import { Address } from 'src/app/model/Address';
import { AccountService } from 'src/app/shared/account.service';
import { AddressService } from 'src/app/shared/address.service';

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
    senha: '',
    address: this.address
  }

  private id = window.localStorage.getItem('id');

  header = new HttpHeaders()
    .set('Authorization', `Bearer ${this.accountService.getAuthorizationToken()}`)

  constructor(private addressService: AddressService, private accountService: AccountService) {
  }

  ngOnInit(): void {
    if(this.id != null){
      this.addressService.getAddress(this.id, this.header)
      .subscribe(data=>{
        this.address.bairro = data.bairro
        this.address.cep = data.cep
        this.address.cidade = data.cidade
        this.address.estado = data.estado
        this.address.numero = data.numero
        this.address.rua = data.rua
        this.address.login = data.login;
      })
      
      this.accountService.getUsuarioAccount(this.id, this.header)
      .subscribe(data=>{
        console.log(data);
        
        this.account.address = data.address
        this.account.cnh = data.cnh
        this.account.cpf = data.cpf
        this.account.login = data.email
        this.account.nome = data.nomeUsuario
      })
    }

  }

}