import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../../../../constants/app.constants';
import { RecoveryService } from '../../../../services/recovery/recovery.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;

  isPasswordVisible: boolean = false;
  isPasswordTooltipVisible: boolean = false;

  constructor
  (
    private formBuilder: FormBuilder, 
    private recoveryService: RecoveryService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(AppConstants.Patterns.password)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.matchPasswords });
  }

  matchPasswords(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get("password")?.value;
    const confirmPassword = formGroup.get("confirmPassword")?.value;

    if (!password || !confirmPassword) return null;

    return password === confirmPassword ? null : { 'arePasswordsDifferent': true };
  }

  get formControls(): any {
    return this.resetPasswordForm.controls;
  }

  onSubmit(): void {
    let newPassword: string = this.resetPasswordForm.value.password;
    this.recoveryService.resetPassword(newPassword);
  }
}
