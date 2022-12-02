import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  onSubmit(){
    try {
      this.accountService.login(this.login).subscribe(data=>{
        this.router.navigate(['home'])
        .then(()=>{
          console.log(`Login efetuado: ${data.login}`)
          window.location.reload();
        })
      })
    } catch (error) {
      console.error(error)
    }
  }
}
