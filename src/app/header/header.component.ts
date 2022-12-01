import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  header = new HttpHeaders()
    .set('Authorization', `Bearer ${this.accountService.getAuthorizationToken()}`)
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Credentials', 'true');

  account = {
    id: 0,
    nomeUsuario: '',
    idCarro: ''
  }

  loginSTR: string | null = '';
  logado: Boolean =  this.accountService.isUserLoggedIn();

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    if(this.accountService.isUserLoggedIn()){
      this.loginSTR = window.localStorage.getItem('login');
    }
    if(this.loginSTR != null){
      this.accountService.getUsuarioInfo(this.loginSTR, this.header).subscribe(
        data => {
          this.account.id = data.id;
          this.account.nomeUsuario = data.nome;
          this.account.idCarro = data.idCarro;
        }
      )
    }
  }
}