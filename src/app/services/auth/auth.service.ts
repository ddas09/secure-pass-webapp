import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { TokenService } from '../token/token.service';
import { LoaderService } from '../loader/loader.service';
import { StorageService } from '../storage/storage.service';
import { AppConstants } from '../../constants/app.constants';
import { SignupTokenData } from '../../models/token-data.model';
import { CryptographyService } from '../cryptography/cryptography.service';
import { SignupUser, RegisteredUser, SigninUser } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private derivedKeyIterationCount = AppConstants.iterationCounts.derivedKey;
  private authenticationKeyIterationCount = AppConstants.iterationCounts.authenticationKey;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private tokenService: TokenService,
    private loaderService: LoaderService,
    private storageService: StorageService,
    private cryptographyService: CryptographyService,
  ) { }

  startSignup(email: string): void {
    this.loaderService.show(AppConstants.loaderMessages.signup);

    this.apiService.startSignup(email).subscribe(() => {
      this.loaderService.hide();
      this.router.navigate([AppConstants.navigationUrls.emailSent]);
    });
  }

  async createAccount(user: any, signupToken: string) {
    this.loaderService.show(AppConstants.loaderMessages.createAccount);

    let randomSalt: string = this.cryptographyService.getRandomSalt();
    let derivedKey: string = await this.cryptographyService.deriveKey(user.password, randomSalt, this.derivedKeyIterationCount);

    let tokenData: SignupTokenData = this.tokenService.getTokenData<SignupTokenData>(signupToken);
    let dataKey: string = this.cryptographyService.getRandomKey(tokenData.email);
    let { rsaPublicKey, rsaPrivateKey } = await this.cryptographyService.getRSAKeyPair();
    let authenticationKey: string = await this.cryptographyService.deriveKey(user.password, randomSalt, this.authenticationKeyIterationCount);

    let encryptedRsaPrivateKey = this.cryptographyService.encrypt(rsaPrivateKey, dataKey);
    let encryptedDataKey = this.cryptographyService.encrypt(dataKey, derivedKey);

    let signupUser: SignupUser = {
      userEmail: tokenData.email,
      randomSalt: randomSalt,
      lastName: user.lastName,
      signupToken: signupToken,
      firstName: user.firstName,
      dataKey: encryptedDataKey,
      rsaPublicKey: rsaPublicKey,
      authenticationKey: authenticationKey,
      rsaPrivateKey: encryptedRsaPrivateKey,
    };

    this.apiService.createAccount(signupUser).subscribe(() => {
      this.loaderService.hide();

      let registeredUser: RegisteredUser = {
        derivedKey: derivedKey,
        email: signupUser.userEmail,
        randomSalt: signupUser.randomSalt
      };

      this.storageService.setValue(AppConstants.registeredUser, registeredUser);
      this.router.navigate([AppConstants.navigationUrls.setRecovery]);
    })
  }

  async signIn(user: any) {
    this.loaderService.show(AppConstants.loaderMessages.signin);
    this.storageService.clearStorage();

    this.apiService.getUniqueSalt(user.email).subscribe(async (response: any) => {
      let uniqueSalt = response.data;
      let authenticationKey = await this.cryptographyService.deriveKey(user.password, uniqueSalt, this.authenticationKeyIterationCount);

      let signinUser: SigninUser = {
        userEmail: user.email,
        authenticationKey: authenticationKey
      };

      this.apiService.loginUser(signinUser).subscribe(async (response: any) => {
        this.loaderService.hide();

        let derivedKey = await this.cryptographyService.deriveKey(user.password, uniqueSalt, this.derivedKeyIterationCount);
        
        this.storageService.setValue(AppConstants.keys.derivedKey, derivedKey);
        this.storageService.setValue(AppConstants.tokens.accessToken, response.data.accessToken);
        this.storageService.setValue(AppConstants.tokens.refreshToken, response.data.refreshToken);

        this.router.navigate([AppConstants.navigationUrls.vault]);
      });
    });
  }

  logout(): void {
    this.apiService.logoutUser().subscribe(() => {
      this.storageService.clearStorage();
      this.router.navigate([AppConstants.navigationUrls.home]);
    });
  }

  requireSignIn(): void {
    this.storageService.clearStorage();
    this.router.navigate([AppConstants.navigationUrls.signin]);
  }

  isLogin(): boolean {
    return this.storageService.getValue(AppConstants.tokens.accessToken) ? true : false;
  }

}
