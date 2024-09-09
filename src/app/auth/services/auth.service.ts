import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IAuthRequest, IAuthResponse } from '../interfaces/auth';
import { Endpoint } from 'src/app/global';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URLApi: string = environment.URLApi;
  private _auth: IAuthResponse;

  constructor(private http: HttpClient, private router: Router) { }

  login(header: IAuthRequest): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${this.URLApi}${Endpoint.Login}`, header)
      .pipe(
        tap((response: IAuthResponse) => {
          if (!this.auth) {
            this._auth = response;
            if (response.codUsuario != localStorage.getItem('codUsuario')) {
              localStorage.clear();
            }
          }
        }),
        tap(() => {
          localStorage.setItem('usuario', JSON.stringify(this._auth));
          localStorage.setItem('codUsuario', this._auth.codUsuario);
        }),
      );
  }

  get auth(): IAuthResponse {
    return this._auth ? { ...this._auth } : JSON.parse(localStorage.getItem('usuario')!);
  }

  logout(): void {
    this._auth = null;
    this.router.navigate(['/']);
    localStorage.clear();

  }

  verificarAuth(): Observable<boolean> {
    if (!this.auth) {
      return of(false);
    }
    return of(true);
  }
}
