import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from '../account/create-account/create-account.component';
import { LoginComponent } from '../account/login/login.component';
import { HomeComponent } from '../layout/home/home.component';
import { CarrosListComponent } from '../main/carros-list/carros-list.component';
import { NewOrderComponent } from '../main/carros-list/new-order/new-order.component';
import { PerfilComponent } from '../main/perfil/perfil.component';
import { PedidosComponent } from '../main/pedidos/pedidos.component';
import { AuthGuard } from '../shared/auth.guard';
import { PainelAdminComponent } from '../painel-admin/painel-admin.component';
import { CadastroCarrosComponent } from '../cadastro-carros/cadastro-carros.component';
import { AtualizarCarrosComponent } from '../atualizar-carros/atualizar-carros.component';
import { GerenciarUsuariosComponent } from '../gerenciar-usuarios/gerenciar-usuarios.component';
import { AlugadosComponent } from '../alugados/alugados.component';
import { DisponiveisComponent } from '../disponiveis/disponiveis.component';


const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'cadastro', component: CreateAccountComponent
  },
  {
    path: '', component: HomeComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'carros', component: CarrosListComponent,
  },
  {
    path: 'new-order', component: NewOrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pedidos', component: PedidosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil', component: PerfilComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin', component: PainelAdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastro-carros', component: CadastroCarrosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'atualizar-carros', component: AtualizarCarrosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'gerenciar-usuarios', component: GerenciarUsuariosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'relatorio-alugados', component: AlugadosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'relatorio-disponiveis', component: DisponiveisComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
