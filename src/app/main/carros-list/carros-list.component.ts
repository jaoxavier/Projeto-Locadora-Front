import { Component, OnInit, Output } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { Carro } from 'src/app/model/Carro';
import { MatDialog } from '@angular/material/dialog';
import { NewOrderComponent } from './new-order/new-order.component';

@Component({
  selector: 'app-carros-list',
  templateUrl: './carros-list.component.html',
  styleUrls: ['./carros-list.component.css']
})
export class CarrosListComponent implements OnInit {

  carros: Carro[] = []
  carro: Carro;

  constructor(
    private carService: CarService,
    private dialogRef: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCarros()
  }

  getCarros(){
    this.carService.getCarros().subscribe(
      data => {
        this.carros = data
    })
  }

  openDialog(idCarro: number){
    this.dialogRef.open(NewOrderComponent, {
      data : {
        id: idCarro,
        valorCarro: this.carros.find(i => i.id == idCarro)
      }
    })
  }
}
