import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FinishEmailAuthComponent} from './finish-email-auth.component';

describe('FinishEmailAuthComponent', () => {
  let component: FinishEmailAuthComponent;
  let fixture: ComponentFixture<FinishEmailAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FinishEmailAuthComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishEmailAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
