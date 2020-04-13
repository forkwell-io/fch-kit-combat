import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AgencyInboxComponent} from './agency-inbox.component';

describe('AgencyInboxComponent', () => {
  let component: AgencyInboxComponent;
  let fixture: ComponentFixture<AgencyInboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AgencyInboxComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
