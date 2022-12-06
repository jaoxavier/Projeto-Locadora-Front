import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwIfEmpty } from 'rxjs';
import { CarService } from '../services/car.service';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-cadastro-carros',
  templateUrl: './cadastro-carros.component.html',
  styleUrls: ['./cadastro-carros.component.css']
})
export class CadastroCarrosComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private carService: CarService,
    private routerService: Router) { }

  id = window.localStorage.getItem('id')
  header = new HttpHeaders()
    .set('Authorization', `Bearer ${this.accountService.getAuthorizationToken()}`)
  admin = false

  carro = {
    modelo:'',
    placa:'',
    categoria:'',
    valorDiaria: 0
  }

  ngOnInit(): void {
    if(this.id!=null && this.accountService.isUserLoggedIn()){
      this.accountService.getClienteIdUsuario(this.id, this.header).subscribe(
        data=>{
          this.admin = data.admin
        })
    }

  }

  onSubmit(){
    this.carService.cadastrarCarro(this.carro, this.header).subscribe(
      data=>{
        console.log(data)
        this.routerService.navigate(['carros'])
      })
    console.log(this.carro)
    this.carro = {
      modelo:'',
      placa:'',
      categoria:'',
      valorDiaria: 0
    }
  }
}
