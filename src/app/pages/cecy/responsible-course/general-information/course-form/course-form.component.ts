import {
  CourseModel,
  PlanificationCourseInitial,
} from './../../../../../models/cecy-v1/course.model';
import { Component, OnInit, Input } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ImageModel } from '@models/core';
import { MessageService } from '../../../../../services/core/message.service';
import { CatalogueModel as CecyCatalogueModel } from '../../../../../models/cecy/catalogue.model';
import { CourseHttpService } from '../../../../../services/cecy/course-http.service';
import { CatalogueHttpService } from '../../../../../services/cecy/catalogue-http.service';
//import { ImageModel } from './../../../../../models/core/image.model';
import { PaginatorModel } from '@models/cecy';
import { environment } from '@env/environment';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '@services/cecy-v1/course.service';
import { PlanificationsCoursesService } from '../../../../../services/cecy/coordinator-career';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  @Input() selectedCourse: any;
  // private seletedCourse$ = this.coursesHttpService.seletedCourse$;

  public progessBar: boolean = false;
  courseStatus: any = '';

  formCourse = new FormGroup({
    //foreing keys
    planificationId: new FormControl(),
    modalityId: new FormControl(null, [Validators.required]),
    categoryId: new FormControl(null, [Validators.required]),
    entityCertificationId: new FormControl(null, [Validators.required]),
    courseTypeId: new FormControl(null, [Validators.required]),
    certifiedTypeId: new FormControl(null, [Validators.required]),
    formationTypeId: new FormControl(null, [Validators.required]),
    abbreviation: new FormControl(null, [
      Validators.required,
      Validators.maxLength(5),
    ]),
    targetGroups: new FormControl(null, [Validators.required]),
    participantTypes: new FormControl(null, [Validators.required]),
    summary: new FormControl(null, [Validators.required]),
    project: new FormControl(null, [Validators.required]),
    //needs: new FormArray([''])
  });

  public progressBar: boolean = false; // falta programarlo
  public files: ImageModel[] = [];
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
  public STORAGE_URL: string;
  public id: number;

  constructor(
    private formBuilder: FormBuilder,
    public messageService: MessageService,
    private courseService: CourseService,
    private cataloguesHttpService: CatalogueHttpService,
    private activatedRoute: ActivatedRoute,
    private planificationCoursesService: PlanificationsCoursesService
  ) {
    const id = this.activatedRoute.snapshot.params['id'];
    this.getCourse(id);
    this.STORAGE_URL = environment.STORAGE_URL;

    //this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    //cargar llaves foraneas
    this.loadCategoryCourses();
    this.loadCourseType();
    this.loadModality();
    this.loadTargetGroups();
    this.loadCertificationType();
    this.loadformationType();
    this.loadEntityCertification();
    this.loadParticipantType();

    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      console.log(id);
      this.planificationCoursesService
        .planificationById(id)
        .subscribe((data) => {
          console.log('Planificacion por id es:', data);
          this.formCourse.patchValue({
            modalityId: [data.course[0]?.modalityId.id],
            categoryId: [data.course[0]?.categoryId],
            entityCertificationId: [data.course[0]?.entityCertificationId],
            courseTypeId: [data.course[0]?.courseTypeId.id],
            certifiedTypeId: [data.course[0]?.certifiedTypeId],
            formationTypeId: [data.course[0]?.formationTypeId],
            abbreviation: [data.course[0]?.abbreviation],
            targetGroups: [data.course[0]?.targetGroups.id],
            participantTypes: [data.course[0]?.participantTypes],
            summary: [data.course[0]?.summary],
            project: [data.course[0]?.project],
          });
          console.log('modalidad', data.course[0]?.modalityId);
        });
    }
  }

  getCourse(id: number) {
    this.courseService.getGeneralInformation(id).subscribe((response) => {
      console.log(response);

      /* this.needsField.clear();
      this.formCourse.reset(response);
 */
      /* response.needs!.forEach((need: string) => {
        this.addNeed(need);
      }); */

      /* if (response.participantTypes.length > 0) {
        this.participantTypeField.patchValue(response.participantTypes!);
      } else {
        return;
      }

      if (response.targetGroups.length > 0) {
        this.targetGroupsField.patchValue(response.targetGroups!);
      } else {
        return;
      } */
    });
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

    /*  this.coursesHttpService
      .uploadImageCourse(this.idField.value, formData)
      .subscribe((response) => {
        this.imageField.setValue(response.data);
        this.messageService.success(response);
      }); */
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
        this.targetGroups = response;
      },
      (error) => {
        this.messageService.error(error);
      }
    );
  }

  loadParticipantType() {
    this.courseService.getCatalogues('PARTICIPANT').subscribe(
      (response) => {
        this.participantTypes = response;
      },
      (error) => {
        this.messageService.error(error);
      }
    );
  }

  //metodos para guardar

  onSubmit() {
    if (this.formCourse.valid) {
      this.saveCourse();
      console.log('Se esta guardando la información general del curso');
    } else {
      this.formCourse.markAllAsTouched();
    }
  }

  saveCourse() {
    this.planificationId = this.selectedCourse.id;
    const valuesFormGeneralInformation = this.formCourse.value;
    console.log(valuesFormGeneralInformation);
    this.progessBar = true;
    this.courseService.save(valuesFormGeneralInformation).subscribe({
      next: (data) => {
        console.log(data);
        //this.messageService.successCourse(data);

        this.progessBar = false;
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

  get modalityField() {
    return this.formCourse.controls['modalityId'];
  }

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

  get targetGroupsField(): FormArray {
    return this.formCourse.controls['targetGroups'] as FormArray;
  }

  get participantTypeField(): FormArray {
    return this.formCourse.controls['participantTypes'] as FormArray;
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
  get imageField() {
    return this.formCourse.controls['image'];
  }
}
