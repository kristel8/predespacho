import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.verificarAuth().pipe(
      tap((isAutenticado: any) => {
        if (!isAutenticado) {
          this.router.navigate(['/']);
        }
      })
    );
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.verificarAuth();
  }
}
