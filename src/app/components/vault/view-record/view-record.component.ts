import { Record } from '../../../models/record.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecordDialogData } from '../../../models/dialog-data.model';

@Component({
  selector: 'app-view-record',
  templateUrl: './view-record.component.html',
  styleUrls: ['./view-record.component.css'],
})
export class ViewRecordComponent implements OnInit {
  record!: Record;
  isSharedRecord: boolean = false;
  isPasswordVisible: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: RecordDialogData) {}

  ngOnInit(): void {
    this.record = this.dialogData.record as Record;
  }
}
