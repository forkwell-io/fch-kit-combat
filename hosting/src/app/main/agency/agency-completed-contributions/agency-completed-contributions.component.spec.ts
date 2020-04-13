import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyCompletedContributionsComponent } from './agency-completed-contributions.component';

describe('AgencyCompletedContributionsComponent', () => {
  let component: AgencyCompletedContributionsComponent;
  let fixture: ComponentFixture<AgencyCompletedContributionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyCompletedContributionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyCompletedContributionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
