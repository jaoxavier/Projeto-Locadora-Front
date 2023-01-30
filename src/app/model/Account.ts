import { Address } from "./Address"

export class Account{
  id: number
  nome: string
  cpf: string
  cnh: string
  login: string
  senha: string
  admin: boolean = true;
  address: any;

  constructor(
    nome: string, 
    cpf: string, 
    cnh: string, 
    login: string, 
    senha: string,
    address: any
  ){
    this.nome = nome;
    this.cpf = cpf;
    this.cnh = cnh;
    this.login = login;
    this.senha = senha;
    this.address = address;
  }
}