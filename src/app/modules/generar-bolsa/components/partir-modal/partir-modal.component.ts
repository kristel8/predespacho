import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GenerarBolsaService } from '../../services/generar-bolsa.service';

@Component({
  selector: 'app-partir-modal',
  templateUrl: './partir-modal.component.html',
  styleUrls: ['./partir-modal.component.scss'],
})
export class PartirModalComponent implements OnInit {
  @Output() aceptar = new EventEmitter<void>();

  isOpenModal: boolean = false;
  data: any;
  impresoras: any[] = [];
  form = this.fb.group({
    codBarra: [null, Validators.required],
    nuevaCantidad: [null, Validators.required],
    cantPaquetes: [null, Validators.required],
    impresora: [null, Validators.required],
  });

  get codBarra() {
    return this.form.get('codBarra');
  }

  get nuevaCantidad() {
    return this.form.get('nuevaCantidad');
  }

  get cantPaquetes() {
    return this.form.get('cantPaquetes');
  }

  get impresora() {
    return this.form.get('impresora');
  }

  constructor(
    private generarBolsaService: GenerarBolsaService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.generarBolsaService.getImpresoras().subscribe((response) => {
      this.impresoras = response;
    });
  }

  guardarPartir(): void {
    this.aceptar.emit();
  }

  closeModal() {
    this.isOpenModal = false;
  }
}
