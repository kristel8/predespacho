import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ITipoMovimientoResponse } from "../interfaces/tipo-movimiento.interface";
import { IAlmacenResponse } from "../interfaces/almacen.interface";

@Injectable({
  providedIn: 'root'
})
export class BolsaState {
  readonly almacenes$: BehaviorSubject<any[]>;
  readonly movimientos$: BehaviorSubject<any[]>;
  readonly opcion$: BehaviorSubject<string>;

  constructor() {
    this.movimientos$ = new BehaviorSubject<any[]>([]);
    this.almacenes$ = new BehaviorSubject<any[]>([]);
    this.opcion$ = new BehaviorSubject<string>(null);
  }

  setMovimientos(lista: any[]): void {
    this.movimientos$.next(lista);
  }

  get movimientos(): ITipoMovimientoResponse[] {
    return this.movimientos$.getValue() as ITipoMovimientoResponse[];
  }

  setAlmacenes(lista: any[]): void {
    this.almacenes$.next(lista);
  }

  get almacenes(): IAlmacenResponse[] {
    return this.almacenes$.getValue() as IAlmacenResponse[];
  }

  setOpcion(codigo: string): void {
    this.opcion$.next(codigo);
  }

  getOpcion(): Observable<string> {
    return this.opcion$.asObservable();
  }
}
