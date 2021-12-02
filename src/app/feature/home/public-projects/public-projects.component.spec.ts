import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProjectsComponent } from './public-projects.component';

describe('PublicProjectsComponent', () => {
  let component: PublicProjectsComponent;
  let fixture: ComponentFixture<PublicProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
