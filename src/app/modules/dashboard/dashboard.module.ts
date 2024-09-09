import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardViewComponent } from './views/dashboard.view';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    DashboardViewComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
