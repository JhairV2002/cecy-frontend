import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterValidationComponent } from './register-validation.component';

describe('RegisterValidationComponent', () => {
  let component: RegisterValidationComponent;
  let fixture: ComponentFixture<RegisterValidationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterValidationComponent]
    });
    fixture = TestBed.createComponent(RegisterValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});