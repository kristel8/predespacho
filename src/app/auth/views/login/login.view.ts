import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';
import { FormLoginComponent } from '../../components/form-login/form-login.component';
import { IAuthRequest } from '../../interfaces/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.view.html',
  styleUrls: ['./login.view.scss'],
})
export class LoginViewComponent {
  @ViewChild('formLogin') formLogin!: FormLoginComponent;
  isLoading: boolean = false;
  constructor( private router: Router, private authService: AuthService) {
    const usuario = this.authService.auth;
    if(usuario) {
      this.router.navigate(['dashboard']);
    }
  }


  login(header: IAuthRequest):void {
    this.loadingError(true);
    this.router.navigate(['dashboard']);

    this.authService.login(header).subscribe(
      (res) => {
        if (res.token) {
          this.isLoading = true;
          setTimeout(() => {
            this.loadingError(false);
            this.router.navigate(['dashboard']);
            this.isLoading = false;
          }, 2500);
        }
      },
      () => {
        this.formLogin.reset();
        this.loadingError(false);
      }
    );
  }

  loadingError(state: boolean) {
    this.formLogin.loading = state;
  }
}
