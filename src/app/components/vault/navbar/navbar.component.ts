import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../../../constants/app.constants';
import { DialogService } from '../../../services/dialog/dialog.service';
import { StorageService } from '../../../services/storage/storage.service';
import { CryptographyService } from '../../../services/cryptography/cryptography.service';
import { AccessTokenData } from '../../../models/token-data.model';
import { AccountService } from '../../../services/account/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  tokenData!: AccessTokenData;
  constructor(
    private dialogService: DialogService,
    private accountService: AccountService,
    private storageService: StorageService,
    private cryptographyService: CryptographyService
  ) {}

  ngOnInit(): void {
    let accessToken = this.storageService.getValue(
      AppConstants.tokens.accessToken
    );
    this.isUserLoggedIn = accessToken ? true : false;
    if (this.isUserLoggedIn)
      this.tokenData = this.cryptographyService.getDecryptedAccessToken();
  }

  async onLogoutButtonClick() {
    this.dialogService
      .getConfirmation(AppConstants.dialogMessages.logoutConfirmation)
      .subscribe((confirmation: boolean) => {
        if (confirmation) this.accountService.logout();
      });
  }
}
