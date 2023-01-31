import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarEnderecoDialogComponent } from './atualizar-endereco-dialog.component';

describe('AtualizarEnderecoDialogComponent', () => {
  let component: AtualizarEnderecoDialogComponent;
  let fixture: ComponentFixture<AtualizarEnderecoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtualizarEnderecoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtualizarEnderecoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
