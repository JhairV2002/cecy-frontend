import { CourseModel } from '@models/cecy-v1/course.model';
import { IdentificationValidator } from './../../../../shared/validators/identification-validator';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CourseModel } from '@models/cecy';
import { CatalogueHttpService, CourseHttpService } from '@services/cecy';
import { MessageService } from '@services/core/message.service';
import { CatalogueModel as CecyCatalogueModel } from '@models/cecy/catalogue.model';
import { Subject, takeUntil } from 'rxjs';
import { CourseService } from '@services/cecy-v1/course.service';

@Component({
  selector: 'app-curricular-design',
  templateUrl: './curricular-design.component.html',
  styleUrls: ['./curricular-design.component.scss']
})
export class CurricularDesignComponent implements OnInit {

  course$ = this.courseHttpService.courses$;
  public progressBar: boolean = false;
  private unsubscribe$ = new Subject<void>();
  public formCurricularDesign: FormGroup = this.newFormCourse;
  public formRequisites: FormGroup = this.newRequisite;
  public formStrategies: FormGroup = this.newStrategie;
  public formMechanisms: FormGroup = this.newFormTypeMechanism;
  public formEnviroment: FormGroup = this.newFormEnviroment;
  public areaType: CecyCatalogueModel[] = [];
  public specialityType: CecyCatalogueModel[] = [];
  public prerequisites: CourseModel[] = [];


  typeRequisites: any[] = [];
  typeEnviroment: any[] = [];

  selectedCourse: Object = {};

  dialogForm: boolean = false;
  dialogFormStrategie: boolean = false;
  dialogFormMechanisns: boolean = false;
  dialogFormEnviroment: boolean = false;
  showAlert: boolean = false;
  typeModal: string | undefined = '';
  titleMechanisms: string = '';
  duration: number = 0;
  titleModal: string = '';
  @Input() courseId: number = 2;

  constructor(
    private formBuilder: FormBuilder,
    public messageService: MessageService,
    private courseHttpService: CourseHttpService,
    private cataloguesHttpService: CatalogueHttpService,
    private courseService: CourseService
  ) {
    this.typeRequisites = [
      { id: 'technical', name: 'Técnico' },
      { id: 'general', name: 'General' }
    ]
    this.typeEnviroment = [
      { id: '001', name: 'Aula virtual' },
      { id: '002', name: 'Plataforma de google' }
    ]
  }

  ngOnInit(): void {
    this.loadCourses()
    this.loadCourse()
    this.loadAreaType();
    this.loadSpecialityType()
  }

  get newFormCourse(): FormGroup {
    return this.formBuilder.group({
      courseId: [null],
      objective: [null, [Validators.required]],
      area: [null, [Validators.required]],
      speciality: [null, [Validators.required]],
      alignment: [null, [Validators.required]],
      bibliographies: [null],
      evaluationMechanisms: [null],
      learningEnvironments: [null],
      teachingStrategies: [null],
      techniquesRequisites: [null],
      practiceHours: [null, [Validators.required]],
      theoryHours: [null, [Validators.required]],
      prerequisites: [null],

    });
  }

  get newFormMechanisms(): FormGroup {
    return this.formBuilder.group({
      diagnostic: [this.formBuilder.array([])],
      formative: [this.formBuilder.array([])],
      final: [this.formBuilder.array([])],
    });
  }

  get newFormEnviroment(): FormGroup {
    return this.formBuilder.group({
      installation: [null, [Validators.required]],
      theoreticalPhase: [false],
      practicalPhase: [false],
    });
  }

  get newFormTypeMechanism(): FormGroup {
    return this.formBuilder.group({
      technique: [null, [Validators.required]],
      instrument: [null, [Validators.required]],
    });
  }

  get newFormRequisites(): FormGroup {
    return this.formBuilder.group({
      technical: [this.formBuilder.array([])],
      general: [this.formBuilder.array([])],
    });
  }

  get newRequisite(): FormGroup {
    return this.formBuilder.group({
      value: [null, [Validators.required]],
      type: [null, [Validators.required]],
    });
  }

  get newStrategie(): FormGroup {
    return this.formBuilder.group({
      strategie: [null, [Validators.required]],
    });
  }

  loadAreaType() {
    this.courseService.getCatalogues('AREA').subscribe(
      response => {
        this.areaType = response;
      }
    );
  }

  loadCourses() {
    this.courseService.findAll().subscribe(
      response => {
        this.prerequisites = response;
        console.log('prerequistesssssssss', this.prerequisites)
      }, error => {
        this.messageService.error(error);
      }
    );
  }

