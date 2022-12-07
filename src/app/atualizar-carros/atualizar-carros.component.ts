import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carro } from '../model/Carro';
import { CarService } from '../services/car.service';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-atualizar-carros',
  templateUrl: './atualizar-carros.component.html',
  styleUrls: ['./atualizar-carros.component.css']
})
export class AtualizarCarrosComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private carService: CarService,
    private routerService: Router) { }

  id = window.localStorage.getItem('id')

  header = new HttpHeaders()
  .set('Authorization', `Bearer ${this.accountService.getAuthorizationToken()}`)

  admin = false

  carros: Carro[]
  carroSelecionado: Carro

  ngOnInit(): void {
    if(this.id!=null && this.accountService.isUserLoggedIn()){
      this.accountService.getClienteIdUsuario(this.id, this.header).subscribe(
        data=>{
          this.admin = data.admin
          if(!this.admin){
            this.routerService.navigate(['carros'])
          }
        })
    }
    this.carService.getCarros().subscribe(
      data=>{
        this.carros = data
      }
    )
  }
  onChange(event: any){
    console.log(event)
    console.log(this.carroSelecionado)
  }
  onSubmit(){
    this.carService.atualizarCarro(this.carroSelecionado.id, this.carroSelecionado, this.header).subscribe(
      data=>{
        console.log(data)
      }
    )
  }

}
