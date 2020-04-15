import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AgencyIncomingContributionsComponent} from './agency-incoming-contributions.component';

describe('AgencyIncomingContributionsComponent', () => {
  let component: AgencyIncomingContributionsComponent;
  let fixture: ComponentFixture<AgencyIncomingContributionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AgencyIncomingContributionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyIncomingContributionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
