import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from '../account/create-account/create-account.component';
import { LoginComponent } from '../account/login/login.component';
import { HomeComponent } from '../layout/home/home.component';
import { AddressesComponent } from '../main/addresses/addresses.component';
import { NewAddressComponent } from '../main/addresses/new-address/new-address.component';
import { CarrosListComponent } from '../main/carros-list/carros-list.component';
import { PerfilComponent } from '../main/perfil/perfil.component';
import { PedidosComponent } from '../pedidos/pedidos.component';
import { AuthGuard } from '../shared/auth.guard';


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
    path: 'carros', component: CarrosListComponent
  },
  {
    path: 'addresses', component: AddressesComponent,
<<<<<<< HEAD
    canActivate: [AuthGuard]
  },
  {
    path: 'new-address', component: NewAddressComponent,
    canActivate: [AuthGuard]
=======
  },
  { 
    path: 'new-address', component: NewAddressComponent 
>>>>>>> 40191ead0cd8f2e8407df32bc2745da751a06628
  },
  {
    path: 'pedidos', component: PedidosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil', component: PerfilComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
