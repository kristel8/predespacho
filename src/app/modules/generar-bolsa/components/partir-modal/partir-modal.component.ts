import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GenerarBolsaService } from '../../services/generar-bolsa.service';
import { InputNumber } from 'primeng/inputnumber';

@Component({
  selector: 'app-partir-modal',
  templateUrl: './partir-modal.component.html',
  styleUrls: ['./partir-modal.component.scss'],
})
export class PartirModalComponent implements OnInit {
  @Output() aceptar = new EventEmitter<void>();
  @ViewChild('cantPorPaqueteInput') cantPorPaqueteInput!: InputNumber;

  isOpenModal: boolean = false;
  data: any;
  impresoras: any[] = [];
  form = this.fb.group({
    codPaquete: [null, Validators.required],
    cantActual: [{ value: null, disabled: true }],
    um: [{ value: null, disabled: true }],
    cantPorPaquete: [null, Validators.required],
    cantAGenerar: [1, Validators.required],
    impresora: [null, Validators.required],
  });

  get codPaquete() {
    return this.form.get('codPaquete');
  }

  get cantActual() {
    return this.form.get('cantActual');
  }

  get um() {
    return this.form.get('um');
  }

  get cantPorPaquete() {
    return this.form.get('cantPorPaquete');
  }

  get cantAGenerar() {
    return this.form.get('cantAGenerar');
  }

  get impresora() {
    return this.form.get('impresora');
  }

  constructor(
    private generarBolsaService: GenerarBolsaService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.generarBolsaService.getImpresoras().subscribe((response) => {
      this.impresoras = response;
    });
  }

  consultar(): void {
    this.generarBolsaService.getAtributos(this.codPaquete.value).subscribe((response) => {
      this.form.patchValue({
        cantActual: response.cantidad,
        um: response.cod_UniMed
      });
      const inputElement = this.cantPorPaqueteInput.input.nativeElement;
      inputElement.focus();
    })
  }

  guardarPartir(): void {
    this.aceptar.emit();
  }

  closeModal(): void {
    this.isOpenModal = false;
  }
}
