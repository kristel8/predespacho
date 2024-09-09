import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY_VALUE, TipoFiltro } from 'src/app/global/constants';
import { FormatFieldPipe } from 'src/app/shared/format-field.pipe';
import { IAlmacenResponse } from 'src/app/shared/interfaces/almacen.interface';
import { IFiltro } from 'src/app/shared/interfaces/filtro.interface';
import { ITipoMovimientoResponse } from 'src/app/shared/interfaces/tipo-movimiento.interface';

@Component({
  selector: 'app-generar-bolsa-form',
  templateUrl: './generar-bolsa-form.component.html',
  styleUrls: ['./generar-bolsa-form.component.scss'],
})
export class GenerarBolsaFormComponent {
  isCargado = false;
  almacenes: IAlmacenResponse[] = [];
  filtros: IFiltro[] = [];
  tiposDeMovimiento: ITipoMovimientoResponse[] = [];

  TipoFiltro = TipoFiltro;
  filtroSeleccionado: string;
  opcion: string;

  fecha = new Date();
  formatField = new FormatFieldPipe();

  @Output() buscarBolsa = new EventEmitter<void>();
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.addValidatorRequired(this.ordenCorte);
  }

  form = this.fb.group({
    almacen: [null, Validators.required],
    filtro: [null, Validators.required],
    ordenCorte: [EMPTY_VALUE],
    preDespacho: [EMPTY_VALUE],
    tipoDeMovimiento: [null],
    fechaInicio: [null],
    fechaFin: [null],
    soloDespacho: [false],
  });

  get almacen() {
    return this.form.get('almacen');
  }

  get filtro() {
    return this.form.get('filtro');
  }

  get ordenCorte() {
    return this.form.get('ordenCorte');
  }

  get tipoDeMovimiento() {
    return this.form.get('tipoDeMovimiento');
  }

  get preDespacho() {
    return this.form.get('preDespacho');
  }

  get soloDespacho() {
    return this.form.get('soloDespacho');
  }

  get fechaInicio() {
    return this.form.get('fechaInicio');
  }

  get fechaFin() {
    return this.form.get('fechaFin');
  }

  changeFiltro(event): void {
    this.filtroSeleccionado = event.nomFiltro;
    this.opcion = event.opcion;
    this.removeValidatorRequired();

    if (this.filtroSeleccionado === this.TipoFiltro.Orden) {
      this.addValidatorRequired(this.ordenCorte);
      return;
    }

    if (this.filtroSeleccionado === this.TipoFiltro.Fechas) {
      this.addValidatorRequired(this.fechaInicio);
      this.addValidatorRequired(this.fechaFin);
      return;
    }

    if (this.filtroSeleccionado === this.TipoFiltro.Despacho) {
      this.addValidatorRequired(this.preDespacho);
      return;
    }

    if (this.filtroSeleccionado === this.TipoFiltro.Movimiento) {
      this.addValidatorRequired(this.tipoDeMovimiento);
      return;
    }
  }

  addValidatorRequired(control: AbstractControl): void {
    control.addValidators(Validators.required);
    control.updateValueAndValidity();
  }

  removeValidatorRequired(): void {
    this.ordenCorte.removeValidators(Validators.required);
    this.fechaInicio.removeValidators(Validators.required);
    this.fechaFin.removeValidators(Validators.required);
    this.preDespacho.removeValidators(Validators.required);
    this.tipoDeMovimiento.removeValidators(Validators.required);

    this.ordenCorte.reset();
    this.fechaInicio.reset();
    this.fechaFin.reset();
    this.preDespacho.reset();
    this.tipoDeMovimiento.reset();
  }

  nuevoBolsa(): void {
    this.router.navigateByUrl('/generar-bolsa/nuevo');
  }

  buscar(value: any): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.buscarBolsa.emit(value);
  }
}
