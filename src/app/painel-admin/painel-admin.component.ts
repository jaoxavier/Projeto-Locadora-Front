import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CadastroCarrosComponent } from '../cadastro-carros/cadastro-carros.component';

@Component({
  selector: 'app-painel-admin',
  templateUrl: './painel-admin.component.html',
  styleUrls: ['./painel-admin.component.css']
})
export class PainelAdminComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  OpenDialogCadastrarCarros(){
    this.dialog.open(CadastroCarrosComponent)
  }

}
