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

  id: string | null;

  addresses: any[] = [];

  constructor(
    private addressService: AddressService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
<<<<<<< HEAD

    const loginSTR = window.localStorage.getItem('login');

    if(loginSTR != null && this.accountService.isUserLoggedIn()){
      this.addressService.getAddress(loginSTR, this.header).subscribe(
        data => {
          this.addresses = data
          console.log(this.addresses);

        }
      )
=======
    this.id = window.localStorage.getItem('id');
    if(this.accountService.isUserLoggedIn() && this.id != null){
      this.accountService.getLoginById(this.id, this.header).subscribe(
        data => {
          if(this.id != null){
            this.addressService.getAddress(this.id, this.header)
            .subscribe(data => this.addresses = data)
          }
          this.address.login = data.login
        });
>>>>>>> 40191ead0cd8f2e8407df32bc2745da751a06628
    }
  }

  deleteAddress(id: String){
    this.addressService.deleteAddress(id, this.header).subscribe();
    window.location.reload()
  }

}
