import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRecordComponent } from './manage-record.component';

describe('ManageRecordComponent', () => {
  let component: ManageRecordComponent;
  let fixture: ComponentFixture<ManageRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
