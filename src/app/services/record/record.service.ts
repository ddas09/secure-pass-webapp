import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { AppConstants } from '../../constants/app.constants';
import { AccessTokenData } from '../../models/token-data.model';
import { CryptographyService } from '../cryptography/cryptography.service';
import { Record, NewRecord, UpdatedRecord, VaultRecord } from '../../models/record.model';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private tokenData!: AccessTokenData;

  constructor(private apiService: ApiService, private cryptographyService: CryptographyService) {
    this.decryptAccessToken();
  }

  decryptAccessToken() {
    this.tokenData = this.cryptographyService.getDecryptedAccessToken();
  }

  decryptRecord(record: VaultRecord): VaultRecord {
    record.recordKey = this.cryptographyService.decrypt(record.recordKey, this.tokenData.dataKey);
    
    record.note = this.cryptographyService.decrypt(record.note, record.recordKey);
    record.title = this.cryptographyService.decrypt(record.title, record.recordKey);
    record.login = this.cryptographyService.decrypt(record.login, record.recordKey);
    record.password = this.cryptographyService.decrypt(record.password, record.recordKey);
    record.websiteUrl = this.cryptographyService.decrypt(record.websiteUrl, record.recordKey);

    return record;
  }

  getDecryptedRecord(records: VaultRecord[], isSharedRecord: boolean): VaultRecord[] {
    records.forEach(record => {
      if (isSharedRecord)
        record.recordKey = this.cryptographyService.rsaDecrypt(record.recordKey, this.tokenData.rsaPrivateKey);
      else 
        record.recordKey = this.cryptographyService.decrypt(record.recordKey, this.tokenData.dataKey);

      record.note = this.cryptographyService.decrypt(record.note, record.recordKey);
      record.title = this.cryptographyService.decrypt(record.title, record.recordKey);
      record.login = this.cryptographyService.decrypt(record.login, record.recordKey);
      record.password = this.cryptographyService.decrypt(record.password, record.recordKey);
      record.websiteUrl = this.cryptographyService.decrypt(record.websiteUrl, record.recordKey);
    });

    return records;
  }

  addVaultRecord(record: Record) {
    let recordKeySecret = record.login + record.password;
    let recordKey = this.cryptographyService.getRandomKey(recordKeySecret, AppConstants.recordKeySizeInBytes);

    let newRecord: NewRecord = {
      note: this.cryptographyService.encrypt(record.note, recordKey),
      title: this.cryptographyService.encrypt(record.title, recordKey),
      login: this.cryptographyService.encrypt(record.login, recordKey),
      password: this.cryptographyService.encrypt(record.password, recordKey),
      websiteUrl: this.cryptographyService.encrypt(record.websiteUrl, recordKey),
      recordKey: this.cryptographyService.encrypt(recordKey, this.tokenData.dataKey)
    };

    return this.apiService.addVaultRecord(newRecord);
  }

  updateVaultRecord(modifiedRecord: Record, recordKey: string, recordId: number) {
    let updatedRecord: UpdatedRecord = {
      id: recordId,
      note: this.cryptographyService.encrypt(modifiedRecord.note, recordKey),
      title: this.cryptographyService.encrypt(modifiedRecord.title, recordKey),
      login: this.cryptographyService.encrypt(modifiedRecord.login, recordKey),
      password: this.cryptographyService.encrypt(modifiedRecord.password, recordKey),
      websiteUrl: this.cryptographyService.encrypt(modifiedRecord.websiteUrl, recordKey)
    };

    return this.apiService.updateVaultRecord(updatedRecord);
  }

  deleteVaultRecord(recordId: number) {
    return this.apiService.deleteVaultRecord(recordId);
  }

  deleteSharedRecord(recordId: number) {
    return this.apiService.deleteSharedRecord(recordId);
  }
}
