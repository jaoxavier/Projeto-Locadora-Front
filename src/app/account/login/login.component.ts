import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = {
    login: '',
    senha: ''
  }

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async onSubmit(){
    try {
      const result = await this.accountService.login(this.login);
      console.log(`Login efetuado: ${result}`);
      this.router.navigate([''])
    } catch (error) {
      console.error(error)
    }
  }

}
