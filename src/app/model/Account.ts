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

  constructor(){}
}

export class AccountBuilder{

  account: Account;

  constructor(account = new Account()){
    this.account = account;
  }

  info(){
    return new AccountBuilderInfo(this.account);
  }

  build(){
    return this.account;
  }
}

class AccountBuilderInfo extends AccountBuilder{
  constructor(account: Account){
    super(account);
  }

  nome(nome: string){
    this.account.nome = nome;
    return this;
  }

  cpf(cpf: string){
    this.account.cpf = cpf;
    return this;
  }

  cnh(cnh: string){
    this.account.cnh = cnh;
    return this;
  }

  login(login: string){
    this.account.login = login;
    return this;
  }

  senha(senha: string){
    this.account.senha = senha;
    return this;
  }

  address(address: Address){
    this.account.address = address;
    return this;
  }
}