import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminAgencyMemberRequestComponent} from './admin-agency-member-request.component';

describe('AdminAgencyMemberRequestComponent', () => {
  let component: AdminAgencyMemberRequestComponent;
  let fixture: ComponentFixture<AdminAgencyMemberRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAgencyMemberRequestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAgencyMemberRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
