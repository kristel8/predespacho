import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription, of } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ITipoMovimientoResponse } from 'src/app/shared/interfaces/tipo-movimiento.interface';
import { GenerarBolsaService } from '../../services/generar-bolsa.service';
import { IAlmacenResponse } from 'src/app/shared/interfaces/almacen.interface';
import { BolsaState } from 'src/app/shared/states/bolsa.state';
import { IBandejaResponse } from 'src/app/shared/interfaces/bandeja.interface';

@Component({
  selector: 'app-modificar-bolsa-form',
  templateUrl: './modificar-bolsa-form.component.html',
  styleUrls: ['./modificar-bolsa-form.component.scss'],
})
export class ModificarBolsaFormComponent implements OnInit {
  isOrdenCorte = false;
  isAcabado = false;
  isOpenModal = false;

  almacenSelect: any;
  data: IBandejaResponse;
  titulo: string;

  requerimientos: any[] = [];
  almacenes: IAlmacenResponse[] = [];
  tiposDeMovimiento: ITipoMovimientoResponse[] = [];

  private subscriptions: Subscription = new Subscription();

  @Output() volver = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<void>();
  @Output() finalizar = new EventEmitter<null>();

  form = this.fb.group({
    idPreDesp: [null],
    almacen: [null, Validators.required],
    tipoDeMovimiento: [null, Validators.required],
    ordenCorte: [null],
    requerimiento: [null],
    observacion: [null],
  });

  get almacen() {
    return this.form.get('almacen');
  }

  get tipoDeMovimiento() {
    return this.form.get('tipoDeMovimiento');
  }

  get ordenCorte() {
    return this.form.get('ordenCorte');
  }

  get requerimiento() {
    return this.form.get('requerimiento');
  }

  get observacion() {
    return this.form.get('observacion');
  }

  constructor(
    private generarBolsaService: GenerarBolsaService,
    private bolsaState: BolsaState,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getAlmacen();
    this.subscriptions.add(
      this.almacen.valueChanges
        .pipe(distinctUntilChanged())
        .subscribe((response) => {
          if (response) {
            this.generarBolsaService.getTipoMovimiento(response.codAlmacen).subscribe((response) => {
              this.tiposDeMovimiento = response;
              this.bolsaState.setMovimientos(response);
              this.loadBolsaForm();
            });
          }
        })
    );

    this.subscriptions.add(
      this.tipoDeMovimiento.valueChanges
        .pipe(distinctUntilChanged())
        .subscribe((response: ITipoMovimientoResponse) => {
          if (response) {
            const { flg_Solicita_Orden_Corte, flg_Solicita_Orden_Corte_Opcional, flg_Evalua_Req_Acabado } = response;
            this.isOrdenCorte = flg_Solicita_Orden_Corte || flg_Solicita_Orden_Corte_Opcional;
            this.isAcabado = flg_Evalua_Req_Acabado;
            this.ordenCorte.reset();
            this.observacion.reset();
            this.requerimiento.reset();

            this.ordenCorte.addValidators(Validators.required);
            this.requerimiento.addValidators(Validators.required);

            if (flg_Solicita_Orden_Corte_Opcional || !flg_Solicita_Orden_Corte) {
              this.ordenCorte.removeValidators(Validators.required);
              this.ordenCorte.updateValueAndValidity();
            }

            if (!flg_Evalua_Req_Acabado) {
              this.requerimiento.removeValidators(Validators.required);
              this.requerimiento.updateValueAndValidity();
            }

            this.form.markAsUntouched();
          }
        })
    );

    this.subscriptions.add(
      this.ordenCorte.valueChanges
        .pipe(
          distinctUntilChanged(),
          switchMap((value) =>
            value && value.length > 2 && this.isAcabado ? this.generarBolsaService.getRequerimientoPorOC(value) : of([])
          )
        )
        .subscribe((response) => {
          if (response.length) {
            this.requerimientos = response;
            this.requerimiento.markAsUntouched();
          } else {
            this.requerimiento.markAsTouched();
            this.requerimientos = response;
          }
        })
    );
  }

  loadBolsaForm(): void {
    if (this.data) {
      const { co_CodOrdPro, id_Tip_Mov, observaciones, id_Pre_Desp, isTieneBarrasAsociadas } = this.data;
      const almacenSelected = this.bolsaState.almacenes.find(item => item.codAlmacen === this.almacenSelect.codAlmacen);
      const movimientoSelected = this.bolsaState.movimientos.find(item => item.id_Tip_Mov === id_Tip_Mov);
      this.form.patchValue({
        idPreDesp: id_Pre_Desp,
        almacen: almacenSelected,
        tipoDeMovimiento: movimientoSelected,
        ordenCorte: co_CodOrdPro,
        requerimiento: null,
        observacion: observaciones
      })

      if (isTieneBarrasAsociadas) {
        this.form.disable();
        this.observacion.enable();
      } else {
        this.form.enable();
      }

      this.almacen.disable();
    }
  }

  getAlmacen(): void {
    this.bolsaState.almacenes$.subscribe((response) => {
      this.almacenes = response;
    });
  }

  guardarActualizado(): void {
    this.guardar.emit();
  }

  regresar(): void {
    this.volver.emit();
  }

  closeModal() {
    this.isOpenModal = false;
  }
}
