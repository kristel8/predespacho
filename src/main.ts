import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es'; // Importar locale español

if (environment.production) {
  enableProdMode();
}

registerLocaleData(localeEs, 'es'); // Registrar el locale español
// Cambiar 'en-US' por 'es'
platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [{ provide: LOCALE_ID, useValue: 'es' }] // Proveedor del locale
}).catch(err => console.error(err));
