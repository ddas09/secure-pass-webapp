import { Injectable } from '@angular/core';
import { AppConstants } from '../../constants/app.constants';
import { AccessTokenData } from '../../models/token-data.model';
import { CryptographyService } from '../cryptography/cryptography.service';
import {
  Record,
  SharedRecord,
  VaultRecordContainer,
} from '../../models/record.model';
import { HttpClientService } from '../http-client/http-client.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipient } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  private tokenData!: AccessTokenData;

  constructor(
    private httpClientService: HttpClientService,
    private cryptographyService: CryptographyService
  ) {
    this.decryptAccessToken();
  }

  addVaultRecord(record: Record) {
    let encryptionKeySecret = record.login + record.password;
    let encryptionKey = this.cryptographyService.getRandomKey(
      encryptionKeySecret,
      AppConstants.recordEncryptionKeySizeInBytes
    );

    let newRecord: Record = {
      title: this.cryptographyService.encrypt(record.title, encryptionKey),
      login: this.cryptographyService.encrypt(record.login, encryptionKey),
      password: this.cryptographyService.encrypt(
        record.password,
        encryptionKey
      ),
      websiteUrl:
        record.websiteUrl.trim() !== AppConstants.emptyString
          ? this.cryptographyService.encrypt(record.websiteUrl, encryptionKey)
          : AppConstants.emptyString,
      notes:
        record.notes.trim() !== AppConstants.emptyString
          ? this.cryptographyService.encrypt(record.notes, encryptionKey)
          : AppConstants.emptyString,
      encryptionKey: this.cryptographyService.encrypt(
        encryptionKey,
        this.tokenData.dataKey
      ),
    };

    return this.httpClientService.post(
      AppConstants.vaultEndpoints.records,
      newRecord
    );
  }

  getVaultRecords(): Observable<VaultRecordContainer> {
    return this.httpClientService.get(AppConstants.vaultEndpoints.records).pipe(
      map((response: any) => {
        return this.getDecryptedRecords(response.data);
      })
    );
  }

  private getDecryptedRecords(
    recordContainer: VaultRecordContainer
  ): VaultRecordContainer {
    const decryptRecords = (records: Record[]): Record[] => {
      return records.map((record) => {
        record.encryptionKey = this.getDecryptedKey(
          record.encryptionKey!,
          record.isSharedRecord!
        );
        record.title = this.cryptographyService.decrypt(
          record.title,
          record.encryptionKey
        );
        record.login = this.cryptographyService.decrypt(
          record.login,
          record.encryptionKey
        );
        record.password = this.cryptographyService.decrypt(
          record.password,
          record.encryptionKey
        );
        record.notes =
          record.notes !== null
            ? this.cryptographyService.decrypt(
                record.notes,
                record.encryptionKey
              )
            : AppConstants.emptyString;
        record.websiteUrl =
          record.websiteUrl !== null
            ? this.cryptographyService.decrypt(
                record.websiteUrl,
                record.encryptionKey
              )
            : AppConstants.emptyString;

        return record;
      });
    };

    recordContainer.vaultRecords = decryptRecords(recordContainer.vaultRecords);
    recordContainer.sharedRecords = decryptRecords(
      recordContainer.sharedRecords
    );

    return recordContainer;
  }

  private getDecryptedKey(
    encryptionKey: string,
    isSharedRecord: boolean
  ): string {
    return isSharedRecord
      ? this.cryptographyService.rsaDecrypt(
          encryptionKey,
          this.tokenData.rsaPrivateKey
        )
      : this.cryptographyService.decrypt(encryptionKey, this.tokenData.dataKey);
  }

  decryptAccessToken() {
    this.tokenData = this.cryptographyService.getDecryptedAccessToken();
  }

  decryptRecord(record: Record): Record {
    record.encryptionKey = this.cryptographyService.decrypt(
      record.encryptionKey!,
      this.tokenData.dataKey
    );

    record.notes = this.cryptographyService.decrypt(
      record.notes,
      record.encryptionKey
    );
    record.title = this.cryptographyService.decrypt(
      record.title,
      record.encryptionKey
    );
    record.login = this.cryptographyService.decrypt(
      record.login,
      record.encryptionKey
    );
    record.password = this.cryptographyService.decrypt(
      record.password,
      record.encryptionKey
    );
    record.websiteUrl = this.cryptographyService.decrypt(
      record.websiteUrl,
      record.encryptionKey
    );

    return record;
  }

  updateVaultRecord(
    modifiedRecord: Record,
    encryptionKey: string,
    recordId: number
  ) {
    let updatedRecord: Record = {
      id: recordId,
      notes: this.cryptographyService.encrypt(
        modifiedRecord.notes,
        encryptionKey
      ),
      title: this.cryptographyService.encrypt(
        modifiedRecord.title,
        encryptionKey
      ),
      login: this.cryptographyService.encrypt(
        modifiedRecord.login,
        encryptionKey
      ),
      password: this.cryptographyService.encrypt(
        modifiedRecord.password,
        encryptionKey
      ),
      websiteUrl: this.cryptographyService.encrypt(
        modifiedRecord.websiteUrl,
        encryptionKey
      ),
    };

    return this.httpClientService.put(
      AppConstants.vaultEndpoints.records,
      updatedRecord
    );
  }

  deleteRecord(recordId: number, isVaultRecord: boolean) {
    if (isVaultRecord)
      return this.httpClientService.delete(
        `${AppConstants.vaultEndpoints.records}/${recordId}`
      );
    else
      return this.httpClientService.delete(
        AppConstants.vaultEndpoints.unshareRecord(recordId)
      );
  }

  shareRecord(record: Record, recipient: Recipient) {
    let sharedRecord: SharedRecord = {
      recordId: record.id!,
      recipientId: recipient.id,
      encryptionKey: this.cryptographyService.rsaEncrypt(
        record.encryptionKey!,
        recipient.rsaPublicKey
      ),
    };

    return this.httpClientService.post(
      AppConstants.vaultEndpoints.shareRecord(sharedRecord.recordId),
      sharedRecord
    );
  }
}
