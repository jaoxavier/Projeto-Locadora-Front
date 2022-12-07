import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/account.service';
import { PedidoService } from 'src/app/shared/pedido.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  carro = {
    id: 0,
    modelo: '',
    placa: '',
    valorDiaria: '',
    categoria: '',
    disponivel: false
  }

  usuario = {
    id: 0,
    nome: '',
    cnh: ''
  }

  pedido = {
    id: 0,
    diasLocacao: 0,
    status: '',
    valorTotal: 0,
    usuario: this.usuario,
    carro: this.carro
  }

  devolucao = {
    diasUsados: 0,
    novoStatus: "FINALIZADO"
  }

  valorMulta: number;


  header = new HttpHeaders()
    .set('Authorization', `Bearer ${this.accountService.getAuthorizationToken()}`)

  constructor(
    private accountService: AccountService,
    private pedidoService: PedidoService
  ) { }

  ngOnInit(): void {
    const id = window.localStorage.getItem('id');
    if(id != null){
      this.pedidoService.getPedido(id, this.header).subscribe(
        data => {
          this.carro.id = data[data.length-1].carro.id;
          this.carro.modelo = data[data.length-1].carro.modelo;
          this.carro.placa = data[data.length-1].carro.placa;
          this.carro.valorDiaria = data[data.length-1].carro.valorDiaria;
          this.carro.categoria = data[data.length-1].carro.categoria;
          this.carro.disponivel = data[data.length-1].carro.disponivel;

          this.usuario.id = data[data.length-1].usuario.id;
          this.usuario.nome = data[data.length-1].usuario.nome;
          this.usuario.cnh = data[data.length-1].usuario.cnh;

          this.pedido.id = data[data.length-1].id;
          this.pedido.diasLocacao = data[data.length-1].diasLocacao;
          this.pedido.status = data[data.length-1].status;
          this.pedido.valorTotal = data[data.length-1].valorTotal;
        }
      )
    }
  }

  onSubmit(){
    console.log(this.devolucao);

    this.devolver()
  }

  devolver(){
    this.pedidoService.patchPedido(this.pedido.id, this.devolucao, this.header).subscribe(
      data => {
        this.valorMulta = data.valorMulta;
        alert(`Você precisa pagar R$${this.valorMulta},00 por atrasar a devolução do seu veículo`);
        window.location.reload()
      }
    )
  }

}
