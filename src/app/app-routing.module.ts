import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { LoginComponent } from './account/login/login.component';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { HomeComponent } from './layout/home/home.component';
import { AddressesComponent } from './main/addresses/addresses.component';
import { NewAddressComponent } from './main/addresses/new-address/new-address.component';
import { CarrosListComponent } from './main/carros-list/carros-list.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '',
    component: HomeComponent,
    children: [
      { path: 'home', component: CarrosListComponent },
      { path: 'addresses', component:AddressesComponent},
      { path: 'new-address', component: NewAddressComponent}
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'create-account', component: CreateAccountComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
