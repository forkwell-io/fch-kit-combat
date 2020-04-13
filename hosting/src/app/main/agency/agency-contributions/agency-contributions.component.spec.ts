import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyContributionsComponent } from './agency-contributions.component';

describe('AgencyContributionsComponent', () => {
  let component: AgencyContributionsComponent;
  let fixture: ComponentFixture<AgencyContributionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyContributionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyContributionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
