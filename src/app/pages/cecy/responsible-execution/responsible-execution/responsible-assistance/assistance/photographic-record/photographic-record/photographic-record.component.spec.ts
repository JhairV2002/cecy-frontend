import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographicRecordComponent } from './photographic-record.component';

describe('PhotographicRecordComponent', () => {
  let component: PhotographicRecordComponent;
  let fixture: ComponentFixture<PhotographicRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotographicRecordComponent]
    })
    .compileComponents();
    fixture = TestBed.createComponent(PhotographicRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
