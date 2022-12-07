import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarCarrosComponent } from './atualizar-carros.component';

describe('AtualizarCarrosComponent', () => {
  let component: AtualizarCarrosComponent;
  let fixture: ComponentFixture<AtualizarCarrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtualizarCarrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtualizarCarrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
