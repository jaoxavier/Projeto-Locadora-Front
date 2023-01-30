import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/model/Login';
import { AccountService } from 'src/app/shared/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = new FormControl('', [Validators.required]);
  senha = new FormControl('', [Validators.required])

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    
    let login = new Login(
      this.login!.value || '',
      this.senha!.value || ''
    )

    try {
      this.accountService.login(login).subscribe(
        data => {
          this.router.navigate(['home']);
      })
    } catch (error) {
      console.error(error)
    }
  }
}
