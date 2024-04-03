import { isEqual } from 'lodash';
import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../../../constants/app.constants';
import { RecordDialogData } from '../../../models/dialog-data.model';
import { RecordService } from '../../../services/record/record.service';
import { DialogService } from '../../../services/dialog/dialog.service';
import { Record, VaultRecordContainer } from '../../../models/record.model';

@Component({
  selector: 'app-vault',
  templateUrl: './vault.component.html',
  styleUrls: ['./vault.component.css'],
})
export class VaultComponent implements OnInit {
  recordContainer!: VaultRecordContainer;

  constructor(
    private dialogService: DialogService,
    private recordService: RecordService
  ) {}

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords(): void {
    this.recordService
      .getVaultRecords()
      .subscribe((recordContainer: VaultRecordContainer) => {
        this.recordContainer = recordContainer;
      });
  }

  onAddButtonClick(): void {
    let dialogData: RecordDialogData = {
      dialogTitle: AppConstants.dialogTitles.addRecord,
    };

    this.dialogService
      .openManageRecordDialog(dialogData)
      .subscribe((record: Record) => {
        if (record) {
          this.recordService
            .addVaultRecord(record)
            .subscribe((response: any) => {
              this.recordContainer.vaultRecords.push(
                this.recordService.decryptRecord(response.data)
              );
            });
        }
      });
  }

  editRecord(record: Record): void {
    let dialogData: RecordDialogData = {
      record: record,
      dialogTitle: AppConstants.dialogTitles.editRecord,
    };

    this.dialogService
      .openManageRecordDialog(dialogData)
      .subscribe((modifiedRecord: Record) => {
        if (modifiedRecord && !isEqual(record, modifiedRecord)) {
          this.recordService
            .updateVaultRecord(
              modifiedRecord,
              record.encryptionKey!,
              record.id!
            )
            .subscribe(() => {
              record.notes = modifiedRecord.notes;
              record.title = modifiedRecord.title;
              record.login = modifiedRecord.login;
              record.password = modifiedRecord.password;
              record.websiteUrl = modifiedRecord.websiteUrl;
            });
        }
      });
  }

  deleteRecord(recordId: number, isVaultRecord: boolean): void {
    this.dialogService
      .getConfirmation(AppConstants.dialogMessages.deleteRecordConfirmation)
      .subscribe((confirmation: boolean) => {
        if (confirmation) {
          this.recordService
            .deleteRecord(recordId, isVaultRecord)
            .subscribe(() => {
              if (isVaultRecord)
                this.recordContainer.vaultRecords =
                  this.recordContainer.vaultRecords.filter(
                    (r) => r.id != recordId
                  );
              else
                this.recordContainer.sharedRecords =
                  this.recordContainer.sharedRecords.filter(
                    (r) => r.id != recordId
                  );
            });
        }
      });
  }

  viewRecord(record: Record): void {
    let dialogData: RecordDialogData = { record: record };
    this.dialogService.openViewRecordDialog(dialogData);
  }

  openShareRecordDialog(record: Record): void {
    let dialogData: RecordDialogData = { record: record };
    this.dialogService.openShareRecordDialog(dialogData);
  }
}
