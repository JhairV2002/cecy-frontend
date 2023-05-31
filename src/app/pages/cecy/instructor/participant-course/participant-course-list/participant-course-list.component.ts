import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {RegistrationModel, RequirementModel} from '@models/cecy';
import {CourseHttpService, DetailAttendanceHttpService, RegistrationHttpService} from '@services/cecy';
import {FileModel, PaginatorModel} from "@models/core";
import {FormControl} from "@angular/forms";
import {MessageService} from "@services/core";

@Component({
  selector: 'app-participant-course-list',
  templateUrl: './participant-course-list.component.html',
  styleUrls: ['./participant-course-list.component.scss']
})
export class ParticipantCourseListComponent implements OnInit {

  registrations: RegistrationModel[] = [];
  selectedRegister: RegistrationModel = {};
  registrations$ = this.registrationHttpService.registrations$;
  dialogForm: boolean = false; // optional
  detailPlanificationId:any;
  first = 0;
  rows = 10;
  paginator: PaginatorModel = {};

  cols: any[];

  //files

  public files: FileModel[] = [];
  public paginatorFiles: PaginatorModel = { current_page: 1, per_page: 15, total: 0 };
  public filterFiles: FormControl = new FormControl();
  public displayModalFiles: boolean = false;
  public loadingUploadFiles: boolean = false;
  public loadingFiles: boolean = false;

  constructor(
    private registrationHttpService: RegistrationHttpService,
    private activatedRouter: ActivatedRoute,
    private detailHttpService: DetailAttendanceHttpService,
    private messageService: MessageService,
    private router: Router,
    ) {
      this.detailPlanificationId = this.activatedRouter.snapshot.params['id'];

      this.cols = [
        { field: 'username', header: 'Cedula' },
        { field: 'name', header: 'Nombre' },
        { field: 'email', header: 'Correo' },
        { field: 'phone', header: 'Telefono' },
        { field: 'grade1', header: 'Primer Parcial' },
        { field: 'grade2', header: 'Segundo Parcial' },
        { field: 'finalGrade', header: 'Nota Final' },

    ];

     }
  ngOnInit(): void {
    this.loadParticipants();
  }

  loadParticipants(id: number = 1) {
    this.registrations$ = this.registrationHttpService.loadParticipant(this.detailPlanificationId);
    this.registrations$.subscribe(response => {
      this.registrations = response.data;
      console.log(this.registrations);
    });
  }
  downloadMyFile(){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'assets/Certificates/Notas.xlsx');
    link.setAttribute('download', `Notas.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  showModalFiles() {
    this.loadFiles();
    this.displayModalFiles = true;
  }
  loadFiles() {
    this.detailHttpService.getFiles(this.detailPlanificationId,this.paginatorFiles, this.filterFiles.value).subscribe(
      (response) => {
        this.files = response.data;
      }
    )
  }
  downloadGrades(detail:number){
    this.registrationHttpService.downloadGrades(detail);
  }

  uploadFiles(event: any) {
    const formData = new FormData();
    for (const file of event) {
      formData.append('files[]', file);
    }
    this.detailHttpService.uploadFiles(this.detailPlanificationId, formData).subscribe(response => {
      this.messageService.success(response);
    });
  }
  uploadGrades(event: any) {
    const formData = new FormData();
    for (const file of event) {
      formData.append('excel', file);
    }
    this.registrationHttpService.updateGrades(formData).subscribe(response => {
        this.messageService.success(response);
      });
  }
  redirectAttendance(detailPlanificationId: number) {
    this.router.navigate(['/cecy/instructor/attendance', detailPlanificationId ]);
  }
  redirectCourse() {
    this.router.navigate(['/cecy/instructor/courses' ]);
  }
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.registrations ? this.first === (this.registrations.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.registrations ? this.first === 0 : true;
  }
  showForm(participant: RegistrationModel = {}){
    this.selectedRegister =  participant;
    this.dialogForm = true;
  }
  selectRegister(participant: RegistrationModel){
    this.selectedRegister =  participant;
  }
}
