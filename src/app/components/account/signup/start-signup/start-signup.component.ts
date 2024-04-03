import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../../services/account/account.service';

@Component({
  selector: 'app-start-signup',
  templateUrl: './start-signup.component.html',
  styleUrls: ['./start-signup.component.css'],
})
export class StartSignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get formControls(): any {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.accountService.startSignup(this.signupForm.value.email);
  }
}
