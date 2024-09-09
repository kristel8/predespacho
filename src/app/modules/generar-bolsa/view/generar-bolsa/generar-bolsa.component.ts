import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewChild,
  type OnInit,
} from '@angular/core';
import { GenerarBolsaFormComponent } from '../../components/generar-bolsa-form/generar-bolsa-form.component';
import { forkJoin, Subscription } from 'rxjs';
import { GenerarBolsaService } from '../../services/generar-bolsa.service';
import { GenerarBolsaTableComponent } from '../../components/generar-bolsa-table/generar-bolsa-table.component';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { IFiltro } from 'src/app/shared/interfaces/filtro.interface';
import { IBandejaRequest } from 'src/app/shared/interfaces/bandeja.interface';
import { ITipoMovimientoResponse } from 'src/app/shared/interfaces/tipo-movimiento.interface';
import { FORMATO_FECHA_yyyyMMdd, FORMATO_FECHA_yyyyMMdd2, STORAGE, TipoFiltro } from 'src/app/global';
import { BolsaState } from 'src/app/shared/states/bolsa.state';
import { ModificarBolsaFormComponent } from '../../components/modificar-bolsa-form/modificar-bolsa-form.component';
import { IPreDespachoDeleteRequest, IPreDespachoRequest } from 'src/app/shared/interfaces/pre-despacho.interface';
import { Opcion } from 'src/app/global/opcion';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { ImprimirModalComponent } from '../../components/imprimir-modal/imprimir-modal.component';
import { Router } from '@angular/router';
import { LocaleUtil } from 'src/app/global/locale.utils';
import { FormatFieldPipe } from 'src/app/shared/format-field.pipe';

