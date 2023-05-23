import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroFotograficoComponent } from './registro-fotografico.component';

describe('RegistroFotograficoComponent', () => {
  let component: RegistroFotograficoComponent;
  let fixture: ComponentFixture<RegistroFotograficoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroFotograficoComponent]
    });
    fixture = TestBed.createComponent(RegistroFotograficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
