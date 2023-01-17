import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  carroSelecionado: Carro = {
    id: 0,
    modelo: '',
    placa: '',
    imageUrl: '',
    valorDiaria: 0,
    categoria: '',
    disponivel: true
  }

  carroForm: FormGroup

  constructor(
    private accountService: AccountService,
    private carService: CarService,
    private routerService: Router,
    private fb: FormBuilder) {
      this.carroForm = this.fb.group({
        modelo: new FormControl(this.carroSelecionado.modelo),
        placa: new FormControl(this.carroSelecionado.placa),
        valorDiaria: new FormControl(this.carroSelecionado.valorDiaria),
        imageUrl: new FormControl(this.carroSelecionado.imageUrl),
        categoria: new FormControl(this.carroSelecionado.categoria),
        disponivel: new FormControl(this.carroSelecionado.disponivel)
      })
    }

    id = window.localStorage.getItem('id')
    admin = false

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
    this.carService.getCarros().subscribe(
      data=>{
        this.carros = data
      }
    )
  }

  onSubmit(){
    this.carService.atualizarCarro(this.carroSelecionado.id, this.carroSelecionado).subscribe(
      data=>{
        console.log(data)
        this.carroForm.reset();
        this.routerService.navigate(['carros'])
      }
    )
  }
}
