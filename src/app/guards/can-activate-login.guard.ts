import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AppConstants } from '../constants/app.constants';
import { AccountService } from '../services/account/account.service';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { NotificationService } from '../services/notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateLoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private accountService: AccountService,
    private notificationService: NotificationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    if (!this.accountService.isLogin()) {
      return true;
    } else {
      this.notificationService.Info(AppConstants.notificationMessages.loggedIn);
      this.router.navigate([AppConstants.navigationUrls.vault]);
      return false;
    }
  }
}
