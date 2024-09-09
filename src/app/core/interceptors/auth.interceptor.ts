import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HttpErrorState } from 'src/app/shared/states/httpError.state';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { IAuthResponse } from 'src/app/auth/interfaces/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private httpError: HttpErrorState, private mensajeSwal: MensajesSwalService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const usuario: IAuthResponse = JSON.parse(localStorage.getItem('usuario'));
    let request = req;

    if (usuario) {
      const token = usuario.token;
      if (token) {
        request = req.clone({
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Authorization': `Bearer ${token}`
          })
        });
      } else {
        request = req.clone({
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'GET, POST'
          })
        });
      }

    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err) {
          console.log(err);
          let status;
          let errorMessage = '';
          let message = '';

          if (err.error) {
            const { StatusCode, ErrorMessage, text } = err.error;
            status = StatusCode;
            errorMessage = ErrorMessage;
            message = text;
          } else {
            status = err.status;
          }


          if (err.message == "Timeout has occurred") {
            errorMessage = "Se ha agotado el tiempo de espera";
            this.mensajeSwal.mensajeAdvertencia(errorMessage);
          }

          switch (status) {
            case 401:
              errorMessage = 'La Sesión ha expirado. Ingrese sus credenciales Nuevamente';
              localStorage.removeItem('usuario');
              this.mensajeSwal.mensajeAdvertencia(errorMessage);
              setTimeout(() => {
                this.authService.logout();
              }, 1000);
              break;

            case 500:
              this.httpError.setMensajeError(errorMessage);
              this.mensajeSwal.mensajeAdvertencia(errorMessage);
              break;

            case 0:
              errorMessage = 'No hay Conexión con el Servidor Central. Intente Nuevamente';
              this.mensajeSwal.mensajeAdvertencia(errorMessage);
              break;

            default:
              this.mensajeSwal.mensajeAdvertencia(message);
              break;
          }
        }

        return throwError(err);
      })
    );
  }
}
