import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlanificationModel, DetailPlanificationModel, TopicModel, PrerequisiteModel, RegistrationModel } from '@models/cecy';
import { TopicHttpService, PrerequisiteHttpService } from '@services/cecy';
import { MessageService } from '@services/core';
import { RegistrationHttpService } from '../../../../../services/cecy/registration-http.service';


interface Schedules {
  idDetailPlanification?: number
  scheduleName?: string,
};

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {


  @Output() openPlanificationCourse = new EventEmitter<boolean>();
  @Input('planificationCourse') planificationCourse: PlanificationModel = {};

  public formSchedule: FormGroup = this.newFormSchedule;

  detailPlanifications: DetailPlanificationModel[] = [];
  schedules: Schedules[] = [];
  topics: TopicModel[] = [];
  prerequistes: PrerequisiteModel[] = [];
  selectedSchedule: Schedules = {}
  registrationControl: Boolean = false;

  constructor(
    private registrationHttpService: RegistrationHttpService,
    private formBuilder: FormBuilder,
    private topicHttpService: TopicHttpService,
    private prerequisiteHttpService: PrerequisiteHttpService,
    public messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadTopicsAndSubtopics();
    this.loadPrerequisites();
    this.loadSchedules();
  }

  get newFormSchedule(): FormGroup {
    return this.formBuilder.group({
      schedule: [null, [Validators.required]],
    });
  }
  checkRegistrations(schedules: Schedules[])
  {
    //Por cada paralelo verifico si el participante ya se encuentra o no matriculado
    schedules.forEach(schedule => {
      this.registrationHttpService.getRegistrationsByDetailPlanificationAndParticipant(schedule.idDetailPlanification).subscribe(
        response =>{
          //Significa que ya esta registrado en alguno de los paralelos
          if (response.data.length>0){
            this.registrationControl = true
          }
        },error =>{
          this.messageService.error(error);
        }
      )
    });
  }

  loadSchedules() {
    this.detailPlanifications = this.planificationCourse.detailPlanifications!;
    console.log(this.detailPlanifications);
    this.detailPlanifications.forEach(detailPlanification => {
      this.schedules.push({
        idDetailPlanification: detailPlanification.id!,
        scheduleName: `${detailPlanification.day?.name!} :  ${detailPlanification.startedTime!} - ${detailPlanification.endedTime!}`
      })
    });
    this.checkRegistrations(this.schedules);
  }

  loadTopicsAndSubtopics() {
    this.topicHttpService.getTopics(1, '', 2).subscribe(
      response => {
        this.topics = response.data;
        console.log(this.topics);
      }, error => {
        this.messageService.error(error);
      }
    )
  }

  loadPrerequisites() {
    this.prerequisiteHttpService.getPrerequisites(1, '', this.planificationCourse.course?.id!).subscribe(
      response => {
        this.prerequistes = response.data;
        console.log(this.prerequistes);
      }, error => {
        this.messageService.error(error);
      }
    )
  }
  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  roadToRegistration() {
    if (this.formSchedule.valid) {
      this.router.navigate(['/cecy/student/registration-course/', this.selectedSchedule.idDetailPlanification]);
    } else {
      this.formSchedule.markAllAsTouched();
    }
  }

  get scheduleField() {
    return this.formSchedule.controls['schedule'];
  }
}
