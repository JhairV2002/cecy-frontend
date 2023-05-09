import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatesStudentComponent } from './certificates-student.component';

describe('CertificatesStudentComponent', () => {
  let component: CertificatesStudentComponent;
  let fixture: ComponentFixture<CertificatesStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificatesStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatesStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
