import { CourseService } from '@services/cecy-v1/course.service';
import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessageService } from '@services/core';
import { CatalogueModel } from '@models/cecy';
import { ClassroomHttpService, CatalogueHttpService, PlanificationHttpService, DetailPlanificationHttpService } from '@services/cecy';
import { ActivatedRoute } from '@angular/router';
import { ClassroomModel } from '@models/cecy-v1/classroom.model';
import { DetailPlanModel } from '@models/cecy-v1/detailPlan.model';

@Component({
  selector: 'app-detail-planification-form',
  templateUrl: './detail-planification-form.component.html',
  styleUrls: ['./detail-planification-form.component.scss']
})
export class DetailPlanificationFormComponent implements OnInit, OnDestroy {
  @Input() data: any;
  @Input() planId: number=0;



  @Output() dialogForm = new EventEmitter<boolean>();
  private detailPlanification$ = this.detailPlanificationHttpService.detailPlanification$;
  private unsubscribe$ = new Subject<void>();
  public formDetailPlanification: FormGroup = this.newFormDetailPlanification;
  public progressBar: boolean = false;

  public days: CatalogueModel[] = [];
  public workdays: CatalogueModel[] = [];
  public classrooms: ClassroomModel[] = [];
  public parallels: CatalogueModel[] = [];
  public planification$ = this.planificationHttpService.planification$;
  planificationId: number= 0;
  instructors: any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private catalogueHttpService: CatalogueHttpService,
    private classroomHttpService: ClassroomHttpService,
    private detailPlanificationHttpService: DetailPlanificationHttpService,
    private formBuilder: FormBuilder,
    public messageService: MessageService,
    private planificationHttpService: PlanificationHttpService,
    private courseService: CourseService
  ) {
  }

  ngOnInit(): void {
    console.log('este es el id de horario',this.planId)
    this.courseService.getDetailPlan(this.data.id).subscribe(
      response => {
        console.log('esto es lo que responde', response)
        this.formDetailPlanification.patchValue(response);
        console.log('formulario', this.formDetailPlanification.value);
      }
    )

    this.loadDays();
    this.loadWorkdays();
    this.loadClassrooms();
    this.loadParallels();
    this.loadInstructors();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get newFormDetailPlanification(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      dayId: [null, Validators.required],
      classroomId: [null, Validators.required],
      classroom: [null],
      parallelId: [null, Validators.required],
      planificationCourseId: [null],
      workdayId: [null, Validators.required],
      endedTime: [null, Validators.required],
      observation: [null,],
      startedTime: [null, Validators.required],
      instructorId: [null, Validators.required],
      stateId: [null]
    });
  }


  onSubmit() {
    this.formDetailPlanification.patchValue({ planificationCourseId: this.planId })
    if (this.formDetailPlanification.valid) {
      if (this.idField.value) {
        this.updateDetailPlanification(this.formDetailPlanification.value);
      } else {
        this.storeDetailPlanification(this.formDetailPlanification.value);
      }
    } else {
      this.formDetailPlanification.markAllAsTouched();
    }
  }

  storeDetailPlanification(detailPlanification: DetailPlanModel): void {
    detailPlanification.stateId = 96;
    this.progressBar = true;
    this.courseService
      .saveDetailPlan(detailPlanification)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.messageService.successCourse(data);
          this.progressBar = false;
          this.dialogForm.emit(false);
        },
        error: (error) => {
          console.log(error);
          this.messageService.error(error);
          this.progressBar = false;
        },
      });
  }

  updateDetailPlanification(detailPlanification: DetailPlanModel): void {
    this.progressBar = true;
    this.courseService
      .updateDetailPlan(detailPlanification)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.messageService.successCourse(data);
          this.progressBar = false;
          this.dialogForm.emit(false);
        },
        error: (error) => {
          console.log(error);
          this.messageService.error(error);
          this.progressBar = false;
        },
      });
  }













































  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  // Getters
  get idField() {
    return this.formDetailPlanification.controls['id'];
  }

  get dayField() {
    return this.formDetailPlanification.controls['dayId'];
  }

  get classroomField() {
    return this.formDetailPlanification.controls['classroomId'];
  }

  get parallelField() {
    return this.formDetailPlanification.controls['parallelId'];
  }

  get workdayField() {
    return this.formDetailPlanification.controls['workdayId'];
  }

  get endedTimeField() {
    return this.formDetailPlanification.controls['endedTime'];
  }

  get observationField() {
    return this.formDetailPlanification.controls['observation'];
  }

  get planificationField() {
    return this.formDetailPlanification.controls['planificationId'];
  }

  get instructorField() {
    return this.formDetailPlanification.controls['instructorId'];
  }

  get startedTimeField() {
    return this.formDetailPlanification.controls['startedTime'];
  }

  loadDays() {
    this.courseService.getCatalogues('DAY').subscribe(
      response => {
        this.days = response;
      }, error => {
        this.messageService.error(error);
      }
    );
  }

  loadWorkdays() {
    this.courseService.getCatalogues('WORKDAY').subscribe(
      response => {
        this.workdays = response;
      }, error => {
        this.messageService.error(error);
      }
    );
  }

  loadClassrooms() {
    this.courseService.getClassrooms().subscribe(
      response => {
        this.classrooms = response;
      }, error => {
        this.messageService.error(error);
      }
    );
  }

  loadParallels() {
    this.courseService.getCatalogues('PARALLEL_NAME').subscribe(
      response => {
        this.parallels = response;
      }, error => {
        this.messageService.error(error);
      }
    );
  }

  loadInstructors() {
    this.courseService.getInstructors().subscribe(
      response => {
        this.instructors= response
      }
    )
  }
}
