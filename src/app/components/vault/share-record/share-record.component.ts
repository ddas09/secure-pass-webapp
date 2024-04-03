import { Record } from '../../../models/record.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConstants } from '../../../constants/app.constants';
import { RecordUser, Recipient } from '../../../models/user.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RecordDialogData } from '../../../models/dialog-data.model';
import { RecordService } from '../../../services/record/record.service';
import { AccountService } from '../../../services/account/account.service';
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  selector: 'app-share-record',
  templateUrl: './share-record.component.html',
  styleUrls: ['./share-record.component.css'],
})
export class ShareRecordComponent implements OnInit {
  record!: Record;
  shareRecordForm!: FormGroup;

  recipients: Recipient[] = [];
  recordUsers: RecordUser[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private recordService: RecordService,
    private accountService: AccountService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public dialogData: RecordDialogData
  ) {}

  ngOnInit(): void {
    this.record = this.dialogData.record as Record;
    this.getAllUsers();
    this.createShareRecordForm();
  }

  getAllUsers() {
    this.accountService.getAllUsers().subscribe((response: any) => {
      this.recipients = response.data;
    });
  }

  createShareRecordForm(): void {
    this.shareRecordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onFormSubmit() {
    let recipient = this.recipients.find(
      (recipient) => recipient.email == this.shareRecordForm.value.email
    );

    if (!recipient) {
      this.notificationService.error(
        AppConstants.notificationMessages.accountDoesNotExist
      );
      return;
    }

    this.recordService.shareRecord(this.record, recipient).subscribe(() => {
      let recordUser: RecordUser = {
        id: recipient?.id as number,
        email: recipient?.email as string,
        permission: AppConstants.permissions.readonly,
      };

      this.recordUsers.push(recordUser);
    });
  }
}
