import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadofechaComponent } from './listadofecha.component';

describe('ListadofechaComponent', () => {
  let component: ListadofechaComponent;
  let fixture: ComponentFixture<ListadofechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadofechaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadofechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
