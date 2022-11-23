import { Component, OnInit } from '@angular/core';
import { GetConfigService } from '../get-config.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Carro } from '../model/Carro';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  carro?: Carro[];

  constructor(
    private getService: GetConfigService
  ) { }

  ngOnInit(): void {
    this.getCarros();
  }

  public getCarrosDisponiveis(){
    this.getService.getCarrosDisponiveis().subscribe(
      data => this.carro = data
      );
  }

  public getCarros(){
    this.getService.getCarros().subscribe(
      data => this.carro = data
      );
  }
}
