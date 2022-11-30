import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  account = {
    login: ''
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
      this.account.login = this.loginSTR;
    }
  }
}