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
  progressBar: boolean = false;

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




  /* Methods of prerrequisite */



  /* Methods of Horaries */


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
