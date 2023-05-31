import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ColModel, PaginatorModel, ParticipantModel, PlanificationModel, RegistrationModel, SchoolPeriodModel } from '@models/cecy';
import { ParticipantHttpService, PlanificationHttpService, DetailPlanificationHttpService } from '@services/cecy';
import { RegistrationHttpService } from '@services/cecy/registration-http.service';
import { MessageService } from '@services/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-registration-management-list',
  templateUrl: './registration-management-list.component.html',
  styleUrls: ['./registration-management-list.component.scss']
})
export class RegistrationManagementListComponent implements OnInit {

/*DDRC-C: observables */
participants$ = this.detailPlanificationHttpService.participants$;
participant$ = this.detailPlanificationHttpService.participant$;
loaded$ = this.detailPlanificationHttpService.loaded$;
paginator$ = this.detailPlanificationHttpService.paginator$;
/*DDRC-C: dropdown variables */
schoolPeriods: SchoolPeriodModel[] = [];
selectedSchoolPeriod: SchoolPeriodModel = {}; //for future schoolPeriods
selectedPlanifications: PlanificationModel[] = [];
selectedPlanification: any;
selectedParticipants: ParticipantModel[] = [];
selectedParticipant: ParticipantModel = {};
selectedRegisteredParticipants: ParticipantModel[] = [];
cols: any[];
items: MenuItem[] = [];
dialogForm: boolean = false;
dialogForm1: boolean = false;
Action: string = '';
progressBarDelete: boolean = false;
search: FormControl = new FormControl('');
paginator: PaginatorModel = {};
planificationList: any[] = [];
customPlanificationList: any = {ids:[],observations:''};
ID=this.route.snapshot.params['IDDT'];

/*DDRC-C: route variables */
idDetailPlanification:number = 0;

constructor(private detailPlanificationHttpService: DetailPlanificationHttpService,
  private registrationHttpService: RegistrationHttpService,
  private planificationHttpService: PlanificationHttpService,
  public messageService: MessageService,
  private router: Router,
  private route: ActivatedRoute) {
  this.cols = [
    { field: 'participant', subfield: 'username', header: 'Cédula' },
    { field: 'participant', subfield: 'name', header: 'Nombres' },
    { field: 'participant', subfield: 'lastname', header: 'Apellidos' },
    { field: 'participant', subfield: 'type', header: 'Tipo de participante' },
    { field: 'state', header: 'Estado de matriculación' },
    { field: 'type', header: 'Tipo de Matrícula' },
    { field: 'observations', header: 'Observaciones' },
  ];
  this.paginator$.subscribe(response => {
    this.paginator = response;
  });
}

showNullifyForm(participant:ParticipantModel={}) {
  this.registrationHttpService.selectRegistration(participant);
  this.dialogForm1 = true;
}

selectParticipant(participant: RegistrationModel) {
  this.selectedParticipant = participant;
}

ngOnInit(): void {
  this.loadPlanifications();
}

download() {
  this.registrationHttpService.downloadReportRecordCompetitors(this.idDetailPlanification);
}

loadParticipants(page:number =1) {
  this.participants$ = this.detailPlanificationHttpService.getParticipantsByDetailPlanification(this.idDetailPlanification,page,this.search.value);
}

reloadRegistrations(event:any,page:number=1) {
  console.log(event)
  this.idDetailPlanification=event.id;
  // DDRC-C: la siguiente line la conservo por si no es necesario hacer que la pagina se actualice
  this.participants$ = this.detailPlanificationHttpService.getParticipantsByDetailPlanification(this.idDetailPlanification,page,this.search.value);
}

loadPlanifications() {
  this.planificationHttpService.getPlanificationsByPeriodState().subscribe(response => {
    this.selectedPlanifications = response.data;
    response.data.forEach((planification: any) => {
      planification.detailPlanifications.forEach((detailPlanification: any) => {
        let custom: any = {};
        custom.id = detailPlanification.id;
        custom.cpw = `${planification.course?.name}-> ${detailPlanification.workday?.name} "${detailPlanification.parallel?.name}"`;
        this.planificationList.push(custom);
      });
    });
    if (this.ID===undefined) {
      this.idDetailPlanification=this.planificationList[0].id;
      this.selectedPlanification=this.planificationList[0];
      this.loadParticipants();
    } else {
      let actualplanification=this.planificationList.find((element)=>{return element.id== this.ID});
  this.selectedPlanification=actualplanification;
      this.idDetailPlanification=this.ID;
      this.loadParticipants();
    }
  });
}

goToRegistrationForm(registration: RegistrationModel = {}, ){

  // registration.detailPlanification.id=this.idDetailPlanification;
  this.selectedParticipant = registration;
  this.registrationHttpService.selectRegistration(registration);
  this.router.navigate([`/cecy/responsible-course/registration/${registration.id}`])
}

filter(event: any,event1:any) {
  console.log(event);
  if (event.key === 'Enter' || event.type === 'click') {
    this.reloadRegistrations(event1);
  }
}

paginate(event: any,event1:any) {
  this.paginator.current_page = event.page + 1;
  this.reloadRegistrations(event1);
}
}
