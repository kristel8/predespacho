import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-detalle-modal',
  templateUrl: './detalle-modal.component.html',
  styleUrls: ['./detalle-modal.component.scss'],
})
export class DetalleModalComponent implements OnInit {
  detalles: any[] = [];
  loading = false;
  isOpenModal: boolean = false;
  data: any;
  cols: any = [];
  @Output() eliminar = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'cantidad', header: 'Cant' },
      { field: 'fec_Asigna_Pre_Desp', header: 'Fecha' },
    ];
  }

  eliminarItem(data): void {
    this.eliminar.emit(data);
  }

  closeModal() {
    this.isOpenModal = false;
  }
}
