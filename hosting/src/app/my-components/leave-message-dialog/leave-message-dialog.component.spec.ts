import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveMessageDialogComponent } from './leave-message-dialog.component';

describe('LeaveMessageDialogComponent', () => {
  let component: LeaveMessageDialogComponent;
  let fixture: ComponentFixture<LeaveMessageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveMessageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
