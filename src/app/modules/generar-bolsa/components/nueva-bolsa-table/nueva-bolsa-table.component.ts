import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajesGlobales } from 'src/app/global';
import { ScreenSizeService } from 'src/app/shared/services/screen-size.service';

@Component({
  selector: 'app-nueva-bolsa-table',
  templateUrl: './nueva-bolsa-table.component.html',
  styleUrls: ['./nueva-bolsa-table.component.scss'],
})
export class NuevaBolsaTableComponent implements OnInit {
  productos: any = [];
  cols: any = [];
  seleccionado: any;
  loading = false;
  screenSize: { width: number, height: number };
  isScreenMobile = false;
  isDetalle = false;
  isMostrarTabla = false;
  preDespachoId: number;
  showID = false;
  mesajeNotItems = MensajesGlobales._MENSAJE_NOT_ITEMS;
  selectedId: number | null = null;
  rdItem = new FormControl();

  @Output() volver = new EventEmitter<void>();
  @Output() agregar = new EventEmitter<void>();
  @Output() verDetalle = new EventEmitter<void>();
  @Output() partir = new EventEmitter<void>();

  constructor(private screenSizeService: ScreenSizeService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.router.url.includes('verDetalle') || this.router.url.includes('nuevo')) {
      this.isDetalle = true;
    } else {
      this.isDetalle = false;
    }

    this.screenSizeService.screenSize$.subscribe((size) => {
      this.screenSize = size;
      this.isScreenMobile = size.width <= 960;
      this.cdr.detectChanges();
    });
  }

  clearRadio(index: number): void {
    if (this.selectedId === index) {
      this.selectedId = null;
      this.rdItem.reset();
      this.seleccionado = this.rdItem.value;
    } else {
      this.selectedId = index;
      this.seleccionado = this.rdItem.value;
    }
  }

  regresar(): void {
    this.volver.emit();
  }

  agregarDetalle(): void {
    this.agregar.emit();
  }

  detalle(event): void {
    this.verDetalle.emit(event);
  }

  partirItem(): void {
    this.partir.emit(this.seleccionado);
  }
}
