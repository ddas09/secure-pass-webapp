import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/constants/app.constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecoveryService } from '../../../../services/recovery/recovery.service';
import { SharedDataService } from '../../../../services/shared-data/shared-data.service';

@Component({
  selector: 'app-recover-account',
  templateUrl: './recover-account.component.html',
  styleUrls: ['./recover-account.component.css']
})
export class RecoverAccountComponent implements OnInit {
  recoveryForm!: FormGroup;
  securityAnswerForm!: FormGroup;

  isAnswerVisible: boolean = false;
  isAccountRecoveryConfigured: boolean = false;

  userEmail!: string;
  securityQuestion!: string;

  constructor(
    private formBuilder: FormBuilder,
    private recoveryService: RecoveryService,
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.recoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.securityAnswerForm = this.formBuilder.group({
      securityAnswer: ['', Validators.required]
    });
  }

  get recoveryFormControls(): any {
    return this.recoveryForm.controls;
  }

  get securityAnswerFormControls(): any {
    return this.securityAnswerForm.controls;
  }

  onRecoveryFormSubmit() {
    this.recoveryService.getSecurityQuestion(this.recoveryForm.value.email);

    this.sharedDataService.securityQuestionData.subscribe((securityQuestion: string) => {
      if (securityQuestion != AppConstants.emptyString) {
        this.isAccountRecoveryConfigured = true;
        this.securityQuestion = securityQuestion;
        this.userEmail = this.recoveryForm.value.email;
      }
    });
  }

  onSecurityAnswerFormSubmit() {
    this.recoveryService.startRecovery(this.userEmail, this.securityAnswerForm.value.securityAnswer);
  }
}
