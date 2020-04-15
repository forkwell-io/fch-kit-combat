import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRequestContribComponent } from './card-request-contrib.component';

describe('CardRequestContribComponent', () => {
  let component: CardRequestContribComponent;
  let fixture: ComponentFixture<CardRequestContribComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardRequestContribComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardRequestContribComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
