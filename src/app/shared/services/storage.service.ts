import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setItemStorage(nombreItem: string, valorItem?: string, json?: any): void {
    if(valorItem) {
      localStorage.setItem(nombreItem, valorItem);
    } else {
      localStorage.setItem(nombreItem, JSON.stringify(json));
    }
  }

  getItemStorage(nombreItem: string): string {
    return localStorage.getItem(nombreItem);
  }

  removeItemStorage(nombreItem: string): void {
    localStorage.removeItem(nombreItem);
}
}
