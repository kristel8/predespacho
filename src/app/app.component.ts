import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Constantes } from './global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  layoutMode = 'static';

  layoutColor = 'light';

  darkMenu = true;

  profileMode = 'inline';

  ripple = false;

  inputStyle = 'filled';

  currentUrl: string | null = null;

  constructor(private primeNGConfig: PrimeNGConfig) {
    this.primeNGConfig.setTranslation(Constantes.ES_CALENDARIO);
  }

  ngOnInit() {
  }
}
