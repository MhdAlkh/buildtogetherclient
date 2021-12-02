import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorsDialogComponent } from './investors-dialog.component';

describe('InvestorsDialogComponent', () => {
  let component: InvestorsDialogComponent;
  let fixture: ComponentFixture<InvestorsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestorsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
