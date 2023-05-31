import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareersFormComponent } from './careers-form.component';

describe('CareersFormComponent', () => {
  let component: CareersFormComponent;
  let fixture: ComponentFixture<CareersFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CareersFormComponent]
    });
    fixture = TestBed.createComponent(CareersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
