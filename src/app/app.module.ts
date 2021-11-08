import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedService } from './shared.service';
import { LoginComponent } from './Components/login/login.component';
import { VendedoresComponent } from './Components/vendedores/vendedores.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ClientesComponent } from './Components/clientes/clientes.component';
import { ArticulosComponent } from './Components/articulos/articulos.component';
import { FacturacionComponent } from './Components/facturacion/facturacion.component';
import { ConsultasComponent } from './Components/consultas/consultas.component';
import { ContabilidadComponent } from './Components/contabilidad/contabilidad.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VendedoresComponent,
    InicioComponent,
    NavbarComponent,
    ClientesComponent,
    ArticulosComponent,
    FacturacionComponent,
    ConsultasComponent,
    ContabilidadComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
