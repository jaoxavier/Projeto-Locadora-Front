import { Component, createPlatform, EventEmitter, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/account.service';
import { Address } from 'src/app/model/Address';
import { Account, AccountBuilder } from 'src/app/model/Account';

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

  nome = new FormControl('', [Validators.required]);
  cpf = new FormControl('', [Validators.required]);
  cnh = new FormControl('', [Validators.required]);
  login = new FormControl('', [Validators.email, Validators.required]);
  senha = new FormControl('', [Validators.required]);

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}

  onSubmit(){
    let ab = new AccountBuilder();

    let account = ab.info()
      .nome(this.nome.value != null ? this.nome.value : '')
      .cpf(this.cpf.value != null ? this.cpf.value : '')
      .cnh(this.cnh.value != null ? this.cnh.value : '')
      .login(this.login.value != null ? this.login.value : '')
      .senha(this.senha.value != null ? this.senha.value : '')
      .address(this.address)
    .build();
    
    try {
      this.accountService.createAccount(account).subscribe(
        data => {
          this.router.navigate(['login']);
      });
    } catch (error) {
      console.error(error);
    }
    this.senha.setValue('');
  }

  buscaCep(){
    this.accountService.getCep(this.address.cep).subscribe(
      data => {
        this.address.bairro = data.bairro;
        this.address.cidade = data.localidade;
        this.address.rua = data.logradouro;
        this.address.estado = data.uf;
        this.address.cep = data.cep;
        this.address.login = this.login.value!
      }
    )
  }

}
