import {
  CourseModel,
  PlanificationCourseInitial,
} from './../../../../models/cecy-v1/course.model';
import { CourseService } from './../../../../services/cecy-v1/course.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MessageService } from './../../../../services/core/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { PlanificationsCoursesService } from '../../../../services/cecy/coordinator-career/planifications-courses.service';

import { CatalogueModel as CecyCatalogueModel } from '../../../../models/cecy/catalogue.model';
import { ColModel, DetailPlanificationModel } from '@models/cecy';
import { DetailPlanModel } from '@models/cecy-v1/detailPlan.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit, OnChanges {
  selectedCourse: any;
  courseId: any;

  formCourse = this.fb.group({
    id: [null],
    planificationId: [null],
    modalityId: [null, Validators.required],
    categoryId: [null, Validators.required],
    entityCertificationId: [null, Validators.required],
    courseTypeId: [null, Validators.required],
    certifiedTypeId: [null, Validators.required],
    formationTypeId: [null, Validators.required],
    abbreviation: [null, [Validators.required, Validators.maxLength(5)]],
    targetGroups: [null, Validators.required],
    participantTypes: [null, Validators.required],
    summary: [null, Validators.required],
    project: [null, Validators.required],
    //

    //needs: new FormArray([''])
  });

  formCurricularDesign = this.fb.group({
    planificationId: [null],
    objective: [null],
    alignment: [null],
    areaId: [null],
    specialityId: [null],
    practiceHours: [null],
    theoryHours: [null],
  });

  entityCertifications: CecyCatalogueModel[] = [];
  categories: CecyCatalogueModel[] = [];
  certifiedTypes: CecyCatalogueModel[] = [];
  courseTypes: CecyCatalogueModel[] = [];
  modalities: CecyCatalogueModel[] = [];
  formationTypes: CecyCatalogueModel[] = [];
  targetGroups: CecyCatalogueModel[] = [];
  participantTypes: CecyCatalogueModel[] = [];
  progressBar: boolean = false;
  selectedIndex = 0;
  specialityType: CecyCatalogueModel[] = [];
  areaType: CecyCatalogueModel[] = [];
  prerequisites: CourseModel[] = [];
  selectedDetailPlanifications: DetailPlanificationModel[] = [];
  detailPlanifications: DetailPlanModel[] = [];
  cols: ColModel[];
  dialogForm: boolean = false;
  horarios: [] = [];
  selectedTab = 0;
  edit: boolean = false;
  horarioSelect: any = null;

  constructor(
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private planificationCourseService: PlanificationsCoursesService,
    public messageService: MessageService,
    public fb: FormBuilder,
    private router: Router
  ) {
    this.cols = [
      { field: 'schedule', header: 'Horarios' },
      { field: 'day', header: 'Jornada' },
      { field: 'classroom', header: 'Aula' },
      { field: 'paralell', header: 'Paralelo' },
      { field: 'observation', header: 'Observación' },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.getPlanificationById();
    this.loadCategoryCourses();
    this.loadCourseType();
    this.loadModality();
    this.loadTargetGroups();
    this.loadCertificationType();
    this.loadformationType();
    this.loadEntityCertification();
    this.loadParticipantType();
    this.loadAreaType();
    this.loadSpecialityType();
    this.loadHorarios();
  }

  loadHorarios() {
    const id = this.activatedRoute.snapshot.params['id'];
    console.log('ID DE LA PLANIFICACION', id);

    this.courseService.getDetailAllCourses(id).subscribe((data) => {
      console.log('Horarios depende del ID del la planificacion', data);
      this.detailPlanifications = data;
    });
  }
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
  getPlanificationById() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      console.log(id);
      this.planificationCourseService
        .planificationById(id)
        .subscribe((data) => {
          this.selectedCourse = data;
          this.formCourse.patchValue(data.course[0]);
          this.formCurricularDesign.patchValue(data.course[0]);
        });
    }
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
  onSubmit() {
    if (this.formCourse.valid) {
      this.saveCourse();
    } else {
      this.formCourse.markAllAsTouched();
    }
  }
  onSubmit1() {
    if (this.formCurricularDesign.valid) {
      this.updateCourse();
    } else {
      this.formCurricularDesign.markAllAsTouched();
    }
  }
  saveCourse() {
    console.log('Se esta ejecuntando el guardado');
    this.planificationId = this.selectedCourse.id;
    const valuesFormGeneralInformation = this.formCourse.value;
    this.progressBar = true;
    this.courseService.save(valuesFormGeneralInformation).subscribe({
      next: (data) => {
        console.log('guardando', data);
        this.messageService.successCourse(data);
        this.progressBar = false;
        this.selectedTab = this.selectedTab === 0 ? 1 : 0;
        console.log('TAB POSITION', this.selectedTab);
      },
      complete: () => {
        location.reload();
      },
      error: (error) => {
        console.log(error);
        this.messageService.errorValid(error);
        this.progressBar = false;
      },
    });
  }

  updateCourse() {
    console.log('Se esta ejecuntando el guardado');
    this.planificationId1 = this.selectedCourse.id;
    const valuesFormCurriculum = this.formCurricularDesign.value;
    console.log('PLANIFICACION', this.selectedCourse);
    this.progressBar = true;
    this.courseService
      .update(this.selectedCourse.course[0].id, this.formCurricularDesign.value)
      .subscribe({
        next: (data) => {
          console.log('editando', data);
          this.messageService.successCourse(data);
          this.progressBar = false;
          //this.selectedTab = this.selectedTab === 0 ? 1 : 0;
          console.log('TAB POSITION', this.selectedTab);
        },
        error: (error) => {
          console.log(error);
          this.messageService.errorValid(error);
          this.progressBar = false;
        },
      });
  }

  hideModal(isClose: boolean) {
    this.dialogForm = isClose;
  }

  /* Methods of prerrequisite */

  loadAreaType() {
    this.courseService.getCatalogues('AREA').subscribe((response) => {
      this.areaType = response;
    });
  }
  loadSpecialityType() {
    this.courseService
      .getCatalogues('SPECIALITY_AREA')
      .subscribe((response) => {
        this.specialityType = response;
      });
  }

  /* Methods of Horaries */

  showForm() {
    this.dialogForm = true;
    this.horarioSelect = null;
  }
  deleteHorarioforOne(horario) {
    console.log(horario.id);
    this.courseService.deleteDetailPlan(horario.id).subscribe((data) => {
      console.log('Eliminando horario', data);
      this.loadHorarios();
    });
  }

  updateHorarioforOne(horario) {
    this.dialogForm = true;
    this.horarioSelect = horario;
    console.log('Horario', horario);
  }

  saveOrEditUser(newUser: any) {
    console.log('Nuevo usuario', newUser);
    this.loadHorarios();
  }
  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  set planificationId(value: any) {
    this.formCourse.patchValue({
      planificationId: value,
    });
  }

  set planificationId1(value: any) {
    this.formCurricularDesign.patchValue({
      planificationId: value,
    });
  }

  set id(value: any) {
    this.formCourse.patchValue({
      id: value,
    });
  }

  get id() {
    return this.formCourse.controls['id'];
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

  /* Curriculum design */

  // Getters
  get planificationId1() {
    return this.formCurricularDesign.controls['planificationId'];
  }
  get objectiveField() {
    return this.formCurricularDesign.controls['objective'];
  }

  get areaField() {
    return this.formCurricularDesign.controls['areaId'];
  }

  get specialityField() {
    return this.formCurricularDesign.controls['specialityId'];
  }

  get alignmentField() {
    return this.formCurricularDesign.controls['alignment'];
  }
  get practiceHoursField() {
    return this.formCurricularDesign.controls['practiceHours'];
  }

  get theoryHoursField() {
    return this.formCurricularDesign.controls['theoryHours'];
  }
}

