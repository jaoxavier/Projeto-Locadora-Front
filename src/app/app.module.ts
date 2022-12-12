import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './routes/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list'
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './account/login/login.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { HomeComponent } from './layout/home/home.component';
import { CarrosListComponent } from './main/carros-list/carros-list.component';
import { AddressesComponent } from './main/addresses/addresses.component';
import { NewAddressComponent } from './main/addresses/new-address/new-address.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PerfilComponent } from './main/perfil/perfil.component';
import { PedidosComponent } from './main/pedidos/pedidos.component';
import { NewOrderComponent } from './main/carros-list/new-order/new-order.component';
import { CadastroCarrosComponent } from './cadastro-carros/cadastro-carros.component';
import { PainelAdminComponent } from './painel-admin/painel-admin.component';
import { AtualizarCarrosComponent } from './atualizar-carros/atualizar-carros.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { GerenciarUsuariosComponent } from './gerenciar-usuarios/gerenciar-usuarios.component';
import { AlugadosComponent } from './alugados/alugados.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    CreateAccountComponent,
    AuthenticationComponent,
    HomeComponent,
    CarrosListComponent,
    AddressesComponent,
    NewAddressComponent,
    PerfilComponent,
    PedidosComponent,
    NewOrderComponent,
    CadastroCarrosComponent,
    PainelAdminComponent,
    AtualizarCarrosComponent,
    GerenciarUsuariosComponent,
    AlugadosComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    RouterModule,
    FormsModule,
    MatGridListModule,
    MatToolbarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
