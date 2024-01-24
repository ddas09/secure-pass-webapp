import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../../constants/app.constants';
import { SaltRequest } from '../../models/salt-request.model';
import { RecoverySetting } from '../../models/recovery.model';
import { SigninUser, SignupUser } from '../../models/user.model';
import {
  VaultRecord,
  SharedRecord,
  UpdatedRecord,
  NewRecord,
} from '../../models/record.model';
import {
  AccountExistenceRequest,
  RecipientRequest,
  RecoveryRequest,
  RecoveryUserRequest,
} from '../../models/request.model';
import {
  ResetPasswordRequest,
  SecurityQuestionRequest,
  SignupRequest,
  SsoRequest,
} from '../../models/request.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  startSignup(userEmail: string) {
    let payload: SignupRequest = { userEmail: userEmail };
    return this.httpClient.post(AppConstants.accountUrls.startSignup, payload);
  }

  checkAccountExistence(userEmail: string) {
    let payload: AccountExistenceRequest = { userEmail: userEmail };
    return this.httpClient.post(
      AppConstants.accountUrls.checkExistence,
      payload
    );
  }

  createAccount(user: SignupUser) {
    return this.httpClient.post(AppConstants.accountUrls.createAccount, user);
  }

  getUniqueSalt(userEmail: string) {
    const endpointUrl = AppConstants.accountUrls.getUniqueSalt;
    let requestPayload: SaltRequest = {
      userEmail: userEmail,
    };
    return this.httpClient.post(endpointUrl, requestPayload);
  }

  loginUser(user: SigninUser) {
    const endpointUrl = AppConstants.accountUrls.login;
    return this.httpClient.post(endpointUrl, user);
  }

  refreshTokens(refreshToken: string) {
    const endpointUrl = AppConstants.accountUrls.tokenRefresh;
    const requestPayload = { refreshToken: refreshToken };
    return this.httpClient.post(endpointUrl, requestPayload);
  }

  logoutUser() {
    const endpointUrl = AppConstants.accountUrls.logout;
    return this.httpClient.get(endpointUrl);
  }

  // methods for performing CRUD on vault records
  getVaultRecords() {
    return this.httpClient.get(AppConstants.vaultUrls.getRecords);
  }

  addVaultRecord(record: NewRecord) {
    return this.httpClient.post(AppConstants.vaultUrls.addRecord, record);
  }

  updateVaultRecord(record: UpdatedRecord) {
    return this.httpClient.post(AppConstants.vaultUrls.updateRecord, record);
  }

  deleteVaultRecord(recordId: number) {
    return this.httpClient.delete(
      `${AppConstants.vaultUrls.deleteRecord}/${recordId}`
    );
  }

  getRecordUsers(recordId: number) {
    return this.httpClient.get(
      `${AppConstants.vaultUrls.getRecordUsers}/${recordId}`
    );
  }

  // methods for performing CRUD on shared records
  getRecipients() {
    return this.httpClient.get(AppConstants.sharedRecordUrls.getRecipients);
  }

  getSharedRecords() {
    return this.httpClient.get(AppConstants.sharedRecordUrls.getRecords);
  }

  sharedRecord(sharedRecord: SharedRecord) {
    return this.httpClient.post(
      AppConstants.sharedRecordUrls.shareRecord,
      sharedRecord
    );
  }

  deleteSharedRecord(sharedRecordId: number) {
    const endpointUrl = `${AppConstants.sharedRecordUrls.deleteRecord}/${sharedRecordId}`;
    return this.httpClient.delete(endpointUrl);
  }

  // methods for account recovery endpoints
  setAccountRecovery(recoverySetting: RecoverySetting) {
    return this.httpClient.post(
      AppConstants.accountRecoveryUrls.setRecovery,
      recoverySetting
    );
  }

  getSecurityQuestion(userEmail: string) {
    const endpointUrl = AppConstants.accountRecoveryUrls.getSecurityQuestion;
    let requestPayload: SecurityQuestionRequest = { userEmail: userEmail };
    return this.httpClient.post(endpointUrl, requestPayload);
  }

  startRecovery(recoveryRequest: RecoveryRequest) {
    return this.httpClient.post(
      AppConstants.accountRecoveryUrls.startRecovery,
      recoveryRequest
    );
  }

  getRecoveryUser(userEmail: string) {
    let payload: RecoveryUserRequest = { userEmail: userEmail };
    return this.httpClient.post(
      AppConstants.accountRecoveryUrls.getRecoveryUser,
      payload
    );
  }

  resetAccountPassword(resetPasswordRequestData: ResetPasswordRequest) {
    return this.httpClient.post(
      AppConstants.accountRecoveryUrls.resetPassword,
      resetPasswordRequestData
    );
  }
}
