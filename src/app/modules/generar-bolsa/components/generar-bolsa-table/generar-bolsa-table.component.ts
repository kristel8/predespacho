import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IBandejaResponse } from 'src/app/shared/interfaces/bandeja.interface';
import { ScreenSizeService } from 'src/app/shared/services/screen-size.service';

@Component({
  selector: 'app-generar-bolsa-table',
  templateUrl: './generar-bolsa-table.component.html',
  styleUrls: ['./generar-bolsa-table.component.scss'],
})
export class GenerarBolsaTableComponent implements OnInit {
  items: IBandejaResponse[] = [];
  cols: any = [];
  seleccionado: IBandejaResponse;
  loading = false;
  screenSize: { width: number, height: number };
  isScreenMobile = false;
  isMostrarTabla = false;

  @Output() modificar = new EventEmitter<void>();
  @Output() eliminar = new EventEmitter<void>();
  @Output() imprimir = new EventEmitter<void>();
  @Output() detalle = new EventEmitter<void>();

  constructor(private screenSizeService: ScreenSizeService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.screenSizeService.screenSize$.subscribe((size) => {
      this.screenSize = size;
      this.isScreenMobile = size.width <= 960;
      this.cdr.detectChanges();
    });

    this.cols = [
      { field: 'id_Pre_Desp', header: 'ID' },
      { field: 'co_CodOrdPro', header: 'Orden de corte' },
      { field: 'fec_Creacion', header: 'Fecha' },
      { field: 'des_Tip_Mov', header: 'T. Mov' },
      { field: 'observaciones', header: 'Observación' },
    ];
  }

  modificarItem(event): void {
    this.modificar.emit(event);
  }

  eliminarItem(event): void {
    this.eliminar.emit(event);
  }

  imprimirItem(event): void {
    this.imprimir.emit(event);
  }

  detalleItem(event): void {
    this.detalle.emit(event);
  }

}
