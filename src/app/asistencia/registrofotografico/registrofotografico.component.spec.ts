import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrofotograficoComponent } from './registrofotografico.component';

describe('RegistrofotograficoComponent', () => {
  let component: RegistrofotograficoComponent;
  let fixture: ComponentFixture<RegistrofotograficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrofotograficoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrofotograficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
