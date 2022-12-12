import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { CarService } from '../services/car.service';
import { AccountService } from '../shared/account.service';
import { Carro } from '../model/Carro';

@Component({
  selector: 'app-alugados',
  templateUrl: './alugados.component.html',
  styleUrls: ['./alugados.component.css']
})
export class AlugadosComponent implements OnInit {

  header = new HttpHeaders()
  .set("Authorization", `Bearer ${this.accountService.getAuthorizationToken()}`)

  carros: Carro[];

  constructor(
    private carService: CarService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.getCarrosLocados()
  }

  getCarrosLocados(){
    this.carService.getCarrosLocados(this.header).subscribe(
      data => {
        console.log(data);
        
        this.carros = data
      }
    )
  }

}
