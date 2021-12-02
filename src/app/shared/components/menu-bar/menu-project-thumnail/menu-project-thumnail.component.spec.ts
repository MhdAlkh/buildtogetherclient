import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuProjectThumnailComponent } from './menu-project-thumnail.component';

describe('MenuProjectThumnailComponent', () => {
  let component: MenuProjectThumnailComponent;
  let fixture: ComponentFixture<MenuProjectThumnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuProjectThumnailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuProjectThumnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
