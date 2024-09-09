import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AppMainComponent } from '../main/app.main.component';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { MensajesGlobales } from 'src/app/global/mensajes';

@Component({
  selector: 'app-topbar',
  template: `
    <div class="topbar clearfix">
      <div class="topbar-left">
        <img src="assets/img/logo/logo-tsc-short.svg" class="topbar-logo" />
      </div>

      <div class="topbar-right">
        <a
          id="menu-button"
          (click)="appMain.onMenuButtonClick($event)"
          [ngClass]="{ 'menu-button-rotate': appMain.rotateMenuButton }"
        >
          <i class="pi pi-angle-left"></i>
        </a>

        <a id="topbar-menu-button" (click)="signOut()">
          <i class="topbar-icon pi pi-sign-out"></i>
        </a>

        <ul
          class="topbar-items fadeInDown"
          [ngClass]="{ 'topbar-items-visible': appMain.topbarMenuActive }"
        >
          <li (click)="signOut()">
            <i class="topbar-icon pi pi-sign-out"></i>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class AppTopBarComponent {
  constructor(
    public app: AppComponent,
    public appMain: AppMainComponent,
    private authService: AuthService,
    private mensajeSwal: MensajesSwalService
  ) {}

  signOut(): void {
    this.mensajeSwal
      .mensajePregunta(MensajesGlobales._MENSAJE_PREGUNTA_LOGOUT)
      .then((response) => {
        if (response.isConfirmed) {
          this.authService.logout();

        }
      });
  }
}
