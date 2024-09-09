import {Component, OnInit} from '@angular/core';
import { STORAGE } from 'src/app/global';

@Component({
    selector: 'app-menu',
    template: `
    <ul class="layout-menu layout-main-menu clearfix">
        <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true" (click)="removeStorage()"></li>
    </ul>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    ngOnInit() {
        this.model = [
            {
                label: 'INICIO', icon: 'pi pi-fw pi-home',
                items: [
                    {label: 'Principal', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard']}
                ]
            },
            {
                label: 'MENU', icon: 'pi pi-fw pi-star',
                items: [
                    {label: 'Generar bolsa', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/generar-bolsa']}
                ]
            }
        ];
    }

    removeStorage(): void {
      localStorage.removeItem(STORAGE.bolsa);
      localStorage.removeItem(STORAGE.detallePreDespachoId);
      localStorage.removeItem(STORAGE.añadidos);
      localStorage.removeItem(STORAGE.nuevaBolsa);
      localStorage.removeItem(STORAGE.seleccionadoDetalle);
    }
}
