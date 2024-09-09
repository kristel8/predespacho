import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerarBolsaComponent } from './view/generar-bolsa/generar-bolsa.component';
import { NuevaBolsaComponent } from './view/nueva-bolsa/nueva-bolsa.component';
import { AgregarDetalleBolsaComponent } from './view/agregar-detalle-bolsa/agregar-detalle-bolsa.component';

const routes: Routes = [
  { path: '', component: GenerarBolsaComponent },
  { path: 'nuevo', component: NuevaBolsaComponent },
  { path: 'agregarNuevoDetalle', component: AgregarDetalleBolsaComponent },
  { path: 'agregarDetalle', component: AgregarDetalleBolsaComponent },
  { path: 'verDetalle', component: NuevaBolsaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerarBolsaRoutingModule { }
