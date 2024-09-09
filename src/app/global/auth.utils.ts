import { Injectable } from '@angular/core';
import { IAuthResponse } from '../auth/interfaces/auth';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthUtils {
  token: IAuthResponse;

  constructor(authService: AuthService) {
    this.token = authService.auth;
  }

  get logueado() {
    return this.token;
  }

  get codUsuario() {
    return this.token?.codUsuario;
  }

  get nomUsuario() {
    return this.token?.nomUsuario;
  }
}
