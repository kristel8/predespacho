import {Component} from '@angular/core';
import { AuthUtils } from 'src/app/global/auth.utils';

@Component({
    selector: 'app-inline-profile',
    template: `
        <div class="profile">
            <a href="/#/dashboard">
                <img class="profile-image" src="assets/img/user/user.svg" />
                <div>
                    <span class="profile-name">{{nomUsuario}}</span>
                    <span style="color: white;">{{codUsuario}}</span>
                </div>
            </a>
        </div>
    `,
})
export class AppProfileComponent {
  nomUsuario: string;
  codUsuario: string;

  constructor(private authUtils: AuthUtils) {
    this.nomUsuario = authUtils.nomUsuario;
    this.codUsuario = authUtils.codUsuario;
  }
}
