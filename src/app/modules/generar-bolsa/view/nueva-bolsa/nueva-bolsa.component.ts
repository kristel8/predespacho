import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GenerarBolsaService } from '../../services/generar-bolsa.service';
import { NuevaBolsaFormComponent } from '../../components/nueva-bolsa-form/nueva-bolsa-form.component';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { NuevaBolsaTableComponent } from '../../components/nueva-bolsa-table/nueva-bolsa-table.component';
import { ITipoMovimientoResponse } from 'src/app/shared/interfaces/tipo-movimiento.interface';
import { Validators } from '@angular/forms';
import { IPreDespachoRequest } from 'src/app/shared/interfaces/pre-despacho.interface';
import { Opcion } from 'src/app/global/opcion';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { STORAGE, UNDEFINED_VALUE } from 'src/app/global';
import { LocaleUtil } from 'src/app/global/locale.utils';
import { Router } from '@angular/router';
import { IDetallePreDespachoRequest } from 'src/app/shared/interfaces/detalle-pre-despacho.interface';
import { IDetalleDetallePreDespachoRequest, IDetallePreDespachoDeleteRequest } from 'src/app/shared/interfaces/detalle-detalle.interface';
import { DetalleModalComponent } from '../../components/detalle-modal/detalle-modal.component';
import { IPartirRequest } from 'src/app/shared/interfaces/partir-producto.interface';
import { PartirModalComponent } from '../../components/partir-modal/partir-modal.component';

