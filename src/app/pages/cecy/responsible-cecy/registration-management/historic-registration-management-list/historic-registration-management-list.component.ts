import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  PaginatorModel, PlanificationModel, RegistrationModel, SchoolPeriodModel } from '@models/cecy';
import { ParticipantModel } from '@models/cecy';
import {  PlanificationHttpService,DetailPlanificationHttpService } from '@services/cecy';
import { RegistrationHttpService } from '@services/cecy/registration-http.service';
import { MessageService } from '@services/core/message.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-historic-registration-management-list',
  templateUrl: './historic-registration-management-list.component.html',
  styleUrls: ['./historic-registration-management-list.component.scss']
})
export class HistoricRegistrationManagementListComponent implements OnInit {
  
/*DDRC-C: observables */
  participants$ = this.detailPlanificationHttpService.participants$;
  participant$ = this.detailPlanificationHttpService.participant$;
  loaded$ = this.detailPlanificationHttpService.loaded$;
  paginator$ = this.detailPlanificationHttpService.paginator$;
  /*DDRC-C: dropdown variables */
  schoolPeriods: SchoolPeriodModel[] = [];
  selectedSchoolPeriod: SchoolPeriodModel = {}; //for future schoolPeriods
  selectedPlanifications: PlanificationModel[] = [];
  selectedPlanification: PlanificationModel;
  selectedParticipants: ParticipantModel[] = [];
  selectedParticipant: ParticipantModel = {};
  selectedRegisteredParticipants: ParticipantModel[] = [];
  cols: any[];
  items: MenuItem[] = [];
  dialogForm: boolean = false;
  dialogForm1: boolean = false;
  Action: string;
  progressBarDelete: boolean = false;
  search: FormControl = new FormControl('');
  paginator: PaginatorModel = {};
  planificationList: any[] = [];
  customPlanificationList: any = {ids:[],observations:''};
  
  /*DDRC-C: route variables */
  detailPlanificationID=this.route.snapshot.params['IDDT'];
  idDetailPlanification:number;

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
    this.idDetailPlanification=event.id;
    // DDRC-C: la siguiente line la conservo por si no es necesario hacer que la pagina se actualice
    this.participants$ = this.detailPlanificationHttpService.getParticipantsByDetailPlanification(this.idDetailPlanification,page,this.search.value);
  }

  loadPlanifications() {
    // DDRC-C: Obtiene las planificaciones asignadas al responsable del cecy y muestra los detalles de planificacion
    this.planificationHttpService.getPreviousPlanifications().subscribe(response => {
      this.selectedPlanifications = response.data;
      response.data.forEach(planification => {
        planification.detailPlanifications.forEach(detailPlanification => {
          let custom: any = {};
          custom.id = detailPlanification.id;
          custom.cpw = `${planification.period?.name}:${planification.course?.name}-> ${detailPlanification.workday?.name} "${detailPlanification.parallel?.name}"`;
          this.planificationList.push(custom);
        });
      });
      // DDRC-C:Precarga un detalle de planificacion
      if (this.detailPlanificationID===undefined) {
        this.idDetailPlanification=this.planificationList[0].id;
        this.selectedPlanification=this.planificationList[0];
        this.loadParticipants();
      } else {
        let actualplanification=this.planificationList.find((element)=>{return element.id== this.detailPlanificationID});
        this.selectedPlanification=actualplanification;
        this.idDetailPlanification=this.detailPlanificationID;
        this.loadParticipants();
      }
    });
  }
 
  goToRegistrationForm(registration: RegistrationModel = {}, ){
    this.router.navigate([`/cecy/responsible-cecy/historic-registration/${registration.id}`])
  }
  
  goToRegistrations(){
    this.router.navigate([`/cecy/responsible-cecy/registrations`])
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
