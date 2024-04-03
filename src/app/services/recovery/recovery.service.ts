import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { RegisteredUser } from '../../models/user.model';
import { StorageService } from '../storage/storage.service';
import { AppConstants } from '../../constants/app.constants';
import { RecoverySetting } from '../../models/recovery.model';
import { RecoveryTokenData } from '../../models/token-data.model';
import { SharedDataService } from '../shared-data/shared-data.service';
import { CryptographyService } from '../cryptography/cryptography.service';
import {
  RecoveryRequest,
  RecoveryUserRequest,
  ResetPasswordRequest,
  SecurityQuestionRequest,
} from '../../models/request.model';
import { HttpClientService } from '../http-client/http-client.service';
import { SaltRequest } from '../../../app/models/salt-request.model';

@Injectable({
  providedIn: 'root',
})
export class RecoveryService {
  recoveryKeysIterationCount: number =
    AppConstants.iterationCounts.recoveryKeys;
  recoveryHashIterationCount: number =
    AppConstants.iterationCounts.recoveryHash;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private storageService: StorageService,
    private sharedDataService: SharedDataService,
    private httpClientService: HttpClientService,
    private cryptographyService: CryptographyService
  ) {}

  async setAccountRecovery(formValue: any) {
    let user: RegisteredUser = this.storageService.getValue(
      AppConstants.registeredUser
    );

    let emailGeneratedKey = await this.cryptographyService.deriveKey(
      user.email,
      user.randomSalt,
      this.recoveryKeysIterationCount
    );
    let securityAnswerGeneratedKey = await this.cryptographyService.deriveKey(
      formValue.securityAnswer,
      user.randomSalt,
      this.recoveryKeysIterationCount
    );

    let securityAnswerHash = await this.cryptographyService.deriveKey(
      formValue.securityAnswer,
      user.randomSalt,
      this.recoveryHashIterationCount
    );
    let encryptedSecurityQuestion = this.cryptographyService.encrypt(
      formValue.securityQuestion,
      emailGeneratedKey
    );
    let encryptedRecoveryKey = this.cryptographyService.encrypt(
      user.derivedKey,
      securityAnswerGeneratedKey
    );

    let recoverySetting: RecoverySetting = {
      userEmail: user.email,
      recoveryKey: encryptedRecoveryKey,
      securityAnswer: securityAnswerHash,
      securityQuestion: encryptedSecurityQuestion,
    };

    this.httpClientService
      .post(AppConstants.accountRecoveryEndpoints.setRecovery, recoverySetting)
      .subscribe(() => {
        this.storageService.clearStorage();
        this.router.navigate([AppConstants.navigationUrls.signin]);
      });
  }

  getSecurityQuestion(userEmail: string) {
    let payload: SaltRequest = {
      userEmail: userEmail,
    };
    this.httpClientService
      .post(AppConstants.accountEndpoints.getUniqueSalt, payload)
      .subscribe((saltResponse: any) => {
        let payload: SecurityQuestionRequest = { userEmail: userEmail };

        this.httpClientService
          .post(
            AppConstants.accountRecoveryEndpoints.getSecurityQuestion,
            payload
          )
          .subscribe(async (response: any) => {
            let emailGeneratedKey = await this.cryptographyService.deriveKey(
              userEmail,
              saltResponse.data,
              this.recoveryKeysIterationCount
            );
            let decryptedSecurityQuestion = this.cryptographyService.decrypt(
              response.data,
              emailGeneratedKey
            );
            this.sharedDataService.updateSecurityQuestion(
              decryptedSecurityQuestion
            );
            this.storageService.setValue(
              AppConstants.randomSalt,
              saltResponse.data
            );
          });
      });
  }

  async startRecovery(userEmail: string, securityAnswer: string) {
    let randomSalt = this.storageService.getValue(AppConstants.randomSalt);
    let securityAnswerHash = await this.cryptographyService.deriveKey(
      securityAnswer,
      randomSalt,
      this.recoveryHashIterationCount
    );

    let recoveryRequestData: RecoveryRequest = {
      userEmail: userEmail,
      securityAnswerHash: securityAnswerHash,
    };

    this.httpClientService
      .post(
        AppConstants.accountRecoveryEndpoints.startRecovery,
        recoveryRequestData
      )
      .subscribe(async (response: any) => {
        let securityAnswerGeneratedKey =
          await this.cryptographyService.deriveKey(
            securityAnswer,
            randomSalt,
            this.recoveryKeysIterationCount
          );

        this.storageService.setValue(
          AppConstants.keys.securityAnswerGeneratedKey,
          securityAnswerGeneratedKey
        );

        this.storageService.setValue(
          AppConstants.tokens.recoveryToken,
          response.data
        );

        this.router.navigate([AppConstants.navigationUrls.resetPassword]);
      });
  }

  async resetPassword(newPassword: string) {
    let recoveryToken = this.storageService.getValue(
      AppConstants.tokens.recoveryToken
    );
    let tokenData: RecoveryTokenData =
      this.tokenService.getTokenData<RecoveryTokenData>(recoveryToken);
    let payload: RecoveryUserRequest = { userEmail: tokenData.email };

    this.httpClientService
      .post(AppConstants.accountRecoveryEndpoints.getRecoveryUser, payload)
      .subscribe(async (response: any) => {
        // get required data from storage
        let randomSalt = this.storageService.getValue(AppConstants.randomSalt);
        let securityAnswerGeneratedKey = this.storageService.getValue(
          AppConstants.keys.securityAnswerGeneratedKey
        );

        // generating new keys for user
        let derivedKey = await this.cryptographyService.deriveKey(
          newPassword,
          randomSalt,
          AppConstants.iterationCounts.derivedKey
        );
        let authenticationKey = await this.cryptographyService.deriveKey(
          newPassword,
          randomSalt,
          AppConstants.iterationCounts.authenticationKey
        );

        // decrypt user keys
        let decryptedRecoveryKey = this.cryptographyService.decrypt(
          response.data.recoveryKey,
          securityAnswerGeneratedKey
        );
        let decryptedDataKey = this.cryptographyService.decrypt(
          response.data.dataKey,
          decryptedRecoveryKey
        );

        // encrypt user keys with new encryption keys
        let encryptedDataKey = this.cryptographyService.encrypt(
          decryptedDataKey,
          derivedKey
        );
        let encryptedRecoveryKey = this.cryptographyService.encrypt(
          derivedKey,
          securityAnswerGeneratedKey
        );

        let resetPasswordRequestData: ResetPasswordRequest = {
          userEmail: tokenData.email,
          dataKey: encryptedDataKey,
          recoveryToken: recoveryToken,
          recoveryKey: encryptedRecoveryKey,
          authenticationKey: authenticationKey,
        };

        this.httpClientService
          .post(
            AppConstants.accountRecoveryEndpoints.resetPassword,
            resetPasswordRequestData
          )
          .subscribe(() => {
            this.storageService.clearStorage();
            this.router.navigate([AppConstants.navigationUrls.signin]);
          });
      });
  }
}
