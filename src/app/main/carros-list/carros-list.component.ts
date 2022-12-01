import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { Carro } from 'src/app/model/Carro';
import { AccountService } from 'src/app/shared/account.service';

@Component({
  selector: 'app-carros-list',
  templateUrl: './carros-list.component.html',
  styleUrls: ['./carros-list.component.css']
})
export class CarrosListComponent implements OnInit {

  carros: Carro[] = []

  header = new HttpHeaders()
    .set('Authorization', `Bearer ${this.accountService.getAuthorizationToken()}`)

  constructor(
    private accountService: AccountService,
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.getCarros()
  }

  getCarros(){
    this.carService.getCarros(this.header).subscribe(
      data => {
        this.carros = data
        console.log(data);
    })
  }

}
