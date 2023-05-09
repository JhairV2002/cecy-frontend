import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { DetailPlanificationModel, InstructorModel } from '@models/cecy';
import { MessageService } from '@services/core';
import { DetailPlanificationHttpService, InstructorHttpService } from '@services/cecy';

@Component({
  selector: 'app-assignment-instructors-form',
  templateUrl: './assignment-instructors-form.component.html',
  styleUrls: ['./assignment-instructors-form.component.scss']
})
export class AssignmentInstructorsFormComponent implements OnInit, OnDestroy {
  sourceList: InstructorModel[];
  targetList: InstructorModel[];
  selectedInstructorsIds: number[] = [];
  detailPlanification: DetailPlanificationModel;

  private detailPlanification$ = this.detailPlanificationHttpService.detailPlanification$;
  private subscriptions: Subscription[] = [];

  public progressBar: boolean = false;
  @Output() dialogList = new EventEmitter<boolean>();

  constructor(private instructorHttpService: InstructorHttpService,
    private messageService: MessageService,
    private detailPlanificationHttpService: DetailPlanificationHttpService,
  ) { }

  ngOnInit() {
    this.loadDetailPlanification();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  loadDetailPlanification() {
    this.subscriptions.push(
      this.detailPlanification$
        .subscribe(response => {
          this.detailPlanification = response;
          console.log(this.detailPlanification)
          this.loadInstructors();
        }));
  }

  loadInstructors() {
    this.subscriptions.push(this.instructorHttpService
      .getAuthorizedInstructorsOfCourse(this.detailPlanification.planification.course.id)
      .subscribe(response => {
        this.sourceList = response.data;
        console.log(response);
      }));

    this.subscriptions.push(this.instructorHttpService
      .getAssignedInstructors(this.detailPlanification.id)
      .subscribe(response => {
        this.targetList = response.data;
      }));
  }

  onSubmit() {
    this.progressBar = true;
    // if (this.targetList.length <= 0) {
    //   this.progressBar = false;
    //   return;
    // }

    this.subscriptions.push(
      this.detailPlanificationHttpService
        .assignInstructors(this.detailPlanification.id, this.instructorHttpService.mapInstructors(this.targetList))
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
