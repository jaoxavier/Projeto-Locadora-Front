import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../model/Account';
import { AccountService } from '../shared/account.service';
import { AccountPut } from '../model/AccountPut'

@Component({
  selector: 'app-gerenciar-usuarios',
  templateUrl: './gerenciar-usuarios.component.html',
  styleUrls: ['./gerenciar-usuarios.component.css']
})
export class GerenciarUsuariosComponent implements OnInit {

  usuarioSelecionado: AccountPut = {
    id: 0,
    nome: '',
    cpf: '',
    cnh: '',
    login: '',
    senha: '',
    admin: false
  }

  usuariosForm: FormGroup
  usuarios: Account[]

  constructor(
    private fb: FormBuilder,
    private routerService: Router,
    private accountService: AccountService
  ) {
    this.usuariosForm = this.fb.group({
      nome: new FormControl(this.usuarioSelecionado.nome),
      cpf: new FormControl(this.usuarioSelecionado.cpf),
      cnh: new FormControl(this.usuarioSelecionado.cnh),
      login: new FormControl(this.usuarioSelecionado.login),
      senha: new FormControl(this.usuarioSelecionado.senha),
      admin: new FormControl(this.usuarioSelecionado.admin)
    })
  }

  id = window.localStorage.getItem('id')
  admin = false

  ngOnInit(): void {
    if(this.id!=null && this.accountService.isUserLoggedIn()){
      this.accountService.getClienteIdUsuario(parseInt(this.id)).subscribe(
        data=>{
          this.admin = data.admin
          if(!this.admin){
            this.routerService.navigate(['perfil'])
          }
        })
    }
    this.accountService.getUsuarios().subscribe(
      data=>{
        this.usuarios = data
        console.log(data)
      })
  }

  onChange(){
    this.accountService.getClienteIdUsuario(this.usuarioSelecionado.id).subscribe(
      data=>{
        this.usuarioSelecionado.admin = data.admin
        this.usuarioSelecionado.senha = data.senha
      }
    )
  }

  onSubmit(){
    this.accountService.atualizarUsuario(this.usuarioSelecionado.id, this.usuarioSelecionado).subscribe(
      data=>{
        console.log(this.usuarioSelecionado)
        this.routerService.navigate(['perfil'])
      }
    )
  }
}
