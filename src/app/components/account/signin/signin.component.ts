import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../services/account/account.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signInForm!: FormGroup;
  isPasswordVisible: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get formControls(): any {
    return this.signInForm.controls;
  }

  signIn() {
    this.accountService.signIn(this.signInForm.value);
  }
}
