import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AgencyRequestsComponent} from './agency-requests.component';

describe('AgencyRequestsComponent', () => {
  let component: AgencyRequestsComponent;
  let fixture: ComponentFixture<AgencyRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AgencyRequestsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
