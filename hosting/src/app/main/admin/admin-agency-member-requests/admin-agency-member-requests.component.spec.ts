import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminAgencyMemberRequestsComponent} from './admin-agency-member-requests.component';

describe('AdminAgencyMemberRequestsComponent', () => {
  let component: AdminAgencyMemberRequestsComponent;
  let fixture: ComponentFixture<AdminAgencyMemberRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAgencyMemberRequestsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAgencyMemberRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
