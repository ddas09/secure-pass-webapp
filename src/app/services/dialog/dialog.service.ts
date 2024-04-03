import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewRecordComponent } from '../../components/vault/view-record/view-record.component';
import { ShareRecordComponent } from '../../components/vault/share-record/share-record.component';
import { ManageRecordComponent } from '../../components/vault/manage-record/manage-record.component';
import { RecordDialogData } from '../../models/dialog-data.model';
import { ConfirmationDialogComponent } from '../../components/shared/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  getConfirmation(dialogContent: string) {
    let dialogReference = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true,
      data: dialogContent,
    });

    return dialogReference.afterClosed();
  }

  openViewRecordDialog(dialogData: RecordDialogData) {
    this.dialog.open(ViewRecordComponent, {
      width: '80%',
      maxWidth: '450px',
      autoFocus: false,
      disableClose: true,
      data: dialogData,
    });
  }

  openManageRecordDialog(dialogData: RecordDialogData) {
    let dialogReference = this.dialog.open(ManageRecordComponent, {
      disableClose: true,
      width: '80%',
      maxWidth: '450px',
      data: dialogData,
    });

    return dialogReference.afterClosed();
  }

  openShareRecordDialog(dialogData: RecordDialogData) {
    this.dialog.open(ShareRecordComponent, {
      disableClose: true,
      width: '80%',
      maxWidth: '450px',
      data: dialogData,
    });
  }
}
