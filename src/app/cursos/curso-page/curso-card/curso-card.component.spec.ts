import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoCardComponent } from './curso-card.component';

describe('CursoCardComponent', () => {
  let component: CursoCardComponent;
  let fixture: ComponentFixture<CursoCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CursoCardComponent]
    });
    fixture = TestBed.createComponent(CursoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
