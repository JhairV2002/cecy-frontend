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

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit, OnChanges {
  selectedCourse: any;
  courseId: any;
  progressBar: boolean = false;
  visible: boolean= false;

  formImage = this.fb.group({
    image: [null, Validators.required],
  });


  constructor(
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private planificationCourseService: PlanificationsCoursesService,
    public messageService: MessageService,
    public fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.getPlanificationById();
  }


  getPlanificationById() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      console.log(id);
      this.planificationCourseService
        .planificationById(id)
        .subscribe((data) => {
          this.selectedCourse = data;
        });
    }
  }


  showDialog() {
    this.visible = true;
  }

  onSubmit() {
    if (this.formImage.valid) {
      this.saveImage();
      this.getPlanificationById();
      this.visible = false
    } else {
      this.formImage.markAllAsTouched();
    }
  }

  saveImage() {
    this.courseId = this.selectedCourse.course.id;
    const valuesFormGeneralInformation = this.formImage.value;
    this.courseService.update(valuesFormGeneralInformation, this.courseId).subscribe({
      next: (data) => {
        this.messageService.successCourse(data);
      },
      error: (error) => {
        this.messageService.errorValid(error);
      },
    });
  }


  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  // Getters
  get imageField() {
    return this.formImage.controls['image'];
  }

}


