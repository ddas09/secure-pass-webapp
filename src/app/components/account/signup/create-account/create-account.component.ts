import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from '../../../../constants/app.constants';
import { SignupTokenData } from '../../../../models/token-data.model';
import { TokenService } from '../../../../services/token/token.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AccountService } from '../../../../services/account/account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent implements OnInit {
  signupToken!: string;
  accountForm!: FormGroup;
  isPasswordVisible: boolean = false;
  isPasswordTooltipVisible: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private tokenService: TokenService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.checkSignupToken();
  }

  createForm() {
    this.accountForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(AppConstants.Patterns.password),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.matchPasswords }
    );
  }

  matchPasswords(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (!password || !confirmPassword) return null;

    return password === confirmPassword
      ? null
      : { arePasswordsDifferent: true };
  }

  get formControls(): any {
    return this.accountForm.controls;
  }

  checkSignupToken() {
    let token = this.route.snapshot.queryParamMap.get(AppConstants.token);
    if (!token) {
      this.requireSignup(AppConstants.notificationMessages.signupRequired);
      return;
    }

    this.signupToken = token;
    if (!this.tokenService.isValidToken<SignupTokenData>(this.signupToken)) {
      this.requireSignup(AppConstants.notificationMessages.invalidToken);
      return;
    }

    if (this.tokenService.isTokenExpired(this.signupToken)) {
      this.requireSignup(AppConstants.notificationMessages.signUpLinkExpired);
      return;
    }

    let tokenData: SignupTokenData =
      this.tokenService.getTokenData<SignupTokenData>(this.signupToken);
    this.accountService
      .checkAccountExistence(tokenData.email)
      .subscribe((respone: any) => {
        if (respone.data == true) {
          this.notificationService.Info(
            AppConstants.notificationMessages.accountCreated
          );
          this.router.navigate([AppConstants.navigationUrls.signin]);
        }
      });
  }

  requireSignup(message: string) {
    this.notificationService.Info(message);
    this.router.navigate([AppConstants.navigationUrls.signup]);
  }

  onSubmit() {
    this.accountService.createAccount(this.accountForm.value, this.signupToken);
  }
}
