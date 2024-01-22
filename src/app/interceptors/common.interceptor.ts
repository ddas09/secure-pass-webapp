import { Injectable } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { AppConstants } from '../constants/app.constants';
import { AuthService } from '../services/auth/auth.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { LoaderService } from '../services/loader/loader.service';
import { StorageService } from '../services/storage/storage.service';
import { take, catchError, filter, switchMap, map } from 'rxjs/operators';
import { HttpInterceptor, HttpEvent, HttpResponse } from '@angular/common/http';
import { NotificationService } from '../services/notification/notification.service';
import { HTTP_INTERCEPTORS, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {
    private isRefreshingTokens: boolean = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        private loaderService: LoaderService,
        private storageService: StorageService,
        private notificationService: NotificationService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.handler(this.setAuthorizationHeader(request), next);
    }

    setAuthorizationHeader(request: HttpRequest<any>) {
        let accessToken = this.storageService.getValue(AppConstants.tokens.accessToken);
        if (accessToken)
            return request.clone({
                setHeaders: { 'Authorization': `Bearer ${accessToken}` }
            });

        return request;
    }

    handler(request: HttpRequest<any>, next: HttpHandler) {
        return next.handle(request)
            .pipe(
                map((respone: any) => {
                    if (respone instanceof HttpResponse && respone.body.message)
                        this.notificationService.success(respone.body.message);

                    return respone;
                }),
                catchError((error: HttpErrorResponse) => {
                    console.log(error);
                    this.loaderService.hide();
                    
                    switch (error.error.status) {
                        case AppConstants.responseStatuses.invalidAccessToken:
                            return this.handleAccessTokenExpiration(request, next);

                        case AppConstants.responseStatuses.invalidRefreshToken:
                            this.isRefreshingTokens = false;
                            return this.requireSignIn(error);

                        case AppConstants.responseStatuses.tokenRequired:
                            return this.requireSignIn(error);
                    }

                    if (error.error.message)
                        this.notificationService.error(error.error.message);

                    return throwError(error);
                })
            );
    }

    handleAccessTokenExpiration(failedRequest: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshingTokens) {
            this.isRefreshingTokens = true;
            this.refreshTokenSubject.next(null);

            const refreshToken = this.storageService.getValue(AppConstants.tokens.refreshToken);
            return this.apiService.refreshTokens(refreshToken).pipe(
                switchMap((response: any) => {
                    this.isRefreshingTokens = false;

                    this.storageService.setValue(AppConstants.tokens.accessToken, response.data.accessToken);
                    this.storageService.setValue(AppConstants.tokens.refreshToken, response.data.refreshToken);

                    return next.handle(this.setAuthorizationHeader(failedRequest));
                })
            );
        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token !== null),
                take(1),
                switchMap(() => next.handle(this.setAuthorizationHeader(failedRequest)))
            );
        }
    }

    requireSignIn(error: HttpErrorResponse) {
        this.authService.requireSignIn();
        this.notificationService.Info(AppConstants.notificationMessages.signinRequired);
        return throwError(error);
    }
}

export const CommonInterceptorProvider = [{
    provide: HTTP_INTERCEPTORS,
    useClass: CommonInterceptor,
    multi: true
}];
