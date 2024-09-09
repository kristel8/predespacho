import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IAuthRequest } from '../../interfaces/auth';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
})
export class FormLoginComponent implements OnInit {
  @Output() authLogin = new EventEmitter<IAuthRequest>();
  loading: boolean;
  error: boolean;
  iconEye: string = 'pi pi-eye';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm.reset();
  }

  loginForm = this.fb.group({
    codUsuario: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  get codUsuario() {
    return this.loginForm.get('codUsuario');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    const params = this.loginForm.value;
    this.authLogin.emit(params);
  }

  reset() {
    this.loginForm.reset();
  }

  viewPassword(input) {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.iconEye = input.type === 'password' ? 'pi pi-eye' : 'pi pi-eye-slash';
  }
}
