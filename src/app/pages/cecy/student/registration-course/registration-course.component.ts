import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CatalogueHttpService, RegistrationHttpService} from "@services/cecy";
import {MessageService} from "@services/core";
import {Subject, takeUntil} from "rxjs";
import {CatalogueModel as CecyCatalogueModel, RegistrationStudentModel} from "@models/cecy";
import {FileModel, PaginatorModel} from "@models/core";


@Component({
  selector: 'app-registration-course',
  templateUrl: './registration-course.component.html',
  styleUrls: ['./registration-course.component.scss']
})
export class RegistrationCourseComponent implements OnInit {

  //files
  public files: FileModel[] = [];
  public paginatorFiles: PaginatorModel = { current_page: 1, per_page: 15, total: 0 };
  public filterFiles: FormControl = new FormControl();
  public displayModalFiles: boolean = false;
  public loadingUploadFiles: boolean = false;
  public loadingFiles: boolean = false;
  dialogForms: boolean = false; // optional

  private registration$ = this.registrationHttpService.registration$;
  private unsubscribe$ = new Subject<void>();
  @Output() dialogForm = new EventEmitter<boolean>();
  public formRegistrationStudent: FormGroup = this.newFormRegistrationStudent;
  public progressBar: boolean = false;

  public levelInstructions: CecyCatalogueModel[] = [];
  public typeParticipants: CecyCatalogueModel[] = [];

  detailPlanificationId: number;
  requirements: any[]=[];


  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private registrationHttpService: RegistrationHttpService,
    private cataloguesHttpService:CatalogueHttpService,
    public messageService: MessageService,
    private router: Router,
  ) {
    console.log(this.detailPlanificationId)
    this.registration$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(response => {
        if (response.id !== undefined) {
          this.formRegistrationStudent.reset(response);
        }
        console.log(response);
        console.log(this.formRegistrationStudent);
      });
  }

  ngOnInit(): void {
    this.detailPlanificationId = this.activatedRoute.snapshot.params['id'];
    console.log(this.formRegistrationStudent.value)
    this.loadLevelInstructions();
    this.loadTypeParticipants();
  }

  get newFormRegistrationStudent(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      detailPlanificationId: [this.detailPlanificationId],
      typeParticipant: [null, [Validators.required]],
      levelInstruction: [null, [Validators.required]],
      worked: [false, [Validators.required]],
      companyActivity: [null, [Validators.required]],
      companyAddress: [null, [Validators.required]],
      companyEmail: [null, [Validators.required, Validators.email]],
      companyName: [null, [Validators.required]],
      companyPhone: [null, [Validators.required,]],
      companySponsored: [false, [Validators.required]],
      contactName: [null, [Validators.required]],
      courseKnows: [null, [Validators.required]],
      courseFollows: [null, [Validators.required]],
    });
  }

  loadLevelInstructions(page: number=1){
    this.cataloguesHttpService.getCatalogues('LEVEL_INSTRUCTION').subscribe(
      response=>{
        this.levelInstructions =response.data;
        console.log(this.levelInstructions)
      },error => {
        this.messageService.error(error);
      }
    )
  }

  loadTypeParticipants(page: number=1){
    this.cataloguesHttpService.getCatalogues('PARTICIPANT').subscribe(
      response=>{
        this.typeParticipants =response.data;
        console.log(this.typeParticipants)
      },error => {
        this.messageService.error(error);
      }
    )
  }

  onSubmit() {
    this.detailPlanificationIdField.setValue(this.activatedRoute.snapshot.params['id']);
    if (this.formRegistrationStudent.valid) {
      this.storeRegistration(this.formRegistrationStudent.value);
      this.router.navigate(['/cecy/student/courses']);
    } else {
      this.formRegistrationStudent.markAllAsTouched();
    }
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  loadFiles() {
    this.registrationHttpService.getFiles(this.idField.value, this.paginatorFiles, this.filterFiles.value).subscribe(
      (response) => {
        this.files = response.data;
        console.log(this.files)
      }
    )
  }

  uploadFiles(event: any) {
    const formData = new FormData();
    for (const file of event) {
      formData.append('files[]', file);}
      formData.append('dataStudent',JSON.stringify(this.formRegistrationStudent.value));
    console.log('ak',this.idField.value);
    this.registrationHttpService.uploadFiles(this.idField.value, formData).subscribe(response => {
      this.messageService.success(response);
    });
  }

  storeRegistration(student: any) {
    const formData = new FormData();
    for (const file of this.requirements) {
      formData.append('files[]', file);
      formData.append('dataStudent',JSON.stringify(student));
    }
    this.registrationHttpService.uploadDocumentRegistration(this.detailPlanificationId, formData).subscribe(response => {
      // this.getPayments();
      this.urlField.setValue(response.data.url);
      console.log(response);
      this.messageService.success(response);
    });
  }

  showForm(){
    this.dialogForms = true;
    this.loadFiles();
  }

  // Getters

  get urlField() {
    return this.formRegistrationStudent.controls['url'];
  }

  get idField() {
    return this.formRegistrationStudent.controls['id'];
  }

  get detailPlanificationIdField() {
    return this.formRegistrationStudent.controls['detailPlanificationId'];
  }

  get levelInstructionField() {
    return this.formRegistrationStudent.controls['levelInstruction'];
  }

  get typeParticipantField() {
    return this.formRegistrationStudent.controls['typeParticipant'];
  }

  get workedField() {
    return this.formRegistrationStudent.controls['worked'];
  }

  get companyActivityField() {
    return this.formRegistrationStudent.controls['companyActivity'];
  }

  get companyEmailField() {
    return this.formRegistrationStudent.controls['companyEmail'];
  }

  get companyAddressField() {
    return this.formRegistrationStudent.controls['companyAddress'];
  }

  get companyPhoneField() {
    return this.formRegistrationStudent.controls['companyPhone'];
  }

  get companySponsoredField() {
    return this.formRegistrationStudent.controls['companySponsored'];
  }

  get contactNameField() {
    return this.formRegistrationStudent.controls['contactName'];
  }

  get courseKnowsField() {
    return this.formRegistrationStudent.controls['courseKnows'];
  }
  get companyNameField() {
    return this.formRegistrationStudent.controls['companyName'];
  }

  get courseFollowsField() {
    return this.formRegistrationStudent.controls['courseFollows'];
  }
}
