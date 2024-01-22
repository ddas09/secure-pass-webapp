import { Injectable } from '@angular/core';
import generator from 'generate-password-ts';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor() { }

  generatePassword(): string {
    return generator.generate({
      length: 16,
      symbols: true,
      numbers: true,
      uppercase: true,
      lowercase: true
    });
  }

}
