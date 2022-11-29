import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/shared/account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  account = {
    login: '',
    senha: '',
  }

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    try {
      const result = this.accountService.createAccount(this.account).subscribe(
        data => console.log(data)
      )
      console.log(result);
    } catch (error) {
      console.error(error);
    }
    this.account.login = '';
    this.account.senha = '';
  }

}
