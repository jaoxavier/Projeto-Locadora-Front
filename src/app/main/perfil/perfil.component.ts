import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AccountPut } from 'src/app/model/AccountPut';
import { Address } from 'src/app/model/Address';
import { AccountService } from 'src/app/shared/account.service';
import { AddressService } from 'src/app/shared/address.service';
import { PedidoService } from 'src/app/shared/pedido.service';
import { AtualizarClienteDialogComponent } from './dialog/atualizar-cliente-dialog/atualizar-cliente-dialog.component';
import { AtualizarEnderecoDialogComponent } from './dialog/atualizar-endereco-dialog/atualizar-endereco-dialog.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  address = {
    bairro: '',
    cidade: '',
    rua: '',
    estado: '',
    cep: '',
    numero: '',
    login: ''
  }
  usuario = {
    nomeUsuario: '',
    cpf: '',
    cnh: '',
    login: '',
    address: this.address
  }

  carro = {
    id: 0,
    modelo: '',
    placa: '',
    valorDiaria: '',
    categoria: '',
    disponivel: false
  }

  pedido = {
    id: 0,
    diasLocacao: 0,
    status: '',
    valorTotal: 0,
    usuario: this.usuario,
    carro: this.carro
  }

  private id = window.localStorage.getItem('id')

  atualizandoDados: boolean = false
  atualizandoEndereco: boolean = false
  perfilForm: FormGroup
  enderecoForm: FormGroup
  usuarioModificando: AccountPut
  enderecoModificando: Address

  constructor(
    private dialog: MatDialog,
    private addressService: AddressService,
    private accountService: AccountService,
    private pedidosService: PedidoService,
    private fb: FormBuilder) {
  }

  openAtualizarDados(usuario: any){
    this.dialog.open(AtualizarClienteDialogComponent, {
      data: {
        usuario: usuario
      }
    })
  }

  openAtualizarEndereco(){
    this.dialog.open(AtualizarEnderecoDialogComponent, {
      data: {
        address: this.address
      }
    })
  }

  onSubmitPerfil(){
    if(this.id != null){
      this.accountService.atualizarUsuario(parseInt(this.id), this.usuarioModificando).subscribe(
        data =>{
          console.log(data)
          this.atualizandoDados = false
          this.ngOnInit()
        }
      )
    }
  }

  onSubmitEndereco(){
    if(this.id != null){
      this.addressService.patchAddress(this.enderecoModificando).subscribe(
        data =>{
          console.log(data)
          this.atualizandoEndereco = false
          this.ngOnInit()
        }
      )
    }
  }

  buscaCep(){
    this.accountService.getCep(this.enderecoModificando.cep).subscribe(
      data => {
        this.enderecoModificando.bairro = data.bairro;
        this.enderecoModificando.cidade = data.localidade;
        this.enderecoModificando.rua = data.logradouro;
        this.enderecoModificando.estado = data.uf;
        this.enderecoModificando.cep = data.cep;
        this.enderecoModificando.login = this.usuario.login;
      }
    )
  }

  ngOnInit(): void {
    if(this.id!=null && this.accountService.isUserLoggedIn()){
      this.accountService.getUsuarioAccount(this.id).subscribe(
        data=>{
          this.usuario = data
          this.usuario.login = data.email
          console.log(this.usuario)
          this.enderecoModificando = {
            login: '',
            cep: '',
            bairro: '',
            cidade: '',
            numero: '',
            rua: '',
            estado: ''
          }
          this.usuarioModificando = {
            id: 0,
            nome: '',
            cpf: '',
            cnh: '',
            login: '',
            senha: '',
            admin: false
          }
        })

        this.addressService.getAddress(this.id)
      .subscribe(
        data => {
          this.address = data[0]
          console.log(data)
        })

      this.pedidosService.getPedido(this.id).subscribe(
        data => {
          if(data.length != 0){
            this.carro = data[data.length-1].carro
            this.pedido = data[data.length-1];
          }
        })

    } else {
      console.log("Erro, id nulo")
    }
  }
}
