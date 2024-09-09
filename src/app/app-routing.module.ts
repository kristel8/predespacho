import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from './auth/views/login/login.view';
import { AuthGuard } from './core/guards/auth.guard';
import { AppMainComponent } from './shared/components/main/app.main.component';

const routes: Routes = [
  {
    path: '', component: LoginViewComponent,
  },
  {
    path: '', component: AppMainComponent,
    children: [
      { path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
      },
      { path: 'generar-bolsa',
        loadChildren: () => import('./modules/generar-bolsa/generar-bolsa.module').then(m => m.GenerarBolsaModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
      },
    ]
  },
  {path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
