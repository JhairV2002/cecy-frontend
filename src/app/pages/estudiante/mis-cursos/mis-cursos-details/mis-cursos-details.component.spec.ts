import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisCursosDetailsComponent } from './mis-cursos-details.component';

describe('MisCursosDetailsComponent', () => {
  let component: MisCursosDetailsComponent;
  let fixture: ComponentFixture<MisCursosDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisCursosDetailsComponent]
    });
    fixture = TestBed.createComponent(MisCursosDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
