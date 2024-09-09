import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocaleUtil {
  constructor() {
  }

  getItem(param: string) {
    return JSON.parse(localStorage.getItem(param));
  }

  setItem(title: string, param: any) {
    if( typeof param === 'string') {
      return localStorage.setItem(title, param);
    }

    return localStorage.setItem(title, JSON.stringify(param));
  }

  removeItem(param: string) {
    return localStorage.removeItem(param);
  }
}
