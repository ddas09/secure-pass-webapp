import { Record } from '../../../models/record.model';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecordDialogData } from '../../../models/dialog-data.model';
import { PasswordService } from '../../../services/password/password.service';

@Component({
  selector: 'app-manage-record',
  templateUrl: './manage-record.component.html',
  styleUrls: ['./manage-record.component.css'],
})
export class ManageRecordComponent implements OnInit {
  manageRecordForm!: FormGroup;
  isReadOnly: boolean = false;
  isPasswordVisible: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private passwordService: PasswordService,
    private dialogReference: MatDialogRef<ManageRecordComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: RecordDialogData
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.initializeForm();
  }

  createForm(): void {
    this.manageRecordForm = this.formBuilder.group({
      note: [''],
      websiteUrl: [''],
      title: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  initializeForm() {
    if (this.dialogData.record == null) return;

    this.manageRecordForm.controls.note.setValue(this.dialogData.record.notes);
    this.manageRecordForm.controls.title.setValue(this.dialogData.record.title);
    this.manageRecordForm.controls.login.setValue(this.dialogData.record.login);
    this.manageRecordForm.controls.password.setValue(
      this.dialogData.record.password
    );
    this.manageRecordForm.controls.websiteUrl.setValue(
      this.dialogData.record.websiteUrl
    );
  }

  generatePassword() {
    this.manageRecordForm.controls.password.setValue(
      this.passwordService.generatePassword()
    );
  }

  onFormSubmit(): void {
    let formValue = this.manageRecordForm.value;

    let modifiedRecord: Record = {
      title: formValue.title,
      login: formValue.login,
      password: formValue.password,
      websiteUrl: formValue.websiteUrl,
      notes: formValue.notes,
    };

    this.dialogReference.close(modifiedRecord);
  }
}
