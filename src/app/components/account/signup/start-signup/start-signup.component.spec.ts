import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartSignupComponent } from './start-signup.component';

describe('StartSignupComponent', () => {
  let component: StartSignupComponent;
  let fixture: ComponentFixture<StartSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
