import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceRegistrationComponent } from './attendance-registration.component';

describe('AttendanceRegistrationComponent', () => {
  let component: AttendanceRegistrationComponent;
  let fixture: ComponentFixture<AttendanceRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
