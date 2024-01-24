import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecoveryService } from '../../../../services/recovery/recovery.service';

@Component({
  selector: 'app-set-recovery',
  templateUrl: './set-recovery.component.html',
  styleUrls: ['./set-recovery.component.css']
})
export class SetRecoveryComponent implements OnInit {
  recoveryForm!: FormGroup;
  isAnswerVisible: boolean = false;
  
  constructor(private formBuilder: FormBuilder, private recoveryService: RecoveryService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.recoveryForm = this.formBuilder.group({
      securityQuestion: ['', Validators.required],
      securityAnswer: ['', Validators.required]
    });
  }

  get formControls(): any {
    return this.recoveryForm.controls;
  }

  onSubmit(): void {
    this.recoveryService.setAccountRecovery(this.recoveryForm.value);
  }
}
