import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppConstants } from '../../constants/app.constants';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  private apiUrl = AppConstants.apiBaseUrl;

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }

  get<T>(endpoint: string, headers?: HttpHeaders): Observable<T> {
    return this.http
      .get<T>(`${this.apiUrl}/${endpoint}`, { headers })
      .pipe(catchError(this.handleError));
  }

  post<T>(endpoint: string, data: any, headers?: HttpHeaders): Observable<T> {
    return this.http
      .post<T>(`${this.apiUrl}/${endpoint}`, data, { headers })
      .pipe(catchError(this.handleError));
  }

  put<T>(endpoint: string, data: any, headers?: HttpHeaders): Observable<T> {
    return this.http
      .put<T>(`${this.apiUrl}/${endpoint}`, data, { headers })
      .pipe(catchError(this.handleError));
  }

  delete<T>(endpoint: string, headers?: HttpHeaders): Observable<T> {
    return this.http
      .delete<T>(`${this.apiUrl}/${endpoint}`, { headers })
      .pipe(catchError(this.handleError));
  }
}
