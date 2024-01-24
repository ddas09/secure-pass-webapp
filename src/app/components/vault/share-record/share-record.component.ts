import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../services/api/api.service';
import { AppConstants } from '../../../constants/app.constants';
import { Recipient, RecordUser } from '../../../models/user.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SharedRecord, VaultRecord } from '../../../models/record.model';
import { ShareRecordDialogData } from '../../../models/dialog-data.model';
import { CryptographyService } from '../../../services/cryptography/cryptography.service';
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  selector: 'app-share-record',
  templateUrl: './share-record.component.html',
  styleUrls: ['./share-record.component.css']
})
export class ShareRecordComponent implements OnInit {
  record!: VaultRecord;
  shareRecordForm!: FormGroup;
  recipients: Recipient[] = [];
  recordUsers: RecordUser[] = [];

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private cryptographyService: CryptographyService,
    @Inject(MAT_DIALOG_DATA) public dialogData: ShareRecordDialogData
  ) { }

  ngOnInit(): void {
    this.getRecipients();
    this.getRecordUsers();
    this.createShareRecordForm();
  }

  getRecipients() {
    this.apiService.getRecipients().subscribe((response: any) => {
      this.recipients = response.data;
    });
  }

  getRecordUsers() {
    this.record = this.dialogData.record as VaultRecord;

    this.apiService.getRecordUsers(this.record.id).subscribe((response: any) => {
      this.recordUsers = response.data;
    });
  }

  createShareRecordForm(): void {
    this.shareRecordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onFormSubmit() {
    let recipient = this.recipients.find(r => r.email == this.shareRecordForm.value.email);

    if (!recipient) {
      this.notificationService.error(AppConstants.notificationMessages.accountDoesNotExist);
      return;
    }

    let sharedRecord: SharedRecord = {
      recordId: this.record.id,
      recipientId: recipient.id,
      recordKey: this.cryptographyService.rsaEncrypt(this.record.recordKey, recipient.rsaPublicKey)
    };

    this.apiService.sharedRecord(sharedRecord).subscribe(() => {
      let recordUser: RecordUser = {
        id: recipient?.id as number,
        email: recipient?.email as string,
        permission: AppConstants.permissions.readonly
      };

      this.recordUsers.push(recordUser);
    });
  }

}
