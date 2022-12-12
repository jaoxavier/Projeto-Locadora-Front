import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AccountPut } from 'src/app/model/AccountPut';
import { Address } from 'src/app/model/Address';
import { AccountService } from 'src/app/shared/account.service';
import { AddressService } from 'src/app/shared/address.service';
import { PedidoService } from 'src/app/shared/pedido.service';

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
    private addressService: AddressService,
    private accountService: AccountService,
    private pedidosService: PedidoService,
    private fb: FormBuilder) {
  }

  header = new HttpHeaders()
    .set('Authorization', `Bearer ${this.accountService.getAuthorizationToken()}`)

  atualizarDados(){
    if(this.id != null){
      this.usuarioModificando.id = parseInt(this.id)
    }
    this.usuarioModificando.nome = this.usuario.nomeUsuario
    this.usuarioModificando.cpf = this.usuario.cpf
    this.usuarioModificando.cnh = this.usuario.cnh
    this.usuarioModificando.login = this.usuario.login
    this.perfilForm = this.fb.group({
      nome: new FormControl(this.usuarioModificando.nome),
      cpf: new FormControl(this.usuarioModificando.cpf),
      cnh: new FormControl(this.usuarioModificando.cnh),
      email: new FormControl({value: this.usuarioModificando.login, disabled: true}),
      senha: new FormControl(this.usuarioModificando.senha)
    })
    this.atualizandoDados = true
  }

  atualizarEndereco(){
    this.enderecoModificando.login = this.usuario.login
    this.enderecoModificando.cep = this.address.cep
    this.enderecoModificando.bairro = this.address.bairro
    this.enderecoModificando.cidade = this.address.cidade
    this.enderecoModificando.numero = this.address.numero
    this.enderecoModificando.rua = this.address.rua
    this.enderecoModificando.estado = this.address.estado
    this.enderecoForm = this.fb.group({
      cep: new FormControl(this.enderecoModificando.cep),
      bairro: new FormControl(this.enderecoModificando.bairro),
      cidade: new FormControl(this.enderecoModificando.cidade),
      numero: new FormControl(this.enderecoModificando.numero),
      rua: new FormControl(this.enderecoModificando.rua),
      estado: new FormControl(this.enderecoModificando.estado)
    })
    this.atualizandoEndereco = true
  }

  onSubmitPerfil(){
    if(this.id != null){
      this.accountService.atualizarUsuario(parseInt(this.id), this.usuarioModificando, this.header).subscribe(
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
      this.addressService.patchAddress(this.enderecoModificando, this.header).subscribe(
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
      this.accountService.getUsuarioAccount(this.id, this.header).subscribe(
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

        this.addressService.getAddress(this.id, this.header)
      .subscribe(
        data => {
          this.address = data[0]
          console.log(data)
        })

      this.pedidosService.getPedido(this.id, this.header).subscribe(
        data => {
          if(data.length != 0){
            this.carro = data[data.length-1].carro
            console.log(this.carro)
            this.pedido = data[data.length-1];
            console.log(this.pedido);
          }
        })

    } else {
      console.log("Erro, id nulo")
    }
  }
}
