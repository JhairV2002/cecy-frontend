import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibleExecutionComponent } from './responsible-execution.component';

describe('ResponsibleExecutionComponent', () => {
  let component: ResponsibleExecutionComponent;
  let fixture: ComponentFixture<ResponsibleExecutionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResponsibleExecutionComponent]
    });
    fixture = TestBed.createComponent(ResponsibleExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
