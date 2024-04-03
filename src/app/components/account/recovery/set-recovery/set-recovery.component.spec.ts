import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetRecoveryComponent } from './set-recovery.component';

describe('SetRecoveryComponent', () => {
  let component: SetRecoveryComponent;
  let fixture: ComponentFixture<SetRecoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetRecoveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
