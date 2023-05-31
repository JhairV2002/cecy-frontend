import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoFechaComponent } from './listado-fecha.component';

describe('ListadoFechaComponent', () => {
  let component: ListadoFechaComponent;
  let fixture: ComponentFixture<ListadoFechaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoFechaComponent]
    });
    fixture = TestBed.createComponent(ListadoFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
