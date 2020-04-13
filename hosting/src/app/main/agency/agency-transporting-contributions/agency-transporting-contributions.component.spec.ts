import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyTransportingContributionsComponent } from './agency-transporting-contributions.component';

describe('AgencyTransportingContributionsComponent', () => {
  let component: AgencyTransportingContributionsComponent;
  let fixture: ComponentFixture<AgencyTransportingContributionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyTransportingContributionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyTransportingContributionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
