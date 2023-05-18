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

  prerequisites$ = this.prerequisiteHttpService.prerequisites$;

  public formPrerequisites: FormGroup = this.newFormPrerequisites;
  public progressBar: boolean = false;
  private unsubscribe$ = new Subject<void>();
  search: FormControl = new FormControl('');
  paginator: PaginatorModel = {};
  cursos: CourseModel[] = [];
  prerequisitesC: any[] = [];
  @Input() courseId: number = 0;



  constructor(
    private formBuilder: FormBuilder,
    private prerequisiteHttpService: PrerequisiteHttpService,
    private coursesHttpService: CourseHttpService,
    public messageService: MessageService,
    private courseService: CourseService
  ) {
  }

  ngOnInit(): void {
    this.loadFormPrerequisite()
    this.loadCourses()
    this.loadPrerequisites()
  }

  get newFormPrerequisites(): FormGroup {
    return this.formBuilder.group({
      prerequisites: [null,[Validators.required]],
    });
  }
  loadFormPrerequisite() {
    this.prerequisiteHttpService.getPrerequisites(1, this.search.value, this.courseId).subscribe(response => {
      const prerequisitesCourse = response?.data.map((x: any) =>  x.prerequisite)
      this.prerequisitesField.patchValue(prerequisitesCourse)
    });
  }

  loadPrerequisites(page: number = 1) {
    this.prerequisiteHttpService.getPrerequisites(page, this.search.value, this.courseId).subscribe(
      response => {
        const prerequisites = [] as any
        response.data?.forEach((prerequisite: PrerequisiteModel) => {
          prerequisites.push(prerequisite?.prerequisite)
        });
        this.formPrerequisites.reset({
          prerequisites: prerequisites
        })
      }, error => {
        this.messageService.error(error);
      }
    );

  }
  loadCourses(page: number = 1) {
    // this.coursesHttpService.getCourses(page, this.search.value).subscribe(
    //   response => {
    //     this.cursos  = response.data;
    //   }, error => {
    //     this.messageService.error(error);
    //   }
    // );
    this.courseService.findAll().subscribe(
      response=>{
        this.cursos  = response;
      }
    )
  }


  onSubmit() {
    console.log(this.formPrerequisites.value)
    if (this.formPrerequisites.valid) {
      const idsCourse = [] as any
      if (this.prerequisitesField.value.length > 0) {
        this.prerequisitesField.value.forEach((prerequisite: any) => {
          idsCourse.push(prerequisite.id)
        });
      }
        this.storePrerequisites(idsCourse);
    } else {
      this.formPrerequisites.markAllAsTouched();
    }
  }

  storePrerequisites(prerequisites: PrerequisiteModel[]): void {
    this.progressBar = true;
    this.prerequisiteHttpService.storePrerequisite(prerequisites, this.courseId).subscribe(
      response => {
        this.messageService.success(response);
        this.progressBar = false;
      },
      error => {
        this.messageService.error(error);
        this.progressBar = false;
      }
    );
  }

  deletePrerequisite(prerequisite: PrerequisiteModel): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          this.prerequisiteHttpService.destroyPrerequisite(prerequisite.id!, this.courseId).subscribe(
            response => {
              this.messageService.success(response);
            },
            error => {
              this.messageService.error(error);
            }
          );
        }
      });
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

   // Getters
  get prerequisitesField(): FormArray {
    return this.formPrerequisites.controls['prerequisites'] as FormArray;
  }
}
