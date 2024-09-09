import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { GenerarBolsaComponent } from './view/generar-bolsa/generar-bolsa.component';
import { GenerarBolsaRoutingModule } from './generar-bolsa-routing.module';
import { GenerarBolsaFormComponent } from './components/generar-bolsa-form/generar-bolsa-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { GenerarBolsaTableComponent } from './components/generar-bolsa-table/generar-bolsa-table.component';
import { GenerarBolsaItemComponent } from './components/generar-bolsa-item/generar-bolsa-item.component';
import { DataViewModule } from 'primeng/dataview';
import { NuevaBolsaComponent } from './view/nueva-bolsa/nueva-bolsa.component';
import { RouterModule } from '@angular/router';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NuevaBolsaFormComponent } from './components/nueva-bolsa-form/nueva-bolsa-form.component';
import { NuevaBolsaTableComponent } from './components/nueva-bolsa-table/nueva-bolsa-table.component';
import { AgregarDetalleFormComponent } from './components/agregar-detalle-form/agregar-detalle-form.component';
import { AgregarDetalleBolsaComponent } from './view/agregar-detalle-bolsa/agregar-detalle-bolsa.component';
import { DialogModule } from 'primeng/dialog';
import { ModificarBolsaFormComponent } from './components/modificar-bolsa-form/modificar-bolsa-form.component';
import { ImprimirModalComponent } from './components/imprimir-modal/imprimir-modal.component';
import { DetalleModalComponent } from './components/detalle-modal/detalle-modal.component';
import { PartirModalComponent } from './components/partir-modal/partir-modal.component';
import { FormatFieldPipe } from 'src/app/shared/format-field.pipe';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    GenerarBolsaComponent,
    GenerarBolsaFormComponent,
    GenerarBolsaTableComponent,
    GenerarBolsaItemComponent,
    NuevaBolsaComponent,
    NuevaBolsaFormComponent,
    NuevaBolsaTableComponent,
    AgregarDetalleFormComponent,
    AgregarDetalleBolsaComponent,
    ModificarBolsaFormComponent,
    ImprimirModalComponent,
    DetalleModalComponent,
    PartirModalComponent,
    FormatFieldPipe,
  ],
  imports: [
    CommonModule,
    GenerarBolsaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    TableModule,
    DataViewModule,
    RouterModule,
    DialogModule,
    InputTextareaModule,
    InputNumberModule,
    RadioButtonModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' } // Proporcionar el locale
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GenerarBolsaModule {}
