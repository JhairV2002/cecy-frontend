import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceHttpService } from '@services/cecy';
import { MessageService } from '@services/core';
import { AttendanceModel } from '@models/cecy';

@Component({
  selector: 'app-attendance-course-form',
  templateUrl: './attendance-course-form.component.html',
  styleUrls: ['./attendance-course-form.component.scss'],
})
export class AttendanceCourseFormComponent implements OnInit {
  public formAttendance: FormGroup = this.newFormAttendance;
  public progressBar: boolean = false;
  detailPlanificationId: number = 0;
  @Output() dialogForm = new EventEmitter<boolean>();
  constructor(
    private formBuilder: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private attendanceHttpService: AttendanceHttpService,
    public messageService: MessageService
  ) {
    // this.detailPlanificationId = this.activatedRouter.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.detailPlanificationId = this.activatedRouter.snapshot.params['id'];
  }
  get newFormAttendance(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      detailPlanificationId: [this.detailPlanificationId],
      duration: [
        null,
        [Validators.required, Validators.min(60), Validators.max(120)],
      ],
      registeredAt: [null, [Validators.required]],
    });
  }
  onSubmit() {
    this.detailPlanificationIdField.setValue(
      this.activatedRouter.snapshot.params['id']
    );
    if (this.formAttendance.valid) {
      // this.storeAttendance(this.formAttendance.value);
      this.storeAttendanceDetail(this.formAttendance.value);
    } else {
      this.formAttendance.markAllAsTouched();
    }
  }

  storeAttendance(attendance: AttendanceModel): void {
    this.progressBar = true;
    this.attendanceHttpService
      .storeAttendance(attendance)
      .subscribe((response) => {});
  }
  storeAttendanceDetail(attendance: AttendanceModel): void {
    this.progressBar = true;
    this.attendanceHttpService
      .storeAttendanceDetail(attendance)
      .subscribe((response) => {});
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }
  get idField() {
    return this.formAttendance.controls['id'];
  }
  get detailPlanificationIdField() {
    return this.formAttendance.controls['detailPlanificationId'];
  }
  get durationField() {
    return this.formAttendance.controls['duration'];
  }
  get registeredAtField() {
    return this.formAttendance.controls['registeredAt'];
  }
}
