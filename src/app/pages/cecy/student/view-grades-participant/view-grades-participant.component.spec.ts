import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGradesParticipantComponent } from './view-grades-participant.component';

describe('ViewGradesParticipantComponent', () => {
  let component: ViewGradesParticipantComponent;
  let fixture: ComponentFixture<ViewGradesParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGradesParticipantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGradesParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
