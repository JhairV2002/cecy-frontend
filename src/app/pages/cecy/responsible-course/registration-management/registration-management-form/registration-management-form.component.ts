import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorModel, PivotRequirementModel, RequirementModel } from '@models/cecy';
import { FileModel } from '@models/core';
import { ParticipantHttpService } from '@services/cecy';
import { RegistrationHttpService } from '@services/cecy/registration-http.service';
import {  MessageService } from '@services/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-registration-management-form',
  templateUrl: './registration-management-form.component.html',
  styleUrls: ['./registration-management-form.component.scss']
})
export class RegistrationManagementFormComponent implements OnInit {
//propiedades
worked: boolean = true;
public progressBar: boolean = false;
customRegistration: any = {};
autoResize: boolean = true;
showButtons:boolean=true;
requirementlist:any;
detailPlanificationID:any;
registrationId:any;
ID=this.activatedRoute.snapshot.params['id'];

//Files
public files: FileModel[] = [];
public paginatorFiles: PaginatorModel = { current_page: 1, per_page: 15, total: 0 };
public filterFiles: FormControl = new FormControl();
public displayModalFiles: boolean = false;
public loadingUploadFiles: boolean = false;
public loadingFiles: boolean = false;


constructor(
  private formBuilder: FormBuilder,
  private registrationHttpService: RegistrationHttpService,
  public messageService: MessageService,
  private activatedRoute: ActivatedRoute,
  private router: Router,
) {}

ngOnInit(): void {
  this.loadRegistration()
}

// DDRC-C:descargar requisitos
 downloadDocument(requirement:any){
  const link = document.createElement('a');
  link.setAttribute('target', '_blank');
  link.setAttribute('href', requirement.pivot.url);
  link.setAttribute('download', requirement.pivot.url.split('/').pop());
  document.body.appendChild(link);
  link.click();
  link.remove();
 }

return(){
  this.router.navigate([`/cecy/responsible-course/registrations`,{IDDT:this.detailPlanificationID}]);
}

loadRegistration(){
  this.registrationHttpService.getRegistration(this.ID).subscribe(response => {
    console.log(response.data);
    this.requirementlist= response.data.requirements;
        this.detailPlanificationID = response.data.detailPlanificationId;
        this.customRegistration=response.data
  },
  error => {
    this.messageService.error(error);
  });
}


//validador campos requeridos
isRequired(field: AbstractControl): boolean {
  return field.hasValidator(Validators.required);
}

downloadRequirement(pivot: any) {

  this.registrationHttpService.downloadRequirement(pivot.registration_id,pivot.id);
  }

downloadFile(file: FileModel) {
  this.registrationHttpService.downloadFile(file);
  }

loadFiles() {
  this.registrationHttpService.getFiles(1, this.paginatorFiles, this.filterFiles.value).subscribe(
    (response) => {
      this.files = response.data;
    }
  )
}

showModalFiles() {
  this.loadFiles();
  this.displayModalFiles = true;
}

uploadFiles(event: any) {
  const formData = new FormData();
  for (const file of event) {
    formData.append('files[]', file);
  }

  this.registrationHttpService.uploadFiles(1, formData).subscribe(response => {
    this.messageService.success(response);
  });
}

uploadOtherFile(event: any) {
  const formData = new FormData();
  for (const file of event) {
    formData.append('file', file);
  }

  this.registrationHttpService.uploadOtherFile(formData).subscribe(response => {
    this.messageService.success(response);
  });
}

uploadOtherIdFile(event: any) {
  const formData = new FormData();
  for (const file of event) {
    formData.append('file', file);
  }
}

}
