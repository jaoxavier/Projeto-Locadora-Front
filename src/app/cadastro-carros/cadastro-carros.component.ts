import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { throwIfEmpty } from 'rxjs';
import { Carro } from '../model/Carro';
import { CarService } from '../services/car.service';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-cadastro-carros',
  templateUrl: './cadastro-carros.component.html',
  styleUrls: ['./cadastro-carros.component.css']
})
export class CadastroCarrosComponent implements OnInit {

  constructor(
    @Inject (MAT_DIALOG_DATA) public data: any,
    private accountService: AccountService,
    private carService: CarService,
    private routerService: Router) 
    { 
      console.log(data)
    }

  id = window.localStorage.getItem('id')
  admin = false

  carro = {
    modelo:'',
    placa:'',
    categoria:'',
    imageUrl: '',
    valorDiaria: 0
  }

  carros: Carro[]

  ngOnInit(): void {
    
    if(this.id!=null && this.accountService.isUserLoggedIn()){
      this.accountService.getClienteIdUsuario(parseInt(this.id)).subscribe(
        data=>{
          this.admin = data.admin
          if(!this.admin){
            this.routerService.navigate(['carros'])
          }
        })
    }
  }

  onSubmit(){
    this.carService.cadastrarCarro(this.carro).subscribe(
      data=>{
        console.log(data)
        this.routerService.navigate(['carros'])
      })
    console.log(this.carro)
    this.carro = {
      modelo:'',
      placa:'',
      categoria:'',
      imageUrl: '',
      valorDiaria: 0
    }
  }
}
