import jwt_decode from 'jwt-decode';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  isValidToken<T>(token: string): boolean {
    try {
      jwt_decode<T>(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  isTokenExpired(token: string): boolean {
    const currentTime = Math.floor((new Date).getTime() / 1000);
    const tokenExpirationTime = (JSON.parse(atob(token.split('.')[1]))).exp;
    return currentTime >= tokenExpirationTime;
  }

  getTokenData<T>(token: string): T {
    return jwt_decode<T>(token);
  }
}
