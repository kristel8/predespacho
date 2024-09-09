import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GenerarBolsaService } from '../../services/generar-bolsa.service';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { LocaleUtil } from 'src/app/global/locale.utils';
import { Router } from '@angular/router';
import { AgregarDetalleFormComponent } from '../../components/agregar-detalle-form/agregar-detalle-form.component';
import { IGenerateDetalleRequest } from 'src/app/shared/interfaces/detalle-pre-despacho.interface';
import { Opcion } from 'src/app/global/opcion';
import { EMPTY_VALUE, STORAGE } from 'src/app/global';
import { PartirModalComponent } from '../../components/partir-modal/partir-modal.component';
import { IPartirRequest } from 'src/app/shared/interfaces/partir-producto.interface';

@Component({
  selector: 'app-agregar-detalle-bolsa',
  templateUrl: './agregar-detalle-bolsa.component.html',
  styleUrls: ['./agregar-detalle-bolsa.component.scss'],
})
export class AgregarDetalleBolsaComponent implements OnInit, AfterViewInit {
  @ViewChild('formAgregarDetalle') formAgregarDetalle!: AgregarDetalleFormComponent;
  @ViewChild('partirModal') partirModal!: PartirModalComponent;
  preDespachoId: number;

  constructor(
    private generarBolsaService: GenerarBolsaService,
    private mensajeSwal: MensajesSwalService,
    private storage: LocaleUtil,
    private router: Router
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    const cantidad = this.storage.getItem(STORAGE.añadidos);
    this.storage.setItem(STORAGE.añadidos, cantidad);
    this.preDespachoId = this.storage.getItem(STORAGE.detallePreDespachoId);
  }

  guardar(): void {
    let preDespachoId;
    if (this.router.url.includes('agregarNuevoDetalle')) {
      preDespachoId = this.storage.getItem(STORAGE.nuevaBolsa).id_Pre_Desp;
    } else {
      preDespachoId = this.storage.getItem(STORAGE.detallePreDespachoId);
    }


    let sector = EMPTY_VALUE;
    const seleccionadoDetalle = this.storage.getItem(STORAGE.seleccionadoDetalle);

    if (seleccionadoDetalle) {
      sector = seleccionadoDetalle.sector;
    }

    const codBarra = this.formAgregarDetalle.codBarra.value;
    const request: IGenerateDetalleRequest = {
      opcion: Opcion.Ingresar,
      id_Pre_Desp: preDespachoId,
      id: +codBarra,
      sector1: sector
    }

    this.generarBolsaService.postAñadirProducto(request).subscribe({
      next: (response) => {
        this.mensajeSwal.mensajeGrabadoSatisfactorio();
        this.formAgregarDetalle.cantidad++;
        this.storage.setItem(STORAGE.añadidos, this.formAgregarDetalle.cantidad);
        this.formAgregarDetalle.codBarra.reset();
      },
      error: () => {
        this.formAgregarDetalle.codBarra.reset();
      }
    })
  }

  partir(): void {
    this.partirModal.isOpenModal = true;
  }

  aceptarPartir(): void {
    const { codBarra, nuevaCantidad, impresora, cantPaquetes } = this.partirModal.form.getRawValue();

    const request: IPartirRequest = {
      Id: +codBarra,
      cantidad_del_NUEVO_paquete: nuevaCantidad,
      Nro_Paquetes: cantPaquetes,
      Impresora: impresora.rutaUbicacionImpresora,
    }
    this.generarBolsaService.postPartirProducto(request).subscribe({
      next: () => {
        this.mensajeSwal.mensajeGrabadoSatisfactorio();
        this.partirModal.form.reset();
        this.partirModal.isOpenModal = false;
      },
      error: () => {
        this.partirModal.form.reset();
      }
    });
  }

  regresar(): void {
    this.storage.removeItem(STORAGE.añadidos);
    this.storage.removeItem(STORAGE.seleccionadoDetalle);

    if (this.storage.getItem('nuevaBolsa')) {
      this.router.navigateByUrl('/generar-bolsa/nuevo');
    } else {
      this.router.navigateByUrl('/generar-bolsa/verDetalle');
    }
  }
}
