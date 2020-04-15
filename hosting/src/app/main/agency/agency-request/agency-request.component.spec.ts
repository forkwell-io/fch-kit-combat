import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AgencyRequestComponent} from './agency-request.component';

describe('AgencyRequestComponent', () => {
  let component: AgencyRequestComponent;
  let fixture: ComponentFixture<AgencyRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AgencyRequestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
