import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AgencyOverviewComponent} from './agency-overview.component';

describe('AgencyOverviewComponent', () => {
  let component: AgencyOverviewComponent;
  let fixture: ComponentFixture<AgencyOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AgencyOverviewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
