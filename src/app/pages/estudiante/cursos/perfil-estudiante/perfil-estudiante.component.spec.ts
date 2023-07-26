import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilEstudianteComponent } from './perfil-estudiante.component';

describe('PerfilEstudianteComponent', () => {
  let component: PerfilEstudianteComponent;
  let fixture: ComponentFixture<PerfilEstudianteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilEstudianteComponent]
    });
    fixture = TestBed.createComponent(PerfilEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
