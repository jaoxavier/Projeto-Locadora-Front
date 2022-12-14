import { Component, createPlatform, EventEmitter, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/account.service';
import { Address } from 'src/app/model/Address';
import { Account } from 'src/app/model/Account';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {



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
    admin: true,
    address: this.address
  }

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}

  onSubmit(){
    try {
      this.accountService.createAccount(this.account).subscribe(
        data => {
          console.log("Criando conta retorno: ", data)
          console.log("Criando conta: ", this.account)
          console.log("Conta criada com o endereço: ", this.address)
      })
      this.router.navigate(['login']);
    } catch (error) {
      console.error(error);
    }
    this.account.senha = '';
  }

  buscaCep(){
    this.accountService.getCep(this.address.cep).subscribe(
      data => {
        this.address.bairro = data.bairro;
        this.address.cidade = data.localidade;
        this.address.rua = data.logradouro;
        this.address.estado = data.uf;
        this.address.cep = data.cep;
        this.address.login = this.account.login;
      }
    )
  }

}
