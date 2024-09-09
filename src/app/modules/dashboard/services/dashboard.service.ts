import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IResumen } from '../interfaces/dashboard.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  URLApi: string = environment.URLApi;

  constructor( private httpClient:HttpClient) { }

  getResumen(fecha: string, codUsuario: string):Observable<IResumen> {
    return this.httpClient.get<IResumen>(`${this.URLApi}TraPro/Resumen?Fecha=${fecha}&CodUsuario=${codUsuario}`);
  }
}
