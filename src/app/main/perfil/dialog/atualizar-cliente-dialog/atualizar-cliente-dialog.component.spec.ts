import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarClienteDialogComponent } from './atualizar-cliente-dialog.component';

describe('AtualizarClienteDialogComponent', () => {
  let component: AtualizarClienteDialogComponent;
  let fixture: ComponentFixture<AtualizarClienteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtualizarClienteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtualizarClienteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
