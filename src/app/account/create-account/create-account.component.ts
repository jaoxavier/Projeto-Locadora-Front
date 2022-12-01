import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/account.service';
import { Address } from 'src/app/model/Address';
import { Account } from 'src/app/model/Account';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  address: Address
  account: Account

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    try {
      const result = this.accountService.createAccount(this.account).subscribe(
        data => console.log(data)
      )
      console.log(result);
      this.router.navigate(['']);
    } catch (error) {
      console.error(error);
    }
    this.account.login = '';
    this.account.senha = '';
  }

  buscaCep(){
    this.accountService.getCep(this.address.cep).subscribe(
      data => {
        this.address.bairro = data.bairro;
        this.address.cidade = data.localidade;
        this.address.rua = data.logradouro;
        this.address.estado = data.uf;
      }
    )
  }

}
