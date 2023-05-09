import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPlanificationsComponent } from './detail-planifications.component';

describe('DetailPlanificationsComponent', () => {
  let component: DetailPlanificationsComponent;
  let fixture: ComponentFixture<DetailPlanificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPlanificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPlanificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
