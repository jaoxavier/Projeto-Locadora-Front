import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { Carro } from 'src/app/model/Carro';

@Component({
  selector: 'app-carros-list',
  templateUrl: './carros-list.component.html',
  styleUrls: ['./carros-list.component.css']
})
export class CarrosListComponent implements OnInit {

  carros: Carro[] = []

  constructor(
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.getCarros()
  }

  getCarros(){
    this.carService.getCarros().subscribe(
      data => {
        this.carros = data
        console.log(data);
    })
  }
}
