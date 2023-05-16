import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { CourseModel, InstructorModel } from '@models/cecy';
import { MessageService } from '@services/core';
import { CourseHttpService, DetailPlanificationHttpService, InstructorHttpService, ProfileInstructorCourseHttpService } from '@services/cecy';

@Component({
  selector: 'app-assignment-instructors-form',
  templateUrl: './assignment-instructors-form.component.html',
  styleUrls: ['./assignment-instructors-form.component.scss']
})
export class AssignmentInstructorsFormComponent implements OnInit, OnDestroy {
  sourceList: InstructorModel[] = [];
  targetList: InstructorModel[] = [];
  selectedInstructorsIds: number[] = [];
  course: any;

  private course$ = this.courseHttpService.course$;
  private subscriptions: Subscription[] = [];

  public progressBar: boolean = false;
  @Output() dialogList = new EventEmitter<boolean>();

  constructor(private instructorHttpService: InstructorHttpService,
    private messageService: MessageService,
    private detailPlanificationHttpService: DetailPlanificationHttpService,
    private courseHttpService: CourseHttpService,
    private profileInstructorCourseHttpService: ProfileInstructorCourseHttpService
  ) { }

  ngOnInit() {
    this.loadDetailPlanification();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  loadDetailPlanification() {
    this.subscriptions.push(
      this.course$
        .subscribe(response => {
          this.course = response;
          console.log(this.course)
          this.loadInstructors();
        }));
  }

  loadInstructors() {
    this.subscriptions.push(this.instructorHttpService
      .getAuthorizedInstructorsOfCourse(this.course.id)
      .subscribe(response => {
        this.sourceList = response.data;
        console.log(response);
      }));

    this.subscriptions.push(this.instructorHttpService
      .getAssignedInstructorsOfProfile(this.course.id)
      .subscribe(response => {
        this.targetList = response.data;
      }));
  }

  onSubmit() {
    this.progressBar = true;
    this.subscriptions.push(
      this.profileInstructorCourseHttpService
        .assignInstructors(this.course.id, this.instructorHttpService.mapInstructors(this.targetList))
        .subscribe({
          next: response => {
            this.messageService.success(response);
            this.progressBar = false;
            this.dialogList.emit(false);
          },
          error: error => {
            this.messageService.error(error);
            this.progressBar = false;
          }
        }));
  }

}
