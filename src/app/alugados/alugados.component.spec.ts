import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlugadosComponent } from './alugados.component';

describe('AlugadosComponent', () => {
  let component: AlugadosComponent;
  let fixture: ComponentFixture<AlugadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlugadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlugadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
