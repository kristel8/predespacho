import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IBandejaResponse } from 'src/app/shared/interfaces/bandeja.interface';

@Component({
  selector: 'app-generar-bolsa-item',
  templateUrl: './generar-bolsa-item.component.html',
  styleUrls: ['./generar-bolsa-item.component.scss'],
})
export class GenerarBolsaItemComponent implements OnInit {
  @Input() item: any;
  @Output() modificar = new EventEmitter<IBandejaResponse>();
  @Output() eliminar = new EventEmitter<IBandejaResponse>();
  @Output() imprimir = new EventEmitter<IBandejaResponse>();
  @Output() detalle = new EventEmitter<IBandejaResponse>();
  isDetalle = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.router.url.includes('verDetalle') || this.router.url.includes('nuevo')) {
      this.isDetalle = true;
    } else {
      this.isDetalle = false;
    }
  }

  modificarItem(): void {
    this.modificar.emit(this.item);
  }

  eliminarItem(): void {
    this.eliminar.emit(this.item);
  }

  imprimirItem(): void {
    this.imprimir.emit(this.item);
  }

  detalleItem(): void {
    this.detalle.emit(this.item);
  }
}
