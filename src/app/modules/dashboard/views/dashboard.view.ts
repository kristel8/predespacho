import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthUtils } from 'src/app/global/auth.utils';
import { ICard, IResumen } from '../interfaces/dashboard.interface';
import { DashboardService } from '../services/dashboard.service';

@Component({
  templateUrl: './dashboard.view.html',
  styleUrls: ['./dashboard.view.scss']
})
export class DashboardViewComponent {
  detailCard: ICard[] = [];
  codUsuario: string;
  fecha: DatePipe = new DatePipe('en-US');
  constructor(
    private authUtils: AuthUtils) {

    this.codUsuario = this.authUtils.codUsuario;
  }
}

