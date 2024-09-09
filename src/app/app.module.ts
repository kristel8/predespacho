import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ModulesModule } from './modules/modules.module';
import { SharedModule } from './shared/shared.module';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { BrowserModule } from '@angular/platform-browser';
import { PrimeNGConfig } from 'primeng/api';

registerLocaleData(localeEs);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ModulesModule,
    AuthModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    PrimeNGConfig,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
