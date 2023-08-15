import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteCursosListaComponent } from './estudiante-cursos-lista.component';

describe('EstudianteCursosListaComponent', () => {
  let component: EstudianteCursosListaComponent;
  let fixture: ComponentFixture<EstudianteCursosListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstudianteCursosListaComponent]
    });
    fixture = TestBed.createComponent(EstudianteCursosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
