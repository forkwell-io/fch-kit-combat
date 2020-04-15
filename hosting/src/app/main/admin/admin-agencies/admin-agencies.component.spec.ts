import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminAgenciesComponent} from './admin-agencies.component';

describe('AdminAgenciesComponent', () => {
  let component: AdminAgenciesComponent;
  let fixture: ComponentFixture<AdminAgenciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAgenciesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAgenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
