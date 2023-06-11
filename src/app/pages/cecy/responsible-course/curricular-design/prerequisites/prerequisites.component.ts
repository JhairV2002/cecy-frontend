import { Component, Input, OnInit } from '@angular/core';
import {  PaginatorModel, PrerequisiteModel} from '@models/cecy';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PrerequisiteHttpService } from '@services/cecy/prerequisite-http.service';
import { MessageService } from '@services/core/message.service';
import { CourseHttpService } from '@services/cecy';
import { Subject, takeUntil } from 'rxjs';
import { CourseService } from '@services/cecy-v1/course.service';
import { CourseModel } from '@models/cecy-v1/course.model';

@Component({
  selector: 'app-prerequisites',
  templateUrl: './prerequisites.component.html',
  styleUrls: ['./prerequisites.component.scss']
})
export class PrerequisitesComponent implements OnInit {

  // @Input() courseId: number = 0;
  // typeModal: string;
  // titleModal: string;
  // dialogFormStrategie: boolean;
  // public formCurricularDesign: FormGroup = this.newFormCourse;


  constructor(
    private formBuilder: FormBuilder,
    private prerequisiteHttpService: PrerequisiteHttpService,
    private coursesHttpService: CourseHttpService,
    public messageService: MessageService,
    private courseService: CourseService
  ) {
  }

  ngOnInit(): void {

  }

  // get newFormCourse(): FormGroup {
  //   return this.formBuilder.group({
  //     id: [null],
  //     objective: [null, [Validators.required]],
  //     areaId: [null, [Validators.required]],
  //     specialityId: [null, [Validators.required]],
  //     alignment: [null, [Validators.required]],
  //     bibliographies: [null],
  //     evaluationMechanisms: [null],
  //     learningEnvironments: [null],
  //     teachingStrategies: [null],
  //     techniquesRequisites: [null],
  //     practiceHours: [null, [Validators.required]],
  //     theoryHours: [null, [Validators.required]],
  //     prerequisites: [null],

  //   });
  // }


  // showFormStrategie(type?: string) {
  //   this.typeModal = type;
  //   if (type === 'bibliograph') {
  //     this.titleModal = 'Bibliografías'
  //   } else {
  //     this.titleModal = 'Estrategia de enseñanzas'
  //   }
  //   this.dialogFormStrategie = true;
  // }

  // deleteStrategy(indice: number, type?: string) {
  //   if (type === 'bibliograph') {
  //     this.bibliographiesField.value.splice(indice, 1)
  //   } else {
  //     this.teachingStrategysField.value.splice(indice, 1)
  //   }
  //   this.onSubmit();
  // }

  // get bibliographiesField(): FormArray {
  //   return this.formCurricularDesign.controls['bibliographies'] as FormArray;
  // }
}
