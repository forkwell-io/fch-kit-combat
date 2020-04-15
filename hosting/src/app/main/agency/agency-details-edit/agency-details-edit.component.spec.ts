import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AgencyDetailsEditComponent} from './agency-details-edit.component';

describe('AgencyDetailsEditComponent', () => {
  let component: AgencyDetailsEditComponent;
  let fixture: ComponentFixture<AgencyDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AgencyDetailsEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
