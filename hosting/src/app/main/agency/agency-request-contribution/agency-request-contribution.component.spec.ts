import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AgencyRequestContributionComponent} from './agency-request-contribution.component';

describe('AgencyRequestContributionComponent', () => {
  let component: AgencyRequestContributionComponent;
  let fixture: ComponentFixture<AgencyRequestContributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AgencyRequestContributionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyRequestContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