  loadCourse() {
    this.courseService.getGeneralInformation(this.courseId).subscribe(
      response => {
        // this.formCurricularDesign.reset(response.data);
        this.duration = response.duration
        console.log('çurriculum detail', response)
      }
    );
    this.courseService.getCurricularDesign(this.courseId).subscribe(
      response => {
        this.formCurricularDesign.reset(response);

        if (response.prerequisites.length > 0) {
          this.prerequisitesField.patchValue(response.prerequisites!);
        } else {
          return
        }
        // this.courseService.getCatalogue(response.area).subscribe(
        //   (res) => {
        //     this.formCurricularDesign.patchValue({ area: res })
        //   }
        // )
        // this.courseService.getCatalogue(response.speciality).subscribe(
        //   (res) => {
        //     this.formCurricularDesign.patchValue({ speciality: res })
        //   }
        // )
      }
    )


  }

  validateHours(event: any, type: string) {
    let suma = 0
    if (type === 'practice') {
      const horast = this.formCurricularDesign.value.theoryHours
      const input = parseInt(event.target.value)
      suma = horast + input
    } else {
      const horasp = this.formCurricularDesign.value.practiceHours
      const input = parseInt(event.target.value)
      suma = horasp + input
    }
    if (suma > this.duration) {
      this.showAlert = true
      this.formCurricularDesign.value.practiceHours = 0
      this.formCurricularDesign.patchValue({ practiceHours: 0, theoryHours: 0 });
    } else {
      this.showAlert = false
    }
  }

  loadSpecialityType() {
    this.courseService.getCatalogues('SPECIALITY_AREA').subscribe(
      response => {
        this.specialityType = response;
      }
    );
  }

  updateSpecialityType(event: any) {
    if (event.value?.children) {
      this.specialityType = event.value.children;
    } else {
      return
    }
  }

  onSubmit() {
    if (this.formCurricularDesign.valid) {
      this.updateCurricularDesign(this.formCurricularDesign.value);
    } else {
      this.formCurricularDesign.markAllAsTouched();
    }
  }

  updateRequisites() {
    if (this.formRequisites.valid) {
      if (this.techniquesRequisitesField.value === null) {
        this.formCurricularDesign.value.techniquesRequisites = {
          technical: [],
          general: []
        }
      }
      if (this.typeField.value.id === 'technical') {
        this.formCurricularDesign.value.techniquesRequisites.technical.push(this.valueField.value)
      } else {
        this.formCurricularDesign.value.techniquesRequisites.general.push(this.valueField.value)
      }
      this.onSubmit();
      this.formRequisites.reset();
      this.dialogForm = false;
    } else {
      this.formRequisites.markAllAsTouched();
    }
  }

  deleteRequisite(indice: number, type: string) {
    if (type === 'technical') {
      this.techniquesRequisitesField.value.technical.splice(indice, 1)
    } else {
      this.techniquesRequisitesField.value.general.splice(indice, 1)
    }
    this.onSubmit();
  }

  deleteMechanisms(indice: number, type: string) {
    if (type === 'formative') {
      this.evaluationMechanismsField.value.formative.splice(indice, 1)
    } else if (type === 'diagnostic') {
      this.evaluationMechanismsField.value.diagnostic.splice(indice, 1)
    } else if (type === 'final') {
      this.evaluationMechanismsField.value.final.splice(indice, 1)
    }
    this.onSubmit();
  }

  deleteEnviroment(indice: number) {
    this.learningEnvironmentsField.value.splice(indice, 1)
    this.onSubmit();
  }

  storeStrategie() {
    if (this.formStrategies.valid) {
      if (this.strategieField.value) {
        if (this.typeModal === 'bibliograph') {
          if (this.bibliographiesField.value === null) {
            this.formCurricularDesign.value.bibliographies = []
          }
          this.formCurricularDesign.value.bibliographies.push(this.strategieField.value)
        } else {
          if (this.teachingStrategysField.value === null) {
            this.formCurricularDesign.value.teachingStrategies = []
          }
          this.formCurricularDesign.value.teachingStrategies.push(this.strategieField.value)
        }
        this.onSubmit();
      }
      this.formStrategies.reset()
    } else {
      this.formStrategies.markAllAsTouched();
    }
    this.dialogFormStrategie = false;
  }

  updateEnviroment() {
    if (this.formEnviroment.valid) {
      if (this.learningEnvironmentsField.value === null) {
        this.formCurricularDesign.value.learningEnvironments = []
      }
      this.formCurricularDesign.value.learningEnvironments.push(this.formEnviroment.value)
      this.onSubmit();
      this.formEnviroment.reset()
      this.dialogFormEnviroment = false;
    } else {
      this.formEnviroment.markAllAsTouched();
    }
  }

