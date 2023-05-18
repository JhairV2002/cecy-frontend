import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CourseService } from '@services/cecy-v1/course.service';
import { CatalogueModel } from '@models/cecy';
import { ClassroomModel } from '@models/cecy-v1/classroom.model';
import { MessageService } from '@services/core';
import { ActivatedRoute } from '@angular/router';
import { DetailPlanModel } from '@models/cecy-v1/detailPlan.model';

@Component({
  selector: 'app-add-form-horarios',
  templateUrl: './add-form-horarios.component.html',
  styleUrls: ['./add-form-horarios.component.scss'],
})
export class AddFormHorariosComponent implements OnInit, OnChanges {
  @Output() clickClose = new EventEmitter<boolean>();
  @Output() addUser = new EventEmitter<any>();
  @Input() dialogForm: boolean = true;
  @Input() selectedUser: any;
  @Input() courseDate: any;
  @Input() horarioSelect: any;

  days: CatalogueModel[] = [];
  workdays: CatalogueModel[] = [];
  classrooms: ClassroomModel[] = [];
  parallels: CatalogueModel[] = [];

  formHourCourse = this.fb.group({
    planificationCourseId: [null],
    classroomId: [null, Validators.required],
    dayId: [null, Validators.required],
    endedTime: [null, Validators.required],
    observation: ['', Validators.required],
    parallelId: [null, Validators.required],
    startedTime: [null, Validators.required],
    workdayId: [null, Validators.required],
  });
  progressBar: boolean = false;
  detailPlanifications: DetailPlanModel[] = [];

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    public messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadDays();
    this.loadWorkdays();
    this.loadClassrooms();
    this.loadParallels();
    this.getHorarios();
  }

  ngOnChanges() {
    if (this.horarioSelect) {
      this.formHourCourse.patchValue(this.horarioSelect);
    } else {
      this.formHourCourse.reset();
    }
  }

  getHorarios() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.courseService.getDetailAllCourses(id).subscribe((data) => {
      console.log('Horarios depende la planificacion', data);
      this.formHourCourse.patchValue(data.value);
    });
  }

  addEditHorario() {
    this.planificationCourseId = this.courseDate.id;
    const valuesFormHourCourse = this.formHourCourse.value;
    this.courseService.saveEditDetailPlan(valuesFormHourCourse, this.horarioSelect).subscribe({
      next: (data) => {
        console.log('Se esta guardando el horario', data);
        this.messageService.successCourse(data);
        this.clickClose.emit(false);
        this.addUser.emit(data);
      },
      error: (error) => {
        console.log(error);
        this.messageService.errorValid(error);
        this.progressBar = false;
      },
    });
  }

  onSubmit() {
    if (this.formHourCourse.valid) {
      this.addEditHorario();
      console.log('Se esta guardando la información de los horarios');
    } else {
      this.formHourCourse.markAllAsTouched();
    }
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  loadDays() {
    this.courseService.getCatalogues('DAY').subscribe(
      (response) => {
        this.days = response;
      },
      (error) => {
        this.messageService.error(error);
      }
    );
  }

  loadWorkdays() {
    this.courseService.getCatalogues('WORKDAY').subscribe(
      (response) => {
        this.workdays = response;
      },
      (error) => {
        this.messageService.error(error);
      }
    );
  }

  loadClassrooms() {
    this.courseService.getClassrooms().subscribe(
      (response) => {
        console.log('loadClassroms', response);

        this.classrooms = response;
      },
      (error) => {
        this.messageService.error(error);
      }
    );
  }

  loadParallels() {
    this.courseService.getCatalogues('PARALLEL_NAME').subscribe(
      (response) => {
        this.parallels = response;
      },
      (error) => {
        this.messageService.error(error);
      }
    );
  }

  closeModal() {
    this.clickClose.emit(false);
    this.selectedUser = null;
    this.formHourCourse.reset();
  }

  set planificationCourseId(value: any) {
    this.formHourCourse.patchValue({
      planificationCourseId: value,
    });
  }

  get dayField() {
    return this.formHourCourse.controls['dayId'];
  }

  get classroomField() {
    return this.formHourCourse.controls['classroomId'];
  }

  get parallelField() {
    return this.formHourCourse.controls['parallelId'];
  }

  get workdayField() {
    return this.formHourCourse.controls['workdayId'];
  }

  get endedTimeField() {
    return this.formHourCourse.controls['endedTime'];
  }

  get observationField() {
    return this.formHourCourse.controls['observation'];
  }

  get planificationField() {
    return this.formHourCourse.controls['planificationCourseId'];
  }

  get startedTimeField() {
    return this.formHourCourse.controls['startedTime'];
  }
}