@Component({
  selector: 'app-nueva-bolsa',
  templateUrl: './nueva-bolsa.component.html',
  styleUrls: ['./nueva-bolsa.component.scss'],
})
export class NuevaBolsaComponent implements OnInit, AfterViewInit {
  @ViewChild('formNuevaBolsa') formNuevaBolsa!: NuevaBolsaFormComponent;
  @ViewChild('tableNuevaBolsa') tableNuevaBolsa!: NuevaBolsaTableComponent;
  @ViewChild('detalleModal') detalleModal!: DetalleModalComponent;
  @ViewChild('partirModal') partirModal!: PartirModalComponent;
  preDespachoId: number = this.storage.getItem(STORAGE.detallePreDespachoId);
  seleccionado: any;
  isNuevo = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private generarBolsaService: GenerarBolsaService,
    private mensajeSwal: MensajesSwalService,
    private storage: LocaleUtil,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.router.url.includes('nuevo')) {
      this.isNuevo = true;
    } else {
      const preDespachoId = this.storage.getItem(STORAGE.detallePreDespachoId);
      const data: IDetallePreDespachoRequest = {
        opcion: Opcion.Obtener,
        id_Pre_Desp: preDespachoId
      }

      this.generarBolsaService.getDetalleBolsa(data).subscribe(response => {
        this.isNuevo = false;
        this.mostrarTabla(response);
      })
    }
  }

  ngAfterViewInit(): void {
    if (this.router.url.includes('verDetalle')) return;

    this.getAlmacen();
    this.subscriptions.add(
      this.formNuevaBolsa.almacen.valueChanges
        .pipe(distinctUntilChanged())
        .subscribe((response) => {
          this.generarBolsaService.getTipoMovimiento(response.codAlmacen).subscribe((response) => {
            this.formNuevaBolsa.tiposDeMovimiento = response;
          });
        })
    );

    this.subscriptions.add(
      this.formNuevaBolsa.tipoDeMovimiento.valueChanges
        .pipe(distinctUntilChanged())
        .subscribe((response: ITipoMovimientoResponse) => {
          if (response) {
            const { flg_Solicita_Orden_Corte, flg_Solicita_Orden_Corte_Opcional, flg_Evalua_Req_Acabado } = response;
            this.formNuevaBolsa.isOrdenCorte = flg_Solicita_Orden_Corte || flg_Solicita_Orden_Corte_Opcional;
            this.formNuevaBolsa.isAcabado = flg_Evalua_Req_Acabado;
            this.formNuevaBolsa.ordenCorte.reset();
            this.formNuevaBolsa.observacion.reset();
            this.formNuevaBolsa.requerimiento.reset();

            this.formNuevaBolsa.ordenCorte.addValidators(Validators.required);
            this.formNuevaBolsa.requerimiento.addValidators(Validators.required);

            if (flg_Solicita_Orden_Corte_Opcional || !flg_Solicita_Orden_Corte) {
              this.formNuevaBolsa.ordenCorte.removeValidators(Validators.required);
              this.formNuevaBolsa.ordenCorte.updateValueAndValidity();
            }

            if (!flg_Evalua_Req_Acabado) {
              this.formNuevaBolsa.requerimiento.removeValidators(Validators.required);
              this.formNuevaBolsa.requerimiento.updateValueAndValidity();
            }

            this.formNuevaBolsa.form.markAsUntouched();
          }
        })
    );

    this.subscriptions.add(
      this.formNuevaBolsa.ordenCorte.valueChanges
        .pipe(
          distinctUntilChanged(),
          switchMap((value) =>
            value && value.length > 2 && this.formNuevaBolsa.isAcabado ? this.generarBolsaService.getRequerimientoPorOC(value) : of([])
          )
        )
        .subscribe((response) => {
          if (response.length) {
            this.formNuevaBolsa.requerimientos = response;
            this.formNuevaBolsa.requerimiento.markAsUntouched();
          } else {
            this.formNuevaBolsa.requerimiento.markAsTouched();
            this.formNuevaBolsa.requerimientos = response;
          }
        })
    );

    this.preLoad();
  }

  getAlmacen(): void {
    this.generarBolsaService.getAlmacen().subscribe((response) => {
      this.formNuevaBolsa.almacenes = response;
      this.formNuevaBolsa.isCargado = true;
      if (this.router.url.includes('nuevo')) {
        const { almacen } = this.storage.getItem(STORAGE.bolsa);
        this.formNuevaBolsa.almacen.setValue(almacen);
        this.formNuevaBolsa.almacen.disable();
      }
    });
  }

  guardar(): void {
    const { tipoDeMovimiento, ordenCorte, requerimiento, observacion, almacen } = this.formNuevaBolsa.form.getRawValue();
    const request: IPreDespachoRequest = {
      opcion: Opcion.Ingresar,
      cod_Almacen: almacen.codAlmacen,
      id_Pre_Desp: 0,
      id_Tip_Mov: tipoDeMovimiento.id_Tip_Mov,
      observaciones: observacion,
      co_Cod_OrdPro: ordenCorte,
      id_Req_Avios_Acabados: requerimiento?.id_Req_Avios_Acabados
    }

    this.generarBolsaService.postCrearBolsa(request).pipe(
      switchMap((response) => {
        if (response) {
          this.mensajeSwal.mensajeGrabadoSatisfactorio();
          this.formNuevaBolsa.isGuardado = true;
          this.formNuevaBolsa.form.disable();

          this.storage.setItem(STORAGE.detallePreDespachoId, response);
          this.preDespachoId = response;
          this.storage.setItem(STORAGE.nuevaBolsa, {
            id_Pre_Desp: response,
            formNuevaBolsa: this.formNuevaBolsa.form.getRawValue()
          });

          const data: IDetallePreDespachoRequest = {
            opcion: Opcion.Obtener,
            id_Pre_Desp: response
          }

          return this.generarBolsaService.getDetalleBolsa(data);
        }

        return of(UNDEFINED_VALUE);
      })
    )
      .subscribe(response => {
        this.mostrarTabla(response);
      });
  }

  mostrarTabla(data: any) {
    this.tableNuevaBolsa.isMostrarTabla = true;
    this.tableNuevaBolsa.productos = data;
    this.tableNuevaBolsa.showID = true;
    this.tableNuevaBolsa.preDespachoId = this.storage.getItem(STORAGE.detallePreDespachoId);
    this.tableNuevaBolsa.cols = [
      { field: 'cod_item', header: 'Codigo' },
      { field: 'can_Requerida', header: 'Requerido' },
      { field: 'can_Entregada', header: 'Atendido' },
      { field: 'can_en_Paquetes', header: 'Stock' },
      { field: 'sector', header: 'Sector' },
      { field: 'des_Item', header: 'Descripcion' },
    ];
  }

  preLoad(): void {
    if (this.storage.getItem(STORAGE.nuevaBolsa) && this.router.url.includes('nuevo')) {
      const { formNuevaBolsa, id_Pre_Desp } = this.storage.getItem(STORAGE.nuevaBolsa);

      const data: IDetallePreDespachoRequest = {
        opcion: Opcion.Obtener,
        id_Pre_Desp: id_Pre_Desp
      }

      this.generarBolsaService.getDetalleBolsa(data).subscribe(response => {
        this.mostrarTabla(response);
      });

      this.formNuevaBolsa.form.patchValue(formNuevaBolsa);
      setTimeout(() => {
        this.formNuevaBolsa.form.disable();
        this.formNuevaBolsa.isGuardado = true;
      }, 700);
    }
  }

  regresar(): void {
    this.storage.removeItem(STORAGE.nuevaBolsa);
    this.storage.removeItem(STORAGE.detallePreDespachoId);
    this.router.navigateByUrl('/generar-bolsa');
  }

  agregar(): void {
    this.seleccionado = this.tableNuevaBolsa.seleccionado;
    this.storage.removeItem(STORAGE.añadidos);
    if (this.seleccionado) {
      this.storage.setItem(STORAGE.seleccionadoDetalle, this.seleccionado);
    }

    if (this.router.url.includes('nuevo')) {
      this.router.navigateByUrl('generar-bolsa/agregarNuevoDetalle');
    } else {

      this.router.navigateByUrl('generar-bolsa/agregarDetalle');
    }
  }

  eliminarItem(data): void {
    const preDespachoId = this.storage.getItem(STORAGE.detallePreDespachoId);

    const request: IDetallePreDespachoDeleteRequest = {
      id: data.id,
      id_Pre_Desp: preDespachoId,
      opcion: Opcion.Eliminar
    }

    this.mensajeSwal.mensajePregunta('¿Estás seguro de actualizar?').then(
      response => {
        if (response.isConfirmed) {
          this.generarBolsaService.deleteDetalle(request).subscribe({
            next: () => {
              const requestGetDetalleDetalle: IDetallePreDespachoDeleteRequest = {
                id: data.id,
                id_Pre_Desp: preDespachoId,
                opcion: Opcion.Detalle
              }

              const requestGetDetalle: IDetallePreDespachoRequest = {
                id_Pre_Desp: preDespachoId,
                opcion: Opcion.Obtener
              }

              this.subscriptions.add(this.generarBolsaService.getDetalleProducto(requestGetDetalleDetalle).pipe(
                switchMap((response) => {
                  this.detalleModal.detalles = response;
                  return this.generarBolsaService.getDetalleBolsa(requestGetDetalle)
                })
              ).subscribe(response => {
                this.mostrarTabla(response);
                this.mensajeSwal.mensajeRegistroEliminado();
              }))
            },
          });
        }
      });


  }

  detalle(event): void {
    const preDespachoId = this.storage.getItem(STORAGE.detallePreDespachoId);

    this.detalleModal.loading = true;
    const request: IDetalleDetallePreDespachoRequest = {
      opcion: Opcion.Detalle,
      id_Pre_Desp: preDespachoId,
      id: event.id
    }
    this.generarBolsaService.getDetalleProducto(request).subscribe(response => {
      this.detalleModal.detalles = response;
      this.detalleModal.isOpenModal = true;
      this.detalleModal.loading = false;
    })
  }

  partir(data): void {
    this.seleccionado = data;
    this.partirModal.isOpenModal = true;

    this.partirModal.form.reset();
    this.partirModal.cantPaquetes.setValue(1);
  }

  aceptarPartir(): void {
    const { codBarra, nuevaCantidad, cantPaquetes, impresora } = this.partirModal.form.getRawValue();

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
        this.preLoad();
      },
      error: () => {
        this.partirModal.form.reset();
      }
    });
  }
}
