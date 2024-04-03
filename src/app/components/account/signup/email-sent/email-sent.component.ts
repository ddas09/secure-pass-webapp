import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-email-sent',
  templateUrl: './email-sent.component.html',
  styleUrls: ['./email-sent.component.css']
})
export class EmailSentComponent implements OnInit {
  userEmail!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {}
  
  resendEmail() {
    this.router.navigate([AppConstants.navigationUrls.signup]);
  }
}
