import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  private screenSizeSubject = new BehaviorSubject<{ width: number, height: number }>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  screenSize$ = this.screenSizeSubject.asObservable();

  constructor(private ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('resize', this.onResize.bind(this));
    });
  }

  private onResize() {
    this.screenSizeSubject.next({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }
}
