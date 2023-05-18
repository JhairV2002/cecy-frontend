import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { CourseModel, InstructorModel } from '@models/cecy';
import { CourseHttpService, InstructorHttpService } from '@services/cecy';
import { CoreHttpService, MessageService } from '@services/core';
import { CareerModel, FileModel, PaginatorModel } from '@models/core';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  @Output() dialogForm = new EventEmitter<boolean>();
  @Input() career: any;
  @Input() id: number = 0;

  private unsubscribe$ = new Subject<void>();
  private selectedCourse$ = this.courseHttpService.seletedCourse$;
  public formCourse: FormGroup = this.newFormCourse;
  public progressBar: boolean = false;
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

  // Foreign Key
  public cecyResponsibles: InstructorModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private courseHttpService: CourseHttpService,
    private instructorHttpService: InstructorHttpService,
    public messageService: MessageService
  ) {
    this.selectedCourse$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        console.log(response);

        if (response.id !== undefined) {
          this.formCourse.reset(response);
        }
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get newFormCourse(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      approvedAt: [null, [Validators.required]],
      expiredAt: [null, [Validators.required]],
      code: [null, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.formCourse.valid) {
      if (this.idField.value) {
        this.updateCourse(this.formCourse.value);
      } else {
        this.storeCourse(this.formCourse.value);
      }
    } else {
      this.formCourse.markAllAsTouched();
    }
  }

  storeCourse(course: CourseModel): void {
    this.progressBar = true;
    this.courseHttpService
      .storeCourseByCareer(this.career.id, course)
      .subscribe({
        next: (response) => {
          this.messageService.success(response);
          this.progressBar = false;
          this.dialogForm.emit(false);
        },
        error: (error) => {
          this.messageService.error(error);
          this.progressBar = false;
          this.dialogForm.emit(false);
        },
      });
  }

  updateCourse(course: CourseModel): void {
    this.progressBar = true;
    console.log(course);

    this.courseHttpService.approveCourse(course.id!, course).subscribe({
      next: (response) => {
        this.messageService.success(response);
        this.progressBar = false;
        this.dialogForm.emit(false);
      },
      error: (error) => {
        this.messageService.error(error);
        this.progressBar = false;
        this.dialogForm.emit(false);
      },
    });
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  loadFiles() {
    this.courseHttpService
      .getFiles(this.idField.value, this.paginatorFiles, this.filterFiles.value)
      .subscribe((response) => {
        this.files = response.data;
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

    this.courseHttpService
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

    this.courseHttpService.uploadOtherFile(formData).subscribe((response) => {
      this.messageService.success(response);
    });
  }

  uploadOtherIdFile(event: any) {
    const formData = new FormData();
    for (const file of event) {
      formData.append('file', file);
    }
  }

  // Getters
  get idField() {
    return this.formCourse.controls['id'];
  }

  get approvedAtField() {
    return this.formCourse.controls['approvedAt'];
  }

  get expiredAtField() {
    return this.formCourse.controls['expiredAt'];
  }

  get codeField() {
    return this.formCourse.controls['code'];
  }

  /*get responsibleField() {
    return this.formCourse.controls['responsible'];
  }

  get durationField() {
    return this.formCourse.controls['duration'];
  }*/
}
