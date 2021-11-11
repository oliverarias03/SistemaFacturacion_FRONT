import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticulosComponent } from './Components/articulos/articulos.component';
import { ClientesComponent } from './Components/clientes/clientes.component';
import { ConsultasComponent } from './Components/consultas/consultas.component';
import { ContabilidadComponent } from './Components/contabilidad/contabilidad.component';
import { FacturacionComponent } from './Components/facturacion/facturacion.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { LoginComponent } from './Components/login/login.component';
import { VendedoresComponent } from './Components/vendedores/vendedores.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'vendedores', component: VendedoresComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'articulos', component: ArticulosComponent },
  { path: 'facturacion', component: FacturacionComponent },
  { path: 'consultas', component: ConsultasComponent },
  { path: 'contabilidad', component: ContabilidadComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
