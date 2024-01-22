import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-start-signup',
  templateUrl: './start-signup.component.html',
  styleUrls: ['./start-signup.component.css']
})
export class StartSignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

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
    this.authService.startSignup(this.signupForm.value.email);
  }
}
