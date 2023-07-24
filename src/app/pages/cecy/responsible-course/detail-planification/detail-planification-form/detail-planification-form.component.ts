import { CourseService } from '@services/cecy-v1/course.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { MessageService } from '@services/core';
import { CatalogueModel } from '@models/cecy';
import { DetailPlanificationHttpService } from '@services/cecy';
import { ActivatedRoute } from '@angular/router';
import { ClassroomModel } from '@models/cecy-v1/classroom.model';
import { DetailPlanModel } from '@models/cecy-v1/detailPlan.model';

@Component({
  selector: 'app-detail-planification-form',
  templateUrl: './detail-planification-form.component.html',
  styleUrls: ['./detail-planification-form.component.scss'],
})
export class DetailPlanificationFormComponent implements OnInit {
  @Input() data: any;
  @Input() planId: number = 0;

  @Output() dialogForm = new EventEmitter<boolean>();
  private detailPlanification$ =
    this.detailPlanificationHttpService.detailPlanification$;
  public formDetailPlanification: FormGroup = this.newFormDetailPlanification;
  public progressBar: boolean = false;

  public days: CatalogueModel[] = [];
  public workdays: CatalogueModel[] = [];
  public classrooms: ClassroomModel[] = [];
  public parallels: CatalogueModel[] = [];
  planificationId: number = 0;
  instructors: any;

  porcentaje: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private detailPlanificationHttpService: DetailPlanificationHttpService,
    private formBuilder: FormBuilder,
    public messageService: MessageService,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.getDetailPlanification();

    this.loadDays();
    this.loadWorkdays();
    this.loadClassrooms();
    this.loadParallels();
    this.loadInstructors();
  }

  get newFormDetailPlanification(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      dayId: [null, Validators.required],
      classroomId: [null],
      parallelId: [null],
      planificationCourseId: [null],
      workdayId: [null, Validators.required],
      endedTime: [null, [Validators.required]],
      observation: [null, Validators.maxLength(255)],
      startedTime: [null, Validators.required],
      stateId: [null],
    });
  }

  getDetailPlanification() {
    // console.warn('esta en detail:', this.data)
    // this.courseService.getDetailPlan(this.data.id).subscribe((response) => {
    this.formDetailPlanification.patchValue(this.data);
    this.calculoPorcentaje();
    // });

  }


  onSubmit() {
    if (this.horaValidator()) {
      this.messageService.warningAlert('Revisa la hora de inicio y fin');
      return;
    }
    this.formDetailPlanification.patchValue({
      planificationCourseId: this.planId,
    });
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
    this.courseService.saveDetailPlan(detailPlanification).subscribe({
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
    this.courseService.updateDetailPlan(detailPlanification).subscribe({
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

  get startedTimeField() {
    return this.formDetailPlanification.controls['startedTime'];
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

  loadInstructors() {
    this.courseService.getInstructors().subscribe((response) => {
      this.instructors = response;
    });
  }

  // getProgressStyle() {

  //   return {
  //     width: this.calculoPorcentaje("2023-06-01T05:00:00.000Z","2023-06-30T05:00:00.000Z","weekends","12:12:00","15:12:00" ) + '%'
  //   };
  // }

  calculoPorcentaje() {
    try {
      const startDate = new Date(this.data.planificationCourse.startDate);
      const finishDate = new Date(this.data.planificationCourse.finishDate);
      const workDay = this.data.day.code;

      let totalMinuts = this.calcularMinuts(this.data.startedTime, this.data.endedTime)
      console.log("minuts:", totalMinuts);
      totalMinuts = totalMinuts < 0 ? 0 : totalMinuts;

      const diasLaborables = this.calcularDiasLaborables(startDate, finishDate, workDay);
      console.log("Días laborables:", diasLaborables);

      this.porcentaje = (((totalMinuts / 60) * diasLaborables) / this.data.planificationCourse.durationTime) * 100
      if (this.porcentaje > this.data.planificationCourse.durationTime) {
        this.porcentaje = 100
      }
      this.porcentaje = this.porcentaje.toFixed(0)
    } catch (error) {
      this.porcentaje=0
    }
  }

  calcularDiasLaborables(startDate: Date, finishDate: Date, workDay: string): number {
    let diasLaborables = 0;
    const diaInicio = new Date(startDate);
    const diaFin = new Date(finishDate);

    while (diaInicio <= diaFin) {
      const diaSemana = diaInicio.getDay();
      if (this.esDiaLaborable(diaSemana, workDay)) {
        diasLaborables++;
      }
      diaInicio.setDate(diaInicio.getDate() + 1);
    }

    return diasLaborables;
  }

  esDiaLaborable(diaSemana: number, workDay: string): boolean {
    if (workDay === "MONDAY-FRIDAY") {
      return diaSemana >= 1 && diaSemana <= 5; // De lunes a viernes
    } else if (workDay === "SATURDAYS") {
      return diaSemana === 6; // Solo sábado
    } else if (workDay === "SUNDAYS") {
      return diaSemana === 0; // Solo domingo
    } else if (workDay === "WEEKENDS") {
      return diaSemana === 0 || diaSemana === 6; // Fines de semana (sábado y domingo)
    } else if (workDay === "MONDAY-SUNDAY") {
      return diaSemana >= 0; // todos los dias
    }

    // Si workDay no coincide con ninguna configuración conocida, se considera que todos los días son laborables
    return true;
  }

  calcularMinuts(startedTime: any, endTime: any) {
    const startTimeParts = startedTime.split(":");
    const startHours = parseInt(startTimeParts[0]);
    const startMinutes = parseInt(startTimeParts[1]);

    const endTimeParts = endTime.split(":");
    const endHours = parseInt(endTimeParts[0]);
    const endMinutes = parseInt(endTimeParts[1]);

    const totalStartMinutes = startHours * 60 + startMinutes;
    const totalEndMinutes = endHours * 60 + endMinutes;

    const durationInMinutes = totalEndMinutes - totalStartMinutes;

    console.log("Duration in minutes:", durationInMinutes);

    return durationInMinutes;
  }

  horaValidator() {
    const startedTime = this.formDetailPlanification.get('startedTime')?.value;
    const endedTime = this.formDetailPlanification.get('endedTime')?.value;
    console.log('data input', startedTime, ' ', endedTime)
    if (endedTime < startedTime) {
      return true;
    }
    return false;
  }
}
