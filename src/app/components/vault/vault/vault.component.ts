import { isEqual } from 'lodash';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { AppConstants } from '../../../constants/app.constants';
import { Record, VaultRecord } from '../../../models/record.model';
import { RecordService } from '../../../services/record/record.service';
import { DialogService } from '../../../services/dialog/dialog.service';
import { ManageRecordDialogData, ShareRecordDialogData, ViewRecordDialogData } from '../../../models/dialog-data.model';

@Component({
  selector: 'app-vault',
  templateUrl: './vault.component.html',
  styleUrls: ['./vault.component.css']
})
export class VaultComponent implements OnInit {
  records: VaultRecord[] = [];
  sharedRecords: VaultRecord[] = [];

  constructor(
    private apiService: ApiService,
    private dialogService: DialogService,
    private recordService: RecordService,
  ) { }

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords(): void {
    this.apiService.getVaultRecords().subscribe((response: any) => {
      this.records = this.recordService.getDecryptedRecord(response.data, false);
    });

    this.apiService.getSharedRecords().subscribe((response: any) => {
      this.sharedRecords = this.recordService.getDecryptedRecord(response.data, true);
    });
  }

  onAddButtonClick(): void {
    let dialogData: ManageRecordDialogData = { dialogTitle: AppConstants.dialogTitles.addRecord };

    this.dialogService.openManageRecordDialog(dialogData).subscribe((record: Record) => {
      if (record) {
        this.recordService.addVaultRecord(record).subscribe((response: any) => {
          this.records.push(this.recordService.decryptRecord(response.data));
        });
      }
    });
  }

  editRecord(record: VaultRecord): void {
    let dialogData: ManageRecordDialogData = {
      record: record,
      dialogTitle: AppConstants.dialogTitles.editRecord
    };

    this.dialogService.openManageRecordDialog(dialogData).subscribe((modifiedRecord: Record) => {
      if (modifiedRecord && !isEqual(record, modifiedRecord)) {
        this.recordService.updateVaultRecord(modifiedRecord, record.recordKey, record.id).subscribe(() => {
          record.note = modifiedRecord.note;
          record.title = modifiedRecord.title;
          record.login = modifiedRecord.login;
          record.password = modifiedRecord.password;
          record.websiteUrl = modifiedRecord.websiteUrl;
        });
      }
    });
  }

  deleteRecord(recordId: number, isVaultRecord: boolean): void {
    this.dialogService.getConfirmation(AppConstants.dialogMessages.deleteRecordConfirmation)
      .subscribe((confirmation: boolean) => {
        if (confirmation && isVaultRecord) 
          this.recordService.deleteVaultRecord(recordId).subscribe(() => {
            this.records = this.records.filter(r => r.id != recordId);
          });

        else if(confirmation && !isVaultRecord)
          this.recordService.deleteSharedRecord(recordId).subscribe(() => {
            this.sharedRecords = this.sharedRecords.filter(r => r.id != recordId)
          })
      });
  }

  viewRecord(record: VaultRecord): void {
    let dialogData: ViewRecordDialogData = { record: record };
    this.dialogService.openViewRecordDialog(dialogData);
  }

  openShareRecordDialog(record: VaultRecord): void {
    let dialogData: ShareRecordDialogData = { record: record };
    this.dialogService.openShareRecordDialog(dialogData);
  }

}
