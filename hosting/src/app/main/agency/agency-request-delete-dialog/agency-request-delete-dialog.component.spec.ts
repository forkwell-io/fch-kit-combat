import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AgencyRequestDeleteDialogComponent} from './agency-request-delete-dialog.component';

describe('AgencyRequestDeleteDialogComponent', () => {
  let component: AgencyRequestDeleteDialogComponent;
  let fixture: ComponentFixture<AgencyRequestDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AgencyRequestDeleteDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyRequestDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