// export class TabsComponent implements OnInit {

//   // private seletedCourse$ = this.coursesHttpService.seletedCourse$;
//   // private unsubscribe$ = new Subject<void>();
//   public imageForm: FormGroup = this.newImageForm;
//   selectedCourse: CourseModel = {};
//   courseId: number = 0;
//   tabIndex: number = 0;

//   public progressBar: boolean = false;
//   public files: ImageModel[] = [];
//   // public paginatorImages: PaginatorModel = { current_page: 1, per_page: 15, total: 0 };
//   public filterImages: FormControl = new FormControl();
//   public displayModalImages: boolean = false;
//   public loadingUploadImages: boolean = false;
//   public loadingImages: boolean = false;

//   public STORAGE_URL: string;

//   constructor(
//     private activatedRoute: ActivatedRoute,
//     private coursesHttpService: CourseHttpService,
//     public messageService: MessageService,
//     private formBuilder: FormBuilder
//   ) {

//     // this.coursesHttpService.seletedCourse$
//     //   .subscribe(response => this.selectedCourse = response);
//     // console.log(this.selectedCourse.name);

//     this.courseId = this.activatedRoute.snapshot.params['id'];
//     this.idField.setValue(this.courseId);
//     console.log(this.idField.value);

//     this.coursesHttpService.getCourse(this.courseId)
//       .subscribe(response => {

//           this.selectedCourse = response.data
//           this.imageForm.reset(response.data);
//           console.log('response')
//           console.log(response)
//           console.log('response')
//       });

//     this.STORAGE_URL = environment.STORAGE_URL;

//   }

//   ngOnInit(): void {

//   }

//   get newImageForm(): FormGroup {
//     return this.formBuilder.group({
//       id: [null],
//       image: [null]
//     });
//   }

//   showModalImages() {
//     // this.loadImages();
//     this.displayModalImages = true;
//   }

//   uploadImages(event: any) {
//     this.progressBar = true;
//     const formData = new FormData();
//     for (const file of event) {
//       formData.append('images[]', file);
//     }

//     this.coursesHttpService.uploadImageCourse(this.idField.value, formData).subscribe(
//       response => {
//         // this.getPayments();
//         this.imageField.setValue(response.data);
//         this.progressBar = false;
//         this.messageService.success(response);
//     });
//   }

//   get idField() {
//     return this.imageForm.controls['id'];
//   }
//   get imageField() {
//     return this.imageForm.controls['image'];
//   }

// }
