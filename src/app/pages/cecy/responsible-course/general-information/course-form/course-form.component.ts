
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from '@services/core/message.service';
import { CatalogueModel as CecyCatalogueModel } from '@models/cecy/catalogue.model';
import { PaginatorModel } from '@models/cecy';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '@services/cecy-v1/course.service';
import { PlanificationsCoursesService } from '@services/cecy/coordinator-career';
import { Sponsor } from '@models/cecy-v1/sponsor.model';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  @Input() selectedCourse: any;
  // private seletedCourse$ = this.coursesHttpService.seletedCourse$;
  loading$ = this.courseService.loading$;
  public progessBar: boolean = false;
  courseStatus: any = '';

  formCourse = this.fb.group({
    id: [null],
    planificationId: [null],
    // modalityId: [null, Validators.required],
    categoryId: [null, Validators.required],
    entityCertificationId: [null, Validators.required],
    courseTypeId: [null, Validators.required],
    certifiedTypeId: [null, Validators.required],
    formationTypeId: [null, Validators.required],
    abbreviation: [null, [Validators.required, Validators.maxLength(5)]],
    summary: [null, [Validators.required, Validators.maxLength(255)]],
    project: [null, [Validators.required, Validators.maxLength(255)]],
    needs: this.formBuilder.array([''], Validators.required),
    sponsorId: [null],
    targetGroups: [null, [Validators.required]],
    participantsRegistration: [null, [Validators.required]],
  });

  formSponsor = this.fb.group({
    id: [null],
    name: [null, Validators.required],
    description: [null],
  });

  formCategory = this.fb.group({
    id: [null],
    name: [null, Validators.required],
    description: [null, Validators.required],
    type: 'CATEGORY',
  });

  public progressBar: boolean = false; // falta programarlo
  public files: any[] = [];
  public paginatorImages: PaginatorModel = {
    current_page: 1,
    per_page: 15,
    total: 0,
  };
  public filterImages: FormControl = new FormControl();
  public displayModalImages: boolean = false;
  public loadingUploadImages: boolean = false;
  public loadingImages: boolean = false;
  public categories: CecyCatalogueModel[] = [];
  public certifiedTypes: CecyCatalogueModel[] = [];
  public courseTypes: CecyCatalogueModel[] = [];
  public modalities: CecyCatalogueModel[] = [];
  public formationTypes: CecyCatalogueModel[] = [];
  public entityCertifications: CecyCatalogueModel[] = [];
  public targetGroups: CecyCatalogueModel[] = [];
  public participantTypes: CecyCatalogueModel[] = [];
  public STORAGE_URL: string = '';
  public id: number = 0;
  courseId: any;
  selectedItems: any;
  public sponsors: Sponsor[] = [];
  visibleFormSponsor: boolean = false;
  visibleFormCategory: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public messageService: MessageService,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private planificationCourseService: PlanificationsCoursesService,
    public fb: FormBuilder
  ) {
    // const id = this.activatedRoute.snapshot.params['id'];
    // this.getCourse(id);
    // this.STORAGE_URL = environment.STORAGE_URL;
    //this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getPlanificationById();
    //cargar llaves foraneas
    this.loadCategoryCourses();
    this.loadCourseType();
    this.loadModality();
    this.loadTargetGroups();
    this.loadCertificationType();
    this.loadformationType();
    this.loadEntityCertification();
    this.loadSponsor();
  }


  getPlanificationById() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.planificationCourseService
        .planificationById(id)
        .subscribe((data) => {
          this.selectedCourse = data;
          this.formCourse.patchValue(data.course);
          console.log(this.formCourse.value);
          this.needsField.clear();
          data.course.needs!.forEach((need: string) => {
            this.addNeed(need);
          });
        });
    }
  }

  showModalImages() {
    // this.loadImages();
    this.displayModalImages = true;
  }

  uploadImages(event: any) {
    const formData = new FormData();
    for (const file of event) {
      formData.append('images[]', file);
    }
  }

  //metodos para guardar

  onSubmit() {
    if (this.formCourse.valid) {
      this.saveCourse();
    } else {
      this.formCourse.markAllAsTouched();
    }
  }
  saveCourse() {
    this.courseId = this.selectedCourse.course.id;
    console.log('ID DEL CURSO', this.courseId, typeof this.courseId);

    const valuesFormGeneralInformation = this.formCourse.value;
    this.courseService
      .update(valuesFormGeneralInformation, this.courseId)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.messageService.successCourse(data);
          this.progressBar = false;
        },
        error: (error) => {
          console.log(error);
          this.messageService.error(error);
          this.progressBar = false;
        },
      });
  }

  addNeed(data: string = '') {
    this.needsField.push(this.formBuilder.control(data, Validators.required));
  }

  removeNeeds(index: number) {
    if (this.needsField.length > 1) {
      this.needsField.removeAt(index);
    } else {
      this.needsField.markAllAsTouched();
      this.messageService.errorRequired();
    }
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  showFormSponsor() {
    this.visibleFormSponsor = true;
  }
  showFormCategory() {
    this.visibleFormCategory = true;
  }

  //Setter
  set planificationId(value: any) {
    this.formCourse.patchValue({
      planificationId: value,
    });
  }

  //getters campos propios
  get planificationId() {
    return this.formCourse.controls['planificationId'];
  }

  // get modalityField() {
  //   return this.formCourse.controls['modalityId'];
  // }

  get categoryField() {
    return this.formCourse.controls['categoryId'];
  }

  get entityCertificationField() {
    return this.formCourse.controls['entityCertificationId'];
  }

  get courseTypeField() {
    return this.formCourse.controls['courseTypeId'];
  }

  get certificationTypeField() {
    return this.formCourse.controls['certifiedTypeId'];
  }

  get formationTypeField() {
    return this.formCourse.controls['formationTypeId'];
  }

  get abbreviationField() {
    return this.formCourse.controls['abbreviation'];
  }

  // get targetGroupsField(): FormArray {
  //   return this.formCourse.controls['targetGroups'] as FormArray;
  // }

  // get participantTypeField(): FormArray {
  //   return this.formCourse.controls['participantTypes'] as FormArray;
  // }

  get targetGroupsField() {
    return this.formCourse.controls['targetGroups'];
  }

  get participantsRegistrationField() {
    return this.formCourse.controls['participantsRegistration'];
  }

  get summaryField() {
    return this.formCourse.controls['summary'];
  }

  get projectFiled() {
    return this.formCourse.controls['project'];
  }

  get needsField(): FormArray {
    return this.formCourse.controls['needs'] as FormArray;
  }

  get idField() {
    return this.formCourse.controls['id'];
  }
  // get imageField() {
  //   return this.formCourse.controls['image'];
  // }

  get sponsorField() {
    return this.formCourse.controls['sponsorId'];
  }

  //carga categorias del curso
  loadCategoryCourses() {
    this.courseService.getCatalogues('CATEGORY').subscribe(
      (response) => {
        this.categories = response;
      },
      (error) => {
        this.messageService.error(error);
      }
    );
  }

  //carga los tipos de certificado
  loadCertificationType() {
    this.courseService.getCatalogues('CERTIFICATE').subscribe(
      (response) => {
        this.certifiedTypes = response;
      },
      (error) => {
        this.messageService.error(error);
      }
    );
  }

  loadEntityCertification() {
    this.courseService.getCatalogues('ENTITY_CERTIFICATION').subscribe(
      (response) => {
        this.entityCertifications = response;
      },
      (error) => {
        this.messageService.error(error);
      }
    );
  }

  //carga el tipo de curso
  loadCourseType() {
    this.courseService.getCatalogues('COURSE').subscribe(
      (response) => {
        this.courseTypes = response;
      },
      (error) => {
        this.messageService.error(error);
      }
    );
  }

  //carga modalidad
  loadModality() {
    this.courseService.getCatalogues('MODALITY').subscribe(
      (response) => {
        this.modalities = response;
      },
      (error) => {
        this.messageService.error(error);
      }
    );
  }

  loadformationType() {
    this.courseService.getCatalogues('FORMATION').subscribe(
      (response) => {
        this.formationTypes = response;
      },
      (error) => {
        this.messageService.error(error);
      }
    );
  }

  loadTargetGroups() {
    this.courseService.getCatalogues('TARGET_GROUPS').subscribe(
      (response) => {
        this.participantTypes = response;
      },
      (error) => {
        this.messageService.error(error);
      }
    );
  }

  loadSponsor() {
    this.courseService.getSponsors().subscribe(
      (response) => {
        this.sponsors = response;
      },
      (error) => {
        this.messageService.error(error);
      }
    );
  }

  // isRequired(field: AbstractControl): boolean {
  //   return field.hasValidator(Validators.required);
  // }

  onSubmitSponsor() {
    if (this.formSponsor.valid) {
      this.saveSponsor();
    } else {
      this.formSponsor.markAllAsTouched();
    }
  }

  saveSponsor() {
    this.courseService
      .saveSponsor(this.formSponsor.value)
      .subscribe((response) => {
        console.log(response);
        this.visibleFormSponsor = false;
        this.formSponsor.reset();
        this.messageService.successCourse(response);
        this.loadSponsor();
      });
  }

  get nameField() {
    return this.formSponsor.controls['name'];
  }

  onSubmitCategory() {
    if (this.formCategory.valid) {
      this.saveCategory();
    } else {
      this.formCategory.markAllAsTouched();
    }
  }

  saveCategory() {
    this.courseService
      .saveCatalogue(this.formCategory.value)
      .subscribe((response) => {
        this.visibleFormCategory = false;
        this.formCategory.reset();
        this.messageService.successCourse(response);
        this.loadCategoryCourses();
      });
  }

  get nameCategoryField() {
    return this.formCategory.controls['name'];
  }

  get nameDescriptionField() {
    return this.formCategory.controls['description'];
  }
}
