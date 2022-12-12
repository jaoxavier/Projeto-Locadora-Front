import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Carro } from '../model/Carro';
import { CarService } from '../services/car.service';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-disponiveis',
  templateUrl: './disponiveis.component.html',
  styleUrls: ['./disponiveis.component.css']
})
export class DisponiveisComponent implements OnInit {

  header = new HttpHeaders()
  .set("Authorization", `Bearer ${this.accountService.getAuthorizationToken()}`);

  carros: Carro[];

  constructor(
    private carService: CarService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.getCarrosDisponiveis();
  }

  getCarrosDisponiveis(){
    this.carService.getCarrosDisponiveis(this.header).subscribe(
      data => {
        this.carros = data
      }
    )
  }

}
