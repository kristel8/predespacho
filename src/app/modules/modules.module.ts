import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenerarBolsaModule } from './generar-bolsa/generar-bolsa.module';
import { GenerarBolsaRoutingModule } from './generar-bolsa/generar-bolsa-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    DashboardModule,
    DashboardRoutingModule,
    GenerarBolsaModule,
    GenerarBolsaRoutingModule
  ],
  exports: [
    DashboardModule,
    GenerarBolsaModule,
  ],
})
export class ModulesModule { }
