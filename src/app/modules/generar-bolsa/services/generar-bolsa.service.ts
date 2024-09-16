import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthUtils, EMPTY_VALUE, Endpoint, FORMATO_FECHA_yyyyMMdd2 } from 'src/app/global';
import { LocaleUtil } from 'src/app/global/locale.utils';
import { FormatFieldPipe } from 'src/app/shared/format-field.pipe';
import { IAlmacenResponse } from 'src/app/shared/interfaces/almacen.interface';
import { IBandejaRequest, IBandejaResponse } from 'src/app/shared/interfaces/bandeja.interface';
import { IDetalleDetallePreDespachoRequest, IDetalleDetallePreDespachoResponse, IDetallePreDespachoDeleteRequest } from 'src/app/shared/interfaces/detalle-detalle.interface';
import { IDetallePreDespachoRequest, IGenerateDetalleRequest } from 'src/app/shared/interfaces/detalle-pre-despacho.interface';
import { IFiltro } from 'src/app/shared/interfaces/filtro.interface';
import { IImpresionRequest, IImpresorasResponse } from 'src/app/shared/interfaces/impresion.interface';
import { IAtributoPaqueteResponse, IPartirRequest } from 'src/app/shared/interfaces/partir-producto.interface';
import { IPreDespachoDeleteRequest, IPreDespachoRequest } from 'src/app/shared/interfaces/pre-despacho.interface';
import { IRequerimientoResponse } from 'src/app/shared/interfaces/requerimientos.interface';
import { ITipoMovimientoResponse } from 'src/app/shared/interfaces/tipo-movimiento.interface';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GenerarBolsaService {

  URLApi: string = environment.URLApi;
  userRequest: IUser;
  formatField = new FormatFieldPipe();

  constructor(private httpClient: HttpClient, private authUtil: AuthUtils, private storage: LocaleUtil) {
    this.userRequest = {
      cod_estacion: EMPTY_VALUE,
      cod_usuario: authUtil.codUsuario.trim()
    }
  }

  getAlmacen(codAlmacen: string = EMPTY_VALUE): Observable<IAlmacenResponse[]> {
    let params = new HttpParams();

    params = params.append('cod_estacion', this.userRequest.cod_estacion);
    params = params.append('cod_usuario', this.userRequest.cod_usuario);
    params = params.append('cod_almacen', codAlmacen);

    return this.httpClient.get<IAlmacenResponse[]>(`${this.URLApi}${Endpoint.GetAlmacen}`, { params });
  }

  getTipoMovimiento(codAlmacen: string = EMPTY_VALUE): Observable<ITipoMovimientoResponse[]> {

    let params = new HttpParams();

    params = params.append('cod_estacion', this.userRequest.cod_estacion);
    params = params.append('cod_usuario', this.userRequest.cod_usuario);
    params = params.append('cod_almacen', codAlmacen);

    return this.httpClient.get<ITipoMovimientoResponse[]>(`${this.URLApi}${Endpoint.GetTipoMovimiento}`, { params });
  }

  getFiltro(): Observable<IFiltro[]> {
    return of([
      {
        opcion: '3',
        nomFiltro: 'Por orden de corte',
      },
      {
        opcion: '1',
        nomFiltro: 'Por rango de fechas',
      },
      {
        opcion: '2',
        nomFiltro: 'Por tipo de movimiento',
      },
      {
        opcion: '5',
        nomFiltro: 'Por pre despacho',
      },
    ]);
  }

  getRequerimientoPorOC(codigo: string): Observable<IRequerimientoResponse[]> {
    let params = new HttpParams();

    params = params.append('co_Cod_OrdPro', codigo);

    return this.httpClient.get<IRequerimientoResponse[]>(`${this.URLApi}${Endpoint.GetReqAcabadosDesdeOC}`, { params });
  }

  getBuscarBolsa(request: IBandejaRequest): Observable<IBandejaResponse[]> {
    let params = new HttpParams();

    params = params.append('cod_estacion', this.userRequest.cod_estacion);
    params = params.append('cod_usuario', this.userRequest.cod_usuario);

    Object.entries(request).forEach(([key, value]) => {
      if (value !== EMPTY_VALUE) params = params.append(key, value);
    });

    return this.httpClient.get<IBandejaResponse[]>(`${this.URLApi}${Endpoint.GetBandeja}`, { params }).pipe(
      map((response: IBandejaResponse[]) => {
        return response.map(item => {
          item.fec_Creacion = this.formatField.formatDate(item.fec_Creacion, FORMATO_FECHA_yyyyMMdd2);
          return item;
        });
      }));
  }

  /** Servicios Acciones PreDespacho */
  putUpdatePreDespacho(data: IPreDespachoRequest): Observable<any> {
    const request: IPreDespachoRequest = {
      ...data,
      ...this.userRequest
    }

    return this.httpClient.post<any>(`${this.URLApi}${Endpoint.UpdatePreDespacho}`, request);
  }

  deletePreDespacho(data: IPreDespachoDeleteRequest): Observable<any> {
    const request: IPreDespachoDeleteRequest = {
      ...data,
      ...this.userRequest
    }

    return this.httpClient.post<any>(`${this.URLApi}${Endpoint.DeletePreDespacho}`, request);
  }

  getImpresoras(): Observable<IImpresorasResponse[]> {
    return this.httpClient.get<IImpresorasResponse[]>(`${this.URLApi}${Endpoint.GetImpresoras}`);
  }

  getImpresion(data: IImpresionRequest): Observable<any> {
    let params = new HttpParams();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== EMPTY_VALUE) params = params.append(key, value);
    });

    return this.httpClient.get<any>(`${this.URLApi}${Endpoint.GetImpresion}`, { params });
  }

  /** Servicios de Predespacho */
  postCrearBolsa(data: IPreDespachoRequest): Observable<number> {
    const request: IPreDespachoRequest = {
      ...data,
      ...this.userRequest
    }

    return this.httpClient.post<number>(`${this.URLApi}${Endpoint.GeneratePreDespacho}`, request);
  }

  postAñadirProducto(data: IGenerateDetalleRequest): Observable<number> {
    const request: IGenerateDetalleRequest = {
      ...data,
      ...this.userRequest
    }

    return this.httpClient.post<number>(`${this.URLApi}${Endpoint.GenerateDetalle}`, request);
  }

  /** PARTIR  */
  postPartirProducto(data: IPartirRequest): Observable<number> {
    const request: IPartirRequest = {
      ...data,
      ...this.userRequest
    }

    return this.httpClient.post<number>(`${this.URLApi}${Endpoint.Partir}`, request);
  }

  getAtributos(id: number): Observable<IAtributoPaqueteResponse> {
    let params = new HttpParams();
    params = params.append('id', id);

    return this.httpClient.get<IAtributoPaqueteResponse>(`${this.URLApi}${Endpoint.GetAtributos}`, { params })
    .pipe(map((response) => response[0]));
  }

  /** Servicios detalle */

  getDetalleBolsa(request: IDetallePreDespachoRequest): Observable<any[]> {
    let params = new HttpParams();

    params = params.append('cod_estacion', this.userRequest.cod_estacion);
    params = params.append('cod_usuario', this.userRequest.cod_usuario);

    Object.entries(request).forEach(([key, value]) => {
      if (value !== EMPTY_VALUE) params = params.append(key, value);
    });

    return this.httpClient.get<any>(`${this.URLApi}${Endpoint.GetRequerido}`, { params })
      .pipe(
        map((response: any[]) => response.map((item, index) => ({ ...item, index })))
      );
  }

  deleteDetalle(data: IDetallePreDespachoDeleteRequest): Observable<any> {
    const request: IDetallePreDespachoDeleteRequest = {
      ...data,
      ...this.userRequest
    }

    return this.httpClient.post<any>(`${this.URLApi}${Endpoint.DeleteDetalle}`, request);
  }

  getDetalleProducto(request: IDetalleDetallePreDespachoRequest): Observable<IDetalleDetallePreDespachoResponse[]> {
    let params = new HttpParams();

    params = params.append('cod_estacion', this.userRequest.cod_estacion);
    params = params.append('cod_usuario', this.userRequest.cod_usuario);

    Object.entries(request).forEach(([key, value]) => {
      if (value !== EMPTY_VALUE) params = params.append(key, value);
    });

    return this.httpClient.get<IDetalleDetallePreDespachoResponse[]>(`${this.URLApi}${Endpoint.GetDetalle}`, { params }).pipe(
      map((response: IDetalleDetallePreDespachoResponse[]) => {
        return response.map(item => {
          item.fec_Asigna_Pre_Desp = this.formatField.formatDate(item.fec_Asigna_Pre_Desp, FORMATO_FECHA_yyyyMMdd2);
          return item;
        });
      }));;
  }

}
