import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminDeleteUserDialogComponent} from './admin-delete-user-dialog.component';

describe('AdminDeleteUserDialogComponent', () => {
  let component: AdminDeleteUserDialogComponent;
  let fixture: ComponentFixture<AdminDeleteUserDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDeleteUserDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDeleteUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
