import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginatorModel } from '../../../../models/core/paginator.model';
import { RegistrationHttpService } from '../../../../services/cecy/registration-http.service';
import { MessageService } from '@services/core';
import { RegistrationModel } from '@models/cecy';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-grades-participant',
  templateUrl: './view-grades-participant.component.html',
  styleUrls: ['./view-grades-participant.component.scss']
})
export class ViewGradesParticipantComponent implements OnInit {


  @Output() openParticipantCourse = new EventEmitter<boolean>();
  @Input('participantCourse') participantCourse: RegistrationModel = {};

  registrations$ = this.courseHttpService.registrations$;
  registration$ = this.courseHttpService.registration$;

  loaded$ = this.courseHttpService.loaded$;
  paginator$ = this.courseHttpService.paginator$;

  registration: RegistrationModel = {};
  registrations: RegistrationModel[] = [];

  dialogForm: boolean = false; // optional
  progressBarDelete: boolean = false;// optional
  paginator: PaginatorModel = {};// optional
  registrationId: any;


  constructor(private courseHttpService: RegistrationHttpService,
    public messageService: MessageService,
    private activatedRoute: ActivatedRoute,

  ) {
    this.registrationId = this.activatedRoute.snapshot.params['id'];
    this.paginator$.subscribe(response => {
      this.paginator = response;
    });
  }
  ngOnInit(): void {

  }
}
