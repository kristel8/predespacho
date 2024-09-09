import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-footer',
  template: `
    <div class="layout-footer">
      <span class="footer-text-left"> <b>AUTOR:</b> GENESYS DATA S.A.C </span>
      <span class="footer-text-right"> VERSIÓN 1.0.0 </span>
    </div>
  `,
})
export class AppFooterComponent {
  constructor(public app: AppComponent) {}
}
