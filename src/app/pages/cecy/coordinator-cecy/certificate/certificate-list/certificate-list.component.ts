import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {CertificateModel, PlanificationModel, RegistrationModel} from '@models/cecy';
import {CertificateHttpService, CourseHttpService, RegistrationHttpService} from '@services/cecy';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService, MessageService, UserAdministrationHttpService} from '@services/core';
import {CatalogueModel, FileModel, LocationModel, PaginatorModel, PhoneModel, UserModel} from '@models/core';
import { CertificateService } from '@services/cecy/certificate.service';


@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['./certificate-list.component.scss'],

})
export class CertificateListComponent implements OnInit {
  public files: FileModel[] = [];
  public paginatorFiles: PaginatorModel = {current_page: 1, per_page: 15, total: 0};
  public filterFiles: FormControl = new FormControl();
  public displayModalFiles: boolean = false;
  public displayModalFiles2: boolean = false;
  public loadingUploadFiles: boolean = false;
  public loadingFiles: boolean = false;
  

  private user$ = this.userAdministrationHttpService.user$;
  userId: any;

  registrations: RegistrationModel[] = [];
  registrations$ = this.registrationHttpService.registrations$;

  certificates: CertificateModel[] = [];
  certificate$ = this.certificateService.certificates$;

  first = 0;
  rows = 10;
  display: boolean = false;


  public identificationTypes: CatalogueModel[] = [];

  constructor(private registrationHttpService: RegistrationHttpService,
              private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private userAdministrationHttpService: UserAdministrationHttpService,
              private certificateService: CertificateService,
              private certificateHttpService: CertificateHttpService,

              public messageService: MessageService) {
  }

  ngOnInit(): void {
    // this.loadCourses();
    this.loadDatesCertificate();
  }

  showDialog() {
    this.display = true;
  }

  loadCourses(id: number = 1) {
    this.registrations$ = this.registrationHttpService.loadParticipant(id);
    this.registrations$.subscribe(response => {
      this.registrations = response.data;
      console.log(this.registrations);
    });
  }


  // FILES------------------------------------------------------------------------------------------------------>

  downloadMyFile() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'assets/images/components/authentication/login/logo.png');
    link.setAttribute('download', `logo.png`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }


  loadFiles() {
    this.userId = this.authService.user.id
    console.log(this.userId)
    this.certificateHttpService.getFiles(this.userId, this.paginatorFiles, this.filterFiles.value).subscribe(
      (response) => {
        this.files = response.data;
      }
    )
  }

  loadFiles2() {
    this.userId = this.authService.user.id
    console.log(this.userId)
    this.certificateHttpService.getFiles(this.userId, this.paginatorFiles, this.filterFiles.value).subscribe(
      (response) => {
        this.files = response.data;
      }
    )
  }


  uploadFiles(event: any) {
    this.userId = this.authService.user.id
    const formData = new FormData();
    for (const file of event) {
      formData.append('files[]', file);
    }

    this.certificateHttpService.uploadFiles(this.userId, formData).subscribe(response => {
      // this.getPayments();
      this.messageService.success(response);
    });
  }

  showModalFiles() {
    this.loadFiles();
    this.displayModalFiles = true;
  }

  showModalFiles2() {
    this.loadFiles2();
    this.displayModalFiles2 = true;
  }

  loadDatesCertificate() {
    this.certificate$ = this.certificateService.getCertificate();
    this.certificate$.subscribe(response => {
      this.certificates = response.data;
      console.log(this.certificates);
    });
  }

}
