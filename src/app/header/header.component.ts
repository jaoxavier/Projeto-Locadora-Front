import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  id: string | null;

  account = {
    id: '',
    nomeUsuario: '',
    admin: false
  }


  logado: Boolean;

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    if(this.accountService.isUserLoggedIn()){
      this.logado = this.accountService.isUserLoggedIn();
      this.id = window.localStorage.getItem('id');

      if(this.id != null){
        this.account.id = this.id;
      }

      this.accountService.getUsuarioAccount(this.account.id).subscribe(
        data => {
          this.account.nomeUsuario = data.nomeUsuario;
        }
      )

      this.accountService.getClienteIdUsuario(parseInt(this.account.id)).subscribe(
        data=>{
          this.account.admin = data.admin;
      })
    }
  }
}
