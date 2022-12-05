import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/account.service';
import { AddressService } from 'src/app/shared/address.service';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.css']
})
export class NewAddressComponent implements OnInit {

  header = new HttpHeaders()
    .set('Authorization', `Bearer ${this.accountService.getAuthorizationToken()}`)
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Credentials', 'true');

  address = {
    login: '',
    cep: '',
    rua: '',
    numero: '',
    cidade: '',
    bairro: '',
    estado: ''
  }

  constructor(
    private accountService: AccountService,
    private addressService: AddressService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    try {
      const result = this.addressService.postAddress(this.address, this.header).subscribe(
        data => console.log(data)
      )
      this.router.navigate(['/addresses']);
    } catch (error) {
      console.error(error);
    }
  }

  buscaCep(){
    const id = window.localStorage.getItem('id');
    if(id != null){
      this.accountService.getLoginById(id, this.header).subscribe(
        data => this.address.login = data.login
      )
    }

    this.accountService.getCep(this.address.cep).subscribe(
      data => {
        this.address.cep = data.cep
        this.address.bairro = data.bairro;
        this.address.cidade = data.localidade;
        this.address.numero = data.numero;
        this.address.rua = data.logradouro;
        this.address.estado = data.uf;                     
      }
    )
  }

}
