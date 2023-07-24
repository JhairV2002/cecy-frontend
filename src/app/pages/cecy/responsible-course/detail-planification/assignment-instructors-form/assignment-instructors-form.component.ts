import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { MessageService } from '@services/core';
import { DetailPlanificationHttpService } from '@services/cecy';

@Component({
  selector: 'app-assignment-instructors-form',
  templateUrl: './assignment-instructors-form.component.html',
})
export class AssignmentInstructorsFormComponent implements OnInit, OnDestroy {
  sourceList: any[] = [];
  targetList: any[] = [];
  selectedInstructorsIds: number[] = [];
  detailPlanification: any;

  private detailPlanification$ =
    this.detailPlanificationHttpService.detailPlanification$;
  private subscriptions: Subscription[] = [];

  public progressBar: boolean = false;
  @Output() dialogList = new EventEmitter<boolean>();

  constructor(
    private messageService: MessageService,
    private detailPlanificationHttpService: DetailPlanificationHttpService
  ) {}

  ngOnInit() {
    this.loadDetailPlanification();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  loadDetailPlanification() {
    this.subscriptions.push(
      this.detailPlanification$.subscribe((response) => {
        this.detailPlanification = response;
        console.log(this.detailPlanification);
      })
    );
  }

  onSubmit() {
    this.progressBar = true;
    // if (this.targetList.length <= 0) {
    //   this.progressBar = false;
    //   return;
    // }
  }
}
