import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LocaleUtil } from 'src/app/global';

@Component({
  selector: 'app-agregar-detalle-form',
  templateUrl: './agregar-detalle-form.component.html',
  styleUrls: ['./agregar-detalle-form.component.scss'],
})
export class AgregarDetalleFormComponent {
  isCargado = false;
  isGuardado = false;
  cantidad = 0;
  codBarra = new FormControl('', Validators.required);

  @Output() guardar = new EventEmitter<void>();
  @Output() volver = new EventEmitter<void>();
  @Output() partir = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private storage: LocaleUtil) {
    const cantidad = this.storage.getItem('añadidos');
    this.cantidad = cantidad ?? 0;
  }

  guardarItem(value: any): void {
    if (this.codBarra.invalid) {
      this.codBarra.markAllAsTouched();
      return;
    }

    this.guardar.emit(value);
  }

  partirItem(): void {
    this.partir.emit();
  }

  regresar(): void {
    this.storage.removeItem('añadidos');
    this.volver.emit();
  }
}
