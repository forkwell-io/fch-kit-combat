import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AgencyProfilePhotoDialogComponent} from './agency-profile-photo-dialog.component';

describe('AgencyProfilePhotoDialogComponent', () => {
  let component: AgencyProfilePhotoDialogComponent;
  let fixture: ComponentFixture<AgencyProfilePhotoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AgencyProfilePhotoDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyProfilePhotoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
