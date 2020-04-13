import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminCreateAgencyComponent} from './admin-create-agency.component';

describe('AdminCreateAgencyComponent', () => {
  let component: AdminCreateAgencyComponent;
  let fixture: ComponentFixture<AdminCreateAgencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCreateAgencyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
