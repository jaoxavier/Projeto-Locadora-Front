import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/account.service';
import { AddressService } from 'src/app/shared/address.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  header = new HttpHeaders()
    .set('Authorization', `Bearer ${this.accountService.getAuthorizationToken()}`)
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Credentials', 'true');

  address = {
    id: '',
    login: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: ''
  }

  addresses: any[] = [];

  constructor(
    private addressService: AddressService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    const id = window.localStorage.getItem('id');
    if(id != null && this.accountService.isUserLoggedIn()){
      this.addressService.getAddress(id, this.header).subscribe(
        data => {
          this.addresses = data
          console.log(this.addresses);
        }
      )
    }
  }

}