  updateMechanisms() {
    if (this.formMechanisms.valid) {
      if (this.evaluationMechanismsField.value === null) {
        this.formCurricularDesign.value.evaluationMechanisms = {
          formative: [],
          diagnostic: [],
          final: [],
        }
      }
      if (this.typeModal === 'formative') {
        this.formCurricularDesign.value.evaluationMechanisms.formative.push(this.formMechanisms.value)
      }
      if (this.typeModal === 'diagnostic') {
        this.formCurricularDesign.value.evaluationMechanisms.diagnostic.push(this.formMechanisms.value)
      }
      if (this.typeModal === 'final') {
        this.formCurricularDesign.value.evaluationMechanisms.final.push(this.formMechanisms.value)
      }
      this.onSubmit();
      this.formMechanisms.reset()
      this.dialogFormMechanisns = false;
    } else {
      this.formMechanisms.markAllAsTouched();
    }
  }

  deleteStrategy(indice: number, type?: string) {
    if (type === 'bibliograph') {
      this.bibliographiesField.value.splice(indice, 1)
    } else {
      this.teachingStrategysField.value.splice(indice, 1)
    }
    this.onSubmit();
  }

  showForm() {
    this.dialogForm = true;
  }

  showFormStrategie(type?: string) {
    this.typeModal = type;
    if (type === 'bibliograph') {
      this.titleModal = 'Bibliografías'
    } else {
      this.titleModal = 'Estrategia de enseñanzas'
    }
    this.dialogFormStrategie = true;
  }

  showFormEnviroment() {
    this.dialogFormEnviroment = true;
  }

  showFormMechanisms(type: string) {
    this.typeModal = type;
    switch (this.typeModal) {
      case 'formative':
        this.titleMechanisms = 'Evaluación proceso formativo'
        break
      case 'diagnostic':
        this.titleMechanisms = 'Evaluación diagnóstica'
        break
      case 'final':
        this.titleMechanisms = 'Evaluación final'
        break
    }
    this.dialogFormMechanisns = true;
  }

  updateCurricularDesign(curricularDesign: any): void {
    curricularDesign.areaId = curricularDesign.area.id;
    curricularDesign.specialityId = curricularDesign.speciality.id;
    curricularDesign.courseId = this.courseId

    // this.progressBar = true;
    this.courseService
      .setCurricularDesign(curricularDesign.courseId, curricularDesign)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.messageService.successCourse(data);
          this.loadCourse()
          this.progressBar = false;
        },
        error: (error) => {
          console.log(error);
          this.messageService.error(error);
          this.progressBar = false;
        },
      });
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  // Getters
  get idField() {
    return this.formCurricularDesign.controls['id'];
  }

  get objectiveField() {
    return this.formCurricularDesign.controls['objective'];
  }

  get areaField() {
    return this.formCurricularDesign.controls['area'];
  }

  get specialityField() {
    return this.formCurricularDesign.controls['speciality'];
  }

  get alignmentField() {
    return this.formCurricularDesign.controls['alignment'];
  }

  get evaluationMechanismsField() {
    return this.formCurricularDesign.controls['evaluationMechanisms'];
  }

  get techniquesRequisitesField() {
    return this.formCurricularDesign.controls['techniquesRequisites'];
  }

  get practiceHoursField() {
    return this.formCurricularDesign.controls['practiceHours'];
  }

  get theoryHoursField() {
    return this.formCurricularDesign.controls['theoryHours'];
  }

  get bibliographiesField(): FormArray {
    return this.formCurricularDesign.controls['bibliographies'] as FormArray;
  }

  get learningEnvironmentsField(): FormArray {
    return this.formCurricularDesign.controls['learningEnvironments'] as FormArray;
  }

  get teachingStrategysField(): FormArray {
    return this.formCurricularDesign.controls['teachingStrategies'] as FormArray;
  }

  get valueField() {
    return this.formRequisites.controls['value'];
  }

  get strategieField() {
    return this.formStrategies.controls['strategie'];
  }

  get typeField() {
    return this.formRequisites.controls['type'];
  }

  get techniqueField() {
    return this.formMechanisms.controls['technique'];
  }

  get instrumentField() {
    return this.formMechanisms.controls['instrument'];
  }

  get installationField() {
    return this.formEnviroment.controls['installation'];
  }

  get theoreticalPhaseField() {
    return this.formEnviroment.controls['theoreticalPhase'];
  }

  get practicalPhaseField() {
    return this.formEnviroment.controls['practicalPhase'];
  }

  get prerequisitesField(): FormArray {
    return this.formCurricularDesign.controls['prerequisites'] as FormArray;
  }

}
