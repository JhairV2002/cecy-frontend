import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareersListComponent } from './careers-list.component';

describe('CareersListComponent', () => {
  let component: CareersListComponent;
  let fixture: ComponentFixture<CareersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CareersListComponent]
    });
    fixture = TestBed.createComponent(CareersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
