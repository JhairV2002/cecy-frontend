import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RegistrationHttpService } from '@services/cecy/registration-http.service';
import { MessageService } from '@services/core/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FileModel, PaginatorModel } from '@models/core';
import { PivotRequirementModel } from '@models/cecy';

@Component({
  selector: 'app-registration-management-form',
  templateUrl: './registration-management-form.component.html',
  styleUrls: ['./registration-management-form.component.scss'],
})
export class RegistrationManagementFormComponent implements OnInit {
  //propiedades
  public formRegistration: FormGroup = this.newRegistrationForm;
  public progressBar: boolean = false;
  customRegistration: any = {};
  showButtons: boolean = true;
  requirementlist: any;
  detailPlanificationID: number = 0;
  registrationId: number = this.activatedRoute.snapshot.params['id'];

  //Files
  public files: FileModel[] = [];
  public paginatorFiles: PaginatorModel = {
    current_page: 1,
    per_page: 15,
    total: 0,
  };
  public filterFiles: FormControl = new FormControl();
  public displayModalFiles: boolean = false;
  public loadingUploadFiles: boolean = false;
  public loadingFiles: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private registrationHttpService: RegistrationHttpService,
    public messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRegistration();
  }

  clearTextareaValue() {
    this.formRegistration.controls['observations'].setValue('');
  }

  onSubmit(): void {
    this.progressBar = true;
    let valorFormulario = this.formRegistration.value;
    if (this.formRegistration.valid) {
      if (
        this.formRegistration.controls['observations'].value === undefined ||
        this.formRegistration.controls['observations'].value === ''
      ) {
        valorFormulario.observations = '';
        this.registrationHttpService
          .enrollParticipant(this.registrationId, valorFormulario)
          .subscribe({
            next: (response) => {
              this.messageService.success(response);
              this.return();
            },
            error: (error) => {
              this.messageService.error(error);
            },
          });
      } else {
        this.registrationHttpService
          .setInReviewParticipantRegistration(
            this.registrationId,
            valorFormulario
          )
          .subscribe(
            (response) => {
              this.messageService.success(response);
              this.return();
            },
            (error) => {
              this.messageService.error(error);
            }
          );
      }
    } else {
      this.formRegistration.markAllAsTouched();
    }
  }

  return() {
    this.router.navigate([
      `/cecy/responsible-cecy/registrations`,
      { IDDT: this.detailPlanificationID },
    ]);
  }

  loadRegistration() {
    this.registrationHttpService.getRegistration(this.registrationId).subscribe(
      (response) => {
        if (
          response.data.registrationState == 'INSCRITO' ||
          response.data.registrationState == 'RECTIFICADO'
        ) {
          this.showButtons = true;
          this.formRegistration.controls['observations'].enable();
        } else {
          this.showButtons = false;
          this.formRegistration.controls['observations'].disable();
        }
        this.requirementlist = response.data.requirements;
        this.detailPlanificationID = response.data.detailPlanificationId;
        this.formRegistration.patchValue(response.data);
        this.loadFiles();
      },
      (error) => {
        this.messageService.error(error);
      }
    );
  }

  get newRegistrationForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      companyActivity: [{ value: null, disabled: true }],
      companyAddress: [{ value: null, disabled: true }],
      companyName: [{ value: null, disabled: true }],
      companySponsored: [
        { value: { value: null, disabled: true }, disabled: true },
      ],
      email: [{ value: null, disabled: true }, [Validators.email]],
      instruction: [{ value: null, disabled: true }],
      lastname: [{ value: null, disabled: true }],
      name: [{ value: null, disabled: true }],
      observations: [{ value: null }],
      username: [{ value: null, disabled: true }],
    });
  }

  //validador campos requeridos
  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  // DDRC-C:descargar requisitos
  downloadFile(file: FileModel) {
    this.registrationHttpService.downloadFile(file);
  }

  downloadRequirement(pivot: any) {
    this.registrationHttpService.downloadRequirement(
      pivot.registration_id,
      pivot.id
    );
  }

  loadFiles() {
    this.registrationHttpService
      .getFiles(this.idField.value, this.paginatorFiles, this.filterFiles.value)
      .subscribe((response) => {
        this.files = response.data;
        console.log(this.files);
      });
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

    console.log('ak', this.idField.value);
    this.registrationHttpService
      .uploadFiles(this.idField.value, formData)
      .subscribe((response) => {
        this.messageService.success(response);
      });
  }

  uploadOtherFile(event: any) {
    const formData = new FormData();
    for (const file of event) {
      formData.append('file', file);
    }

    this.registrationHttpService
      .uploadOtherFile(formData)
      .subscribe((response) => {
        this.messageService.success(response);
      });
  }

  uploadOtherIdFile(event: any) {
    const formData = new FormData();
    for (const file of event) {
      formData.append('file', file);
    }
  }

  //getters
  get idField() {
    return this.formRegistration.controls['id'];
  }

  get emailField() {
    return this.formRegistration.controls['email'];
  }

  get nameField() {
    return this.formRegistration.controls['name'];
  }

  get lastnameField() {
    return this.formRegistration.controls['lastname'];
  }

  get usernameField() {
    return this.formRegistration.controls['username'];
  }

  get companySponsoredField() {
    return this.formRegistration.controls['companySponsored'];
  }

  get observationsField() {
    return this.formRegistration.controls['observations'];
  }

  get instructionField() {
    return this.formRegistration.controls['instruction'];
  }

  get companyNameField() {
    return this.formRegistration.controls['companyName'];
  }

  get companyAddressField() {
    return this.formRegistration.controls['companyAddress'];
  }

  get companyActivityField() {
    return this.formRegistration.controls['companyActivity'];
  }
}
