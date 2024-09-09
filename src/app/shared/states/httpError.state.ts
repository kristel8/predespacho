import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpErrorState {
  private mensajeError$: BehaviorSubject<string>;

  constructor() {
    this.mensajeError$ = new BehaviorSubject<string>('');
  }

  setMensajeError(codigo: string): void {
    this.mensajeError$.next(codigo);
  }

  getMensajeError(): Observable<string> {
    return this.mensajeError$;
  }
}
