import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddressService } from 'src/app/shared/address.service';

@Component({
  selector: 'app-atualizar-endereco-dialog',
  templateUrl: './atualizar-endereco-dialog.component.html',
  styleUrls: ['./atualizar-endereco-dialog.component.css']
})
export class AtualizarEnderecoDialogComponent implements OnInit {

  novoEndereco = {
    cep: '',
    bairro: '',
    cidade: '',
    numero: '',
    rua: '',
    estado: '',
    login: '' as string | null
  }

  constructor(
    private http: HttpClient,
    private addressService: AddressService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
  }

  buscaCep(){
    this.http.get<any>(`https://viacep.com.br/ws/${this.novoEndereco.cep}/json`).subscribe(
      data => {
        this.novoEndereco.login = window.localStorage.getItem('login')
        this.novoEndereco.bairro = data.bairro;
        this.novoEndereco.cidade = data.localidade;
        this.novoEndereco.rua = data.logradouro;
        this.novoEndereco.estado = data.uf;
      }
    )
  }

  onSubmit(){
    this.addressService.patchAddress(this.novoEndereco).subscribe(
      data => {
        this.dialog.closeAll();
        window.location.reload();
      }
    )
  }

}
