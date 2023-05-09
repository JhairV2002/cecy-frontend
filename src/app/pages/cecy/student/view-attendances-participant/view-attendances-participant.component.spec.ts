import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAttendancesParticipantComponent } from './view-attendances-participant.component';

describe('ViewAttendancesParticipantComponent', () => {
  let component: ViewAttendancesParticipantComponent;
  let fixture: ComponentFixture<ViewAttendancesParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAttendancesParticipantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAttendancesParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
