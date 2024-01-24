import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  getValue(key: string): any {
    return JSON.parse(sessionStorage.getItem(key) as string);
  }

  setValue(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  
  removeValue(key: string): void {
    sessionStorage.removeItem(key);
  }

  clearStorage(): void {
    sessionStorage.clear();
  }
}
