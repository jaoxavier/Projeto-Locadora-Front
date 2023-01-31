import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountBuilder } from 'src/app/model/Account';
import { AccountService } from 'src/app/shared/account.service';

@Component({
  selector: 'app-atualizar-cliente-dialog',
  templateUrl: './atualizar-cliente-dialog.component.html',
  styleUrls: ['./atualizar-cliente-dialog.component.css']
})
export class AtualizarClienteDialogComponent implements OnInit {

  accountForm = new FormGroup({
    nome: new FormControl(''),
    cpf: new FormControl(''),
    cnh: new FormControl(''),
    login: new FormControl(''),
    senha: new FormControl('', [Validators.required])
  })


  usuario: any;

  constructor(
    @Inject (MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private accountService: AccountService
  ){
    this.usuario = data.usuario
  }

  ngOnInit(): void {
    console.log("USER FROM DIALOG")
    console.log(this.usuario)
  }

  onSubmit(){
    let ab = new AccountBuilder();
    let account = ab.info()
      .nome(this.accountForm.get(['nome'])?.value != '' ? this.accountForm.get(['nome'])?.value : this.usuario.nomeUsuario)
      .cpf(this.accountForm.get(['cpf'])?.value != '' ? this.accountForm.get(['cpf'])?.value : this.usuario.cpf)
      .cnh(this.accountForm.get(['cnh'])?.value != '' ? this.accountForm.get(['cnh'])?.value : this.usuario.cnh)
      .login(this.accountForm.get(['login'])?.value != '' ? this.accountForm.get(['login'])?.value : this.usuario.login)
      .senha(this.accountForm.get(['senha'])?.value)
    .build();

    console.log(account);

    this.accountService.atualizarUsuario(this.usuario.id, account).subscribe(
      data => {
        console.log(data);
        window.location.reload()
        this.dialog.closeAll();
      }
    );
  }

}
