import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneySliderComponent } from './money-slider.component';

describe('MoneySliderComponent', () => {
  let component: MoneySliderComponent;
  let fixture: ComponentFixture<MoneySliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneySliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneySliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
