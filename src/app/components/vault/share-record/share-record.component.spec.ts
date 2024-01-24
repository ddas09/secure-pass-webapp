import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareRecordComponent } from './share-record.component';

describe('ShareRecordComponent', () => {
  let component: ShareRecordComponent;
  let fixture: ComponentFixture<ShareRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
