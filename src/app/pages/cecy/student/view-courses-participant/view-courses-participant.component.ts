import { Component, OnInit } from '@angular/core';
import { PaginatorModel } from '../../../../models/core/paginator.model';
import { CatalogueModel } from '../../../../models/cecy/catalogue.model';
import { RegistrationHttpService } from '../../../../services/cecy/registration-http.service';
import { MessageService } from '@services/core';
import { PlanificationHttpService } from '../../../../services/cecy/planification-http.service';
import { PlanificationModel, RegistrationModel, RequirementModel } from '@models/cecy';
import { CatalogueHttpService } from '../../../../services/cecy/catalogue-http.service';
import { Router } from '@angular/router';
import { CertificateService } from '@services/cecy/certificate.service';

import { MenuItem } from 'primeng/api';
import { AttendanceHttpService, DetailAttendanceHttpService } from '@services/cecy';

@Component({
  selector: 'app-view-courses-participant',
  templateUrl: './view-courses-participant.component.html',
  styleUrls: ['./view-courses-participant.component.scss']
})
export class ViewCoursesParticipantComponent implements OnInit {

  planifications$ = this.courseHttpService.planifications$;
  planification$ = this.courseHttpService.planification$;

  registrations$ = this.courseHttpService.registrations$;
  registration$ = this.courseHttpService.registration$;

  catalogues$ = this.catalogueHttpService.catalogues$;
  catalogue$ = this.catalogueHttpService.catalogue$;

  loaded$ = this.courseHttpService.loaded$;
  paginator$ = this.courseHttpService.paginator$;

  registration: RegistrationModel = {};
  registrations: RegistrationModel[] = [];
  catalogues: CatalogueModel[] = [];
  planification: PlanificationModel[] = [];
  certificate : CertificateService[] = [];

  dialogForm: boolean = false; // optional
  progressBarDelete: boolean = false;
  paginator: PaginatorModel = {};
  rowData: number = 0;
  items: MenuItem[] = []; // optional

  selectedParticipantCourse: RegistrationModel = {};

  openParticipantCourse: boolean = false; // optional

  constructor(private courseHttpService: RegistrationHttpService,
    private catalogueHttpService: CatalogueHttpService,
    public messageService: MessageService,
    public planificationHttpService: PlanificationHttpService,
    private router: Router,
    public certificateService : CertificateService,
  ) {
    this.paginator$.subscribe(response => {
      this.paginator = response;
    });
      this.items = [
        {
          label: 'Notas',
          icon: 'pi pi-book',
          command: () => {
            this.loadRegistrationGrade(this.registration)

          }
        }
      ];
  }
  ngOnInit(): void {
    this.loadRegistration();
  }
  select(valor: any) {
    this.registration = valor;
   }
  loadRegistration(page: number = 1) {
    this.registrations$ = this.courseHttpService.getCoursesByParticipant(page);
    this.registrations$.subscribe(response => {
      this.registrations = response.data;
      console.log(response)
    });
  }

  loadRegistrationDetail(registration: any) {
    this.registration$ = this.courseHttpService.loadDetail(registration.id);
    this.registration$.subscribe(response => {
      this.registration = response;
      console.log(response)
    });
  }
  loadRegistrationGrade(registration: RegistrationModel) {
    this.selectedParticipantCourse = registration;
    this.openParticipantCourse = true; // optional
  }
  loadAttendances(detailAttendanceId: number) {
    this.router.navigate(['/cecy/student/view-attendances-participant/', detailAttendanceId]);
  }
  filter(event: any) {
    if (event.key === 'Enter' || event.type === 'click') {
      this.loadRegistration(1);
    }
  }
  paginate(event: any) {
    this.paginator.current_page = event.page + 1;
    this.loadRegistration(this.paginator.current_page);
  }
  downloadMyFile(){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'assets/Certificates/certificado.pdf');
    link.setAttribute('download', `certificado.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  /*download(course: number) {
    this.certificateService.downloadFileCertificates(course);
    console.log('descarga de datos ')
  }*/
  redirectTopics(courseId: number) {
    this.router.navigate(['/cecy/student/topic-course/', courseId]);
  }
}
