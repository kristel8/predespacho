import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {HttpClientModule} from '@angular/common/http';
import { AppMenuitemComponent } from './components/menu-items/app.menuitem.component';
import { AppMenuComponent } from './components/menu/app.menu.component';
import { AppFooterComponent } from './components/footer/app.footer.component';
import { AppProfileComponent } from './components/profile/app.profile.component';
import { AppMainComponent } from './components/main/app.main.component';
import { AppTopBarComponent } from './components/topbar/app.topbar.component';
import { MenuService } from './services/app.menu.service';
import { LoadingComponent } from './components/loading/loading.component';
import { SkeletonSearcherComponent } from './components/skeleton-searcher/skeleton-searcher.component';
import { SkeletonModule } from 'primeng/skeleton';
import { RouterModule } from '@angular/router';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';

@NgModule({
  declarations: [
    AppMenuitemComponent,
    AppMenuComponent,
    AppFooterComponent,
    AppProfileComponent,
    AppMainComponent,
    AppTopBarComponent,
    LoadingComponent,
    SkeletonSearcherComponent,
    NumbersOnlyDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ButtonModule,
    SkeletonModule
  ],
  exports: [
    AppMenuitemComponent,
    AppMenuComponent,
    AppFooterComponent,
    AppProfileComponent,
    AppTopBarComponent,
    LoadingComponent,
    SkeletonSearcherComponent,
    NumbersOnlyDirective
  ],
  providers: [
    MenuService
  ],
})
export class SharedModule { }
