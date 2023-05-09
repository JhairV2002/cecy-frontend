import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoursesParticipantComponent } from './view-courses-participant.component';

describe('ViewCoursesParticipantComponent', () => {
  let component: ViewCoursesParticipantComponent;
  let fixture: ComponentFixture<ViewCoursesParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCoursesParticipantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCoursesParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
