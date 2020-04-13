import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionDialogComponent } from './contribution-dialog.component';

describe('ContributionDialogComponent', () => {
  let component: ContributionDialogComponent;
  let fixture: ComponentFixture<ContributionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
