import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponiveisComponent } from './disponiveis.component';

describe('DisponiveisComponent', () => {
  let component: DisponiveisComponent;
  let fixture: ComponentFixture<DisponiveisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisponiveisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisponiveisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
