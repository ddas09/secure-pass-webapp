import { Component, OnInit, Inject } from '@angular/core';
import { ViewRecord } from '../../../models/record.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewRecordDialogData } from '../../../models/dialog-data.model';

@Component({
  selector: 'app-view-record',
  templateUrl: './view-record.component.html',
  styleUrls: ['./view-record.component.css']
})
export class ViewRecordComponent implements OnInit {
  record!: ViewRecord;
  isSharedRecord: boolean = false;
  isPasswordVisible: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: ViewRecordDialogData
  ) { }

  ngOnInit(): void {
    this.record = this.dialogData.record as ViewRecord;
  }
}
