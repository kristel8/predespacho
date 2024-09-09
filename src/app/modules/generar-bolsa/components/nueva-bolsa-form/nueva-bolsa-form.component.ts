import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IAlmacenResponse } from 'src/app/shared/interfaces/almacen.interface';
import { ITipoMovimientoResponse } from 'src/app/shared/interfaces/tipo-movimiento.interface';

@Component({
  selector: 'app-nueva-bolsa-form',
  templateUrl: './nueva-bolsa-form.component.html',
  styleUrls: ['./nueva-bolsa-form.component.scss'],
})
export class NuevaBolsaFormComponent {
  isCargado: boolean = false;
  isOrdenCorte: boolean = false;
  isAcabado: boolean = false;
  requerimientos: any[] = [];
  almacenes: IAlmacenResponse[] = [];
  isGuardado = false;
  tiposDeMovimiento: ITipoMovimientoResponse[] = [];
  @Output() guardarBolsa = new EventEmitter<void>();
  @Output() volver = new EventEmitter<void>();

  constructor(private fb: FormBuilder) { }

  form = this.fb.group({
    almacen: [null, Validators.required],
    tipoDeMovimiento: [null, Validators.required],
    ordenCorte: [null],
    requerimiento: [null],
    observacion: [null],
  });

  get almacen() {
    return this.form.get('almacen');
  }

  get tipoDeMovimiento() {
    return this.form.get('tipoDeMovimiento');
  }

  get ordenCorte() {
    return this.form.get('ordenCorte');
  }

  get requerimiento() {
    return this.form.get('requerimiento');
  }

  get observacion() {
    return this.form.get('observacion');
  }

  guardar(value: any): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.guardarBolsa.emit(value);
  }

  regresar(): void {
    this.volver.emit();
  }
}
