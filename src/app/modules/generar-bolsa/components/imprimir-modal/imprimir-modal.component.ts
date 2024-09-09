import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { GenerarBolsaService } from '../../services/generar-bolsa.service';
import { IImpresionRequest } from 'src/app/shared/interfaces/impresion.interface';

@Component({
  selector: 'app-imprimir-modal',
  templateUrl: './imprimir-modal.component.html',
  styleUrls: ['./imprimir-modal.component.scss'],
})
export class ImprimirModalComponent implements OnInit {
  impresora = new FormControl('', Validators.required);
  impresoras: any[] = [];
  isOpenModal: boolean = false;
  data: any;

  constructor(
    private generarBolsaService: GenerarBolsaService,
    private mensajeSwal: MensajesSwalService,
  ) { }

  ngOnInit(): void {
    this.getImpresoras();
  }

  getImpresoras(): void {
    this.generarBolsaService.getImpresoras().subscribe(response => {
      this.impresoras = response;
    })
  }

  imprimirItem(): void {
    const request: IImpresionRequest = {
      ids: this.data.id_Pre_Desp,
      opcion: 1,
      impresora: this.impresora.value,
    }

    this.generarBolsaService.getImpresion(request).subscribe({
      next: (response) => {
        this.closeModal();
        if (response.includes('Error')) {
          this.mensajeSwal.mensajeError(response);
        } else {
          this.mensajeSwal.mensajeInformacion(response);
        }
      },
      error: () => {
        this.closeModal();
      }
    });
  }

  closeModal(): void {
    this.isOpenModal = false;
    this.impresora.reset();
  }
}