@Component({
  selector: 'app-generar-bolsa',
  templateUrl: './generar-bolsa.component.html',
  styleUrls: ['./generar-bolsa.component.scss'],
})
export class GenerarBolsaComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('formGenerarBolsa') formGenerarBolsa!: GenerarBolsaFormComponent;
  @ViewChild('tableGenerarBolsa') tableGenerarBolsa!: GenerarBolsaTableComponent;
  @ViewChild('modificarBolsaForm') modificarBolsaForm!: ModificarBolsaFormComponent;
  @ViewChild('imprimirModal') imprimirModal!: ImprimirModalComponent;
  formatField = new FormatFieldPipe();

  private subscriptions: Subscription = new Subscription();

  constructor(private generarBolsaService: GenerarBolsaService,
    private bolsaState: BolsaState,
    private cdr: ChangeDetectorRef,
    private mensajeSwal: MensajesSwalService,
    private storage: LocaleUtil,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getItemCombos();
  }

  ngAfterViewInit(): void {
    this.subscriptions.add(
      this.formGenerarBolsa.almacen.valueChanges
        .pipe(
          distinctUntilChanged(),
          switchMap((value) =>
            this.generarBolsaService.getTipoMovimiento(value.codAlmacen)
          )
        )
        .subscribe((response) => {
          this.formGenerarBolsa.tiposDeMovimiento = response;
        })
    );

    this.subscriptions.add(
      this.formGenerarBolsa.filtro.valueChanges
        .pipe(
          distinctUntilChanged())
        .subscribe((response) => {
          this.formGenerarBolsa.changeFiltro(response);
          const fecha = new Date();
          this.formGenerarBolsa.fechaInicio.setValue(this.formatField.formatFecha(fecha, FORMATO_FECHA_yyyyMMdd));
          this.formGenerarBolsa.fechaFin.setValue(this.formatField.formatFecha(fecha, FORMATO_FECHA_yyyyMMdd));
        })
    );
  }

  getItemCombos(): void {
    forkJoin([
      this.generarBolsaService.getAlmacen(),
      this.generarBolsaService.getFiltro(),
      this.generarBolsaService.getTipoMovimiento(),
    ]).subscribe((response) => {
      if (response) {
        this.formGenerarBolsa.almacenes = response[0];
        this.formGenerarBolsa.filtros = response[1];
        this.formGenerarBolsa.tiposDeMovimiento = response[2];

        this.bolsaState.setAlmacenes(response[0]);
        const filtroDefault = this.formGenerarBolsa.filtros[0] as IFiltro;
        const tipoDeMovimientoDefault = this.formGenerarBolsa
          .tiposDeMovimiento[0] as ITipoMovimientoResponse;
        this.formGenerarBolsa.filtro.setValue(filtroDefault);
        this.formGenerarBolsa.opcion = filtroDefault.opcion;
        this.formGenerarBolsa.tipoDeMovimiento.setValue(
          tipoDeMovimientoDefault
        );
        this.formGenerarBolsa.filtroSeleccionado = filtroDefault.nomFiltro;
        this.formGenerarBolsa.isCargado = true;
        this.preload();
      }
    });
  }


  preload(): void {
    const bolsa = this.storage.getItem(STORAGE.bolsa);
    if (bolsa) {
      this.formGenerarBolsa.form.patchValue(bolsa);
      this.buscarBolsa();
    }
  }

  buscarBolsa(): void {
    this.tableGenerarBolsa.loading = true;
    const {
      almacen,
      preDespacho,
      ordenCorte,
      fechaInicio,
      fechaFin,
      soloDespacho,
      tipoDeMovimiento,
    } = this.formGenerarBolsa.form.getRawValue();
    const opcion = this.formGenerarBolsa.filtro.value as IFiltro;
    let requestSuggested: any;
    switch (opcion.nomFiltro) {
      case TipoFiltro.Fechas:
        requestSuggested = {
          fec_inicio: this.formatField.formatFecha(fechaInicio, FORMATO_FECHA_yyyyMMdd2),
          fec_fin: this.formatField.formatFecha(fechaFin, FORMATO_FECHA_yyyyMMdd2)
        }
        break;

      case TipoFiltro.Despacho:
        requestSuggested = {
          id_Pre_Desp: preDespacho,
        };
        break;

      case TipoFiltro.Movimiento:
        requestSuggested = {
          id_Tip_Mov: tipoDeMovimiento.id_Tip_Mov,
        };
        break;

      case TipoFiltro.Orden:
        requestSuggested = {
          co_CodOrdPro: ordenCorte,
        };
        break;

      default:
        break;
    }
    const request: IBandejaRequest = {
      opcion: opcion.opcion,
      cod_Almacen: almacen.codAlmacen,
      isSoloPendienteDespacho: soloDespacho,
      id_Req_Avios_Acabados: '',
      ...requestSuggested,
    };

    this.generarBolsaService.getBuscarBolsa(request).subscribe((response) => {
      const { almacen, filtro, ordenCorte, preDespacho, tipoDeMovimiento, soloDespacho, fechaInicio } = this.formGenerarBolsa.form.getRawValue()
      this.storage.setItem(STORAGE.bolsa, {
        almacen,
        filtro,
        ordenCorte,
        preDespacho,
        tipoDeMovimiento,
        fechaInicio: this.formatField.formatFecha(fechaInicio, FORMATO_FECHA_yyyyMMdd),
        fechaFin: this.formatField.formatFecha(fechaFin, FORMATO_FECHA_yyyyMMdd),
        soloDespacho
      });
      this.tableGenerarBolsa.isMostrarTabla = true;
      this.tableGenerarBolsa.loading = false;
      this.tableGenerarBolsa.items = response;
    });
  }

  modificarItem(data): void {
    this.modificarBolsaForm.data = data;
    this.modificarBolsaForm.almacenSelect = this.formGenerarBolsa.almacen.value;
    this.modificarBolsaForm.isOpenModal = true;
    this.cdr.detectChanges();
    this.modificarBolsaForm.loadBolsaForm();
  }

  guardarActualizado(): void {
    const { tipoDeMovimiento, ordenCorte, requerimiento, observacion, almacen, idPreDesp } = this.modificarBolsaForm.form.getRawValue();
    const request: IPreDespachoRequest = {
      opcion: Opcion.Actualizar,
      cod_Almacen: almacen.codAlmacen,
      id_Pre_Desp: idPreDesp,
      id_Tip_Mov: tipoDeMovimiento.id_Tip_Mov,
      observaciones: observacion,
      co_Cod_OrdPro: ordenCorte,
      id_Req_Avios_Acabados: requerimiento?.id_Req_Avios_Acabados
    }

    this.mensajeSwal.mensajePregunta('¿Estás seguro de actualizar?').then(
      response => {
        if (response.isConfirmed) {
          this.generarBolsaService.putUpdatePreDespacho(request).subscribe(() => {
            this.mensajeSwal.mensajeActualizadoSatisfactorio();
            this.modificarBolsaForm.closeModal();
            this.buscarBolsa();
          });
        }
      });

  }

  eliminarItem(data): void {
    const request: IPreDespachoDeleteRequest = {
      opcion: Opcion.Delete,
      id_Pre_Desp: data.id_Pre_Desp,
    }

    this.mensajeSwal.mensajePregunta('¿Estás seguro de eliminar?').then(
      response => {
        if (response.isConfirmed) {
          this.generarBolsaService.deletePreDespacho(request).subscribe(() => {
            this.mensajeSwal.mensajeRegistroEliminado();
            this.buscarBolsa();
          });
        }
      });
  }

  imprimirItem(data): void {
    this.imprimirModal.isOpenModal = true;
    this.imprimirModal.data = data;
  }

  detalleItem(data): void {
    if (data.id_Pre_Desp) {
      this.storage.setItem(STORAGE.detallePreDespachoId, data.id_Pre_Desp);
    }
    this.router.navigateByUrl('/generar-bolsa/verDetalle')
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
